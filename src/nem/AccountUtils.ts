import { Address, Account, PublicAccount } from "nem-library";
import * as _ from 'lodash';

// const userPrivateKey: string = ''; // hardcode in a private key for now

let account: Account;
let namespaceName: string;

const initializeAccount = (pk: string, namespace: string) => {
  // userPrivateKey = pk;    if need pk elsewhere can uncomment
  account = Account.createWithPrivateKey(pk);
  namespaceName = namespace;
}

const getAddress = () => {
  return account.address;
}

const getAccount = () => {
  return account;
}

const getPublicKey = () => {
  return account.publicKey;
}

const getPublicAccount = () => {
  return PublicAccount.createWithPublicKey(account.publicKey);
}

const getNamespaceName = () => {
  return namespaceName;
}

const getPublicAccountFromKey = (publicKey: string) => {
  return PublicAccount.createWithPublicKey(publicKey);
}

export {
  getAddress,
  getAccount,
  getPublicAccount,
  initializeAccount,
  getNamespaceName,
  getPublicAccountFromKey,
  getPublicKey,
}
