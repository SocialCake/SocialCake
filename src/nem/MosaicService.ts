import { TimeWindow, MosaicDefinition, MosaicDefinitionCreationTransaction, Address, EmptyMessage, TransferTransaction, PublicAccount, MosaicId, MosaicProperties, MosaicLevy, MosaicHttp, MosaicLevyType, Message } from "nem-library";
import { XEM } from "nem-library/dist/src/models/mosaic/XEM";
import { signAndBroadcastTransaction } from "./TransactionService";
import * as Rx from 'rxjs';
import * as _ from 'lodash';
import { getPublicAccount, getAccount, getPublicAccountFromKey, getNamespaceName } from './AccountUtils';
import * as NamespaceService from "./NamespaceService";
declare let process: any;

const mosaicHttp = new MosaicHttp();

const createMosaic = (mosaicName: string, fileData) => {
  // update so price is = to price minus fees which I think are 15000 XEM? verify
  const mosaicLevy: MosaicLevy = new MosaicLevy(MosaicLevyType.Absolute, new Address(fileData.owner), new MosaicId('nem', 'xem'), Math.round(fileData.price * 1000000));

  // if not limited quantity, then set arbitrary quantity and allow supply to be mutated
  const defaultProperties: MosaicProperties = new MosaicProperties(0, 100000, false, true);

  const mosaicDescription = 'File Name: ' + fileData.name + ' | Last Modified: ' +
    fileData.lastModified + ' | MD5: ' + fileData.md5 + ' | SHA1: ' +
    fileData.sha1;

  const mosaicDefinitionTransaction = MosaicDefinitionCreationTransaction.create(
    TimeWindow.createWithDeadline(),
    new MosaicDefinition(
      getPublicAccount(),
      new MosaicId(getNamespaceName(), mosaicName.toLowerCase()),
      mosaicDescription,
      fileData.quantity > 0 ? new MosaicProperties(0, fileData.quantity, false, false) : defaultProperties,
      mosaicLevy,
    )
  )

  return signAndBroadcastTransaction(mosaicDefinitionTransaction);
};

const getAllMosaics = () => {
  return mosaicHttp
    .getAllMosaicsGivenNamespace(getNamespaceName())
    .map(m => m.map(m => _.get(m, 'id.name')));
}

const sendSingleMosaicWithEncryptedMessage = (mosaicName: string, recipientKey: string, message: string) => {
  const account = getAccount();
  const recipientAccount: PublicAccount = getPublicAccountFromKey(recipientKey);
  const encryptedMessage = account.encryptMessage(message, recipientAccount);

  return sendSingleMosaic(mosaicName, recipientAccount.address, encryptedMessage);
};

const sendSingleMosaic = (mosaicName: string, recipientAddress: Address, messageObject: Message) => {
  return mosaicHttp
    .getMosaicTransferableWithAmount(new MosaicId(getNamespaceName(), mosaicName.toLowerCase()), 1)
    .map(m => TransferTransaction.createWithMosaics(
      TimeWindow.createWithDeadline(),
      recipientAddress,
      [m],
      messageObject
    ))
    .flatMap(t => signAndBroadcastTransaction(t));
}

export {
  createMosaic,
  getAllMosaics,
  sendSingleMosaic,
  sendSingleMosaicWithEncryptedMessage,
}
