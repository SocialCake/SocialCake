import {
  AccountHttp, NetworkTypes, Address, Account, TransferTransaction, TimeWindow,
  EmptyMessage, PublicAccount, TransactionHttp, SignedTransaction, Transaction
} from "nem-library";
import { XEM } from "nem-library/dist/src/models/mosaic/XEM";
import { getAccount } from "./AccountUtils";

const transactionHttp = new TransactionHttp();

const signAndBroadcastTransaction = (transaction: Transaction) => {
  const signedTransaction: SignedTransaction = getAccount().signTransaction(transaction);

  console.log(`Broadcasting Transaction: ${JSON.stringify(transaction)}`)

  return transactionHttp.announceTransaction(signedTransaction);
}

export {
  signAndBroadcastTransaction,
}
