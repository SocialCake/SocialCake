exports.__esModule = true;
var nem_library_1 = require('nem-library');
// const userPrivateKey: string = ''; // hardcode in a private key for now
var account;
var namespaceName;
var initializeAccount = function(pk, namespace) {
  // userPrivateKey = pk;    if need pk elsewhere can uncomment
  account = nem_library_1.Account.createWithPrivateKey(pk);
  namespaceName = namespace;
};
exports.initializeAccount = initializeAccount;
var getAddress = function() {
  return account.address;
};
exports.getAddress = getAddress;
var getAccount = function() {
  return account;
};
exports.getAccount = getAccount;
var getPublicKey = function() {
  return account.publicKey;
};
exports.getPublicKey = getPublicKey;
var getPublicAccount = function() {
  return nem_library_1.PublicAccount.createWithPublicKey(account.publicKey);
};
exports.getPublicAccount = getPublicAccount;
var getNamespaceName = function() {
  return namespaceName;
};
exports.getNamespaceName = getNamespaceName;
var getPublicAccountFromKey = function(publicKey) {
  return nem_library_1.PublicAccount.createWithPublicKey(publicKey);
};
exports.getPublicAccountFromKey = getPublicAccountFromKey;
