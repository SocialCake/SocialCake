exports.__esModule = true;
var nem_library_1 = require('nem-library');
var TransactionService_1 = require('./TransactionService');
var _ = require('lodash');
var AccountUtils_1 = require('./AccountUtils');
var namespaceHttp = new nem_library_1.NamespaceHttp();
var id = 12344;
var registerNamespace = function(namespaceName) {
  // check if namespace exists first?
  var provisionNamespaceTransaction = nem_library_1.ProvisionNamespaceTransaction.create(
    nem_library_1.TimeWindow.createWithDeadline(),
    namespaceName,
  );
  return TransactionService_1.signAndBroadcastTransaction(
    provisionNamespaceTransaction,
  );
};
exports.registerNamespace = registerNamespace;
var getAllNamespaces = function() {
  return namespaceHttp.getRootNamespaces(id).flatMap(function(n) {
    return _.filter(n, function(n) {
      return _.isEqual(n.owner, AccountUtils_1.getAddress());
    }).map(function(n) {
      return n.name;
    });
  });
};
exports.getAllNamespaces = getAllNamespaces;
var getDefaultNamespace = function() {
  return namespaceHttp
    .getRootNamespaces(id)
    .flatMap(function(n) {
      return _.filter(n, function(n) {
        return _.isEqual(n.owner, AccountUtils_1.getAddress());
      }).map(function(n) {
        return n.name;
      });
    })
    .first();
};
exports.getDefaultNamespace = getDefaultNamespace;
