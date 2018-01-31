exports.__esModule = true;
var nem_library_1 = require('nem-library');
var AccountUtils_1 = require('./AccountUtils');
var transactionHttp = new nem_library_1.TransactionHttp();
var signAndBroadcastTransaction = function(transaction) {
  var signedTransaction = AccountUtils_1.getAccount().signTransaction(
    transaction,
  );
  console.log('Broadcasting Transaction: ' + JSON.stringify(transaction));
  return transactionHttp.announceTransaction(signedTransaction);
};
exports.signAndBroadcastTransaction = signAndBroadcastTransaction;
