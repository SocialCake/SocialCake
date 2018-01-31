import React from 'react';
import styled from 'styled-components';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import '@firebase/storage';
import '@firebase/firestore';
import firebase from '@firebase/app';
import FileService from '../../services/FileService';
import DatabaseService from '../../services/DatabaseService';
import * as MosaicService from '../../nem/MosaicService';
import * as NamespaceService from '../../nem/NamespaceService';
import CryptoJS from 'crypto-js';

const storageRef = firebase.storage().ref();
const db = firebase.firestore();

const Container = styled.div`
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Content = styled(Card)`
  padding: 1em 2em;
  margin: 2em 0;
`;

const TextFieldStyle = {
  margin: '10px 0 10px 0',
};

const UploadButtonStyle = {
  marginLeft: '40px',
};

const SnackTextStyle = {
  display: 'block',
  textAlign: 'center',
};

const SnackHighlightStyle = {
  color: '#1FBCD3',
};

class Account extends React.Component<{}> {
  render() {
    return null;
  }
}

export default Account;
