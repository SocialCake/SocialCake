import React from 'react';
import styled from 'styled-components';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import stomp from 'stompjs';
import * as nem from 'nem-sdk';

import DatabaseService from '../../services/DatabaseService';
import * as MosaicService from '../../nem/MosaicService';

import { getPublicKey, getAddress } from '../../nem/AccountUtils';

const Container = styled.div`
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Content = styled(Card)`
  padding: 1em 2em;
  margin: 2em 0;
`;

// create a STOMP client for testnet
const stompClient = stomp.client(
  'wss://104.128.226.60:7778/w/messages/websocket',
);

// subscribe to blockchain notifications for our address
// parse message to find file customer has purchased
const callback = function(frame) {
  stompClient.subscribe(`/unconfirmed/${getAddress().plain()}`, function(data) {
    let transaction = JSON.parse(data.body).transaction;
    if (transaction.signer == getPublicKey()) return;
    let customerPublicKey = transaction.signer;
    let message = transaction.message;
    if (!message) return;
    let productId = nem.default.utils.format.hexMessage(message);
    let docRef = DatabaseService.getFileFromDatabase(productId);
    let amountPaid = transaction.amount;
    sendFileToCustomer(docRef, customerPublicKey, amountPaid);
  });
};

const sendFileToCustomer = (docRef, customerPublicKey, amountPaid) => {
  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        if (amountPaid !== Math.round(doc.data().price * 1000000)) {
          console.log(
            `The amount sent ${amountPaid} does not match the price ${doc.price *
              1000000}`,
          );
          return;
        }

        console.log('Document data:', doc.data());
        let message = doc.data().url;

        console.log(doc.id);
        MosaicService.sendSingleMosaicWithEncryptedMessage(
          doc.id,
          customerPublicKey,
          message,
        ).subscribe(
          m => {
            console.log(m);
            console.log(
              `Sucessfully sent mosaic ${doc.id} to ${customerPublicKey}`,
            );
          },
          e => {
            console.log('Error sending transaction', e);
          },
        );
      } else {
        // doc.data() is undefined
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};
// Connect and subscribe
stompClient.connect({}, callback);

class Home extends React.Component<{}> {
  render() {
    return (
      <Container>
        <Content>
          <Typography type="headline" gutterBottom>
            <strong>SocialCake:</strong> Sell directly to your fans and
            followers
          </Typography>
          <Typography type="body1" paragraph>
            SocialCake allows content creators of all kinds to sell digital
            goods directly to their audience. Artists, musicians, writers, and
            more can sell digital content simply by sharing a message.
          </Typography>
          <Typography type="body1" paragraph>
            Start by signing up and uploading a file. Then, you will receive a
            unique file ID. Share this ID on Facebook, Twitter, YouTube, or
            anywhere else you reach your audience. They send a payment with
            their NEM wallet to SocialCake using your ID as the message.
            SocialCake instantly sends them a Mosaic with an encrypted download
            link to the file, and file metadata such as the hashes to verify the
            integrity of the file and prove that they own it.
          </Typography>
        </Content>
      </Container>
    );
  }
}

export default Home;
