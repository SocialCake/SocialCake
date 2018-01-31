import { TimeWindow, ProvisionNamespaceTransaction, NamespaceHttp } from "nem-library";
import { XEM } from "nem-library/dist/src/models/mosaic/XEM";
import { signAndBroadcastTransaction } from "./TransactionService";
import * as Rx from 'rxjs';
import * as _ from 'lodash';
import { getAddress } from './AccountUtils';
declare let process: any;

const namespaceHttp = new NamespaceHttp();
const id = 12344;

const registerNamespace = (namespaceName: string) => {
  // check if namespace exists first?

  let provisionNamespaceTransaction: ProvisionNamespaceTransaction = ProvisionNamespaceTransaction.create(
    TimeWindow.createWithDeadline(),
    namespaceName,
  )

  return signAndBroadcastTransaction(provisionNamespaceTransaction);
};

const getAllNamespaces = () => {
  return namespaceHttp
    .getRootNamespaces(id)
    .flatMap((n) => _.filter(n, n => _.isEqual(n.owner, getAddress())).map(n => n.name));
}

const getDefaultNamespace = () => {
  return namespaceHttp
    .getRootNamespaces(id)
    .flatMap((n) => _.filter(n, n => _.isEqual(n.owner, getAddress())).map(n => n.name))
    .first();
}

export {
  registerNamespace,
  getAllNamespaces,
  getDefaultNamespace
}
