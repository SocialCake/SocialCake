exports.__esModule = true;
var nem_library_1 = require('nem-library');
var TransactionService_1 = require('./TransactionService');
var _ = require('lodash');
var AccountUtils_1 = require('./AccountUtils');
var mosaicHttp = new nem_library_1.MosaicHttp();
var createMosaic = function(mosaicName, fileData) {
  // update so price is = to price minus fees which I think are 15000 XEM? verify
  var mosaicLevy = new nem_library_1.MosaicLevy(
    nem_library_1.MosaicLevyType.Absolute,
    new nem_library_1.Address(fileData.owner),
    new nem_library_1.MosaicId('nem', 'xem'),
    Math.round(fileData.price * 1000000),
  );
  // if not limited quantity, then set arbitrary quantity and allow supply to be mutated
  var defaultProperties = new nem_library_1.MosaicProperties(
    0,
    100000,
    false,
    true,
  );
  var mosaicDescription =
    'File Name: ' +
    fileData.name +
    ' | Last Modified: ' +
    fileData.lastModified +
    ' | MD5: ' +
    fileData.md5 +
    ' | SHA1: ' +
    fileData.sha1;
  var mosaicDefinitionTransaction = nem_library_1.MosaicDefinitionCreationTransaction.create(
    nem_library_1.TimeWindow.createWithDeadline(),
    new nem_library_1.MosaicDefinition(
      AccountUtils_1.getPublicAccount(),
      new nem_library_1.MosaicId(
        AccountUtils_1.getNamespaceName(),
        mosaicName.toLowerCase(),
      ),
      mosaicDescription,
      fileData.quantity > 0
        ? new nem_library_1.MosaicProperties(0, fileData.quantity, false, false)
        : defaultProperties,
      mosaicLevy,
    ),
  );
  return TransactionService_1.signAndBroadcastTransaction(
    mosaicDefinitionTransaction,
  );
};
exports.createMosaic = createMosaic;
var getAllMosaics = function() {
  return mosaicHttp
    .getAllMosaicsGivenNamespace(AccountUtils_1.getNamespaceName())
    .map(function(m) {
      return m.map(function(m) {
        return _.get(m, 'id.name');
      });
    });
};
exports.getAllMosaics = getAllMosaics;
var sendSingleMosaicWithEncryptedMessage = function(
  mosaicName,
  recipientKey,
  message,
) {
  var account = AccountUtils_1.getAccount();
  var recipientAccount = AccountUtils_1.getPublicAccountFromKey(recipientKey);
  var encryptedMessage = account.encryptMessage(message, recipientAccount);
  return sendSingleMosaic(
    mosaicName,
    recipientAccount.address,
    encryptedMessage,
  );
};
exports.sendSingleMosaicWithEncryptedMessage = sendSingleMosaicWithEncryptedMessage;
var sendSingleMosaic = function(mosaicName, recipientAddress, messageObject) {
  return mosaicHttp
    .getMosaicTransferableWithAmount(
      new nem_library_1.MosaicId(
        AccountUtils_1.getNamespaceName(),
        mosaicName.toLowerCase(),
      ),
      1,
    )
    .map(function(m) {
      return nem_library_1.TransferTransaction.createWithMosaics(
        nem_library_1.TimeWindow.createWithDeadline(),
        recipientAddress,
        [m],
        messageObject,
      );
    })
    .flatMap(function(t) {
      return TransactionService_1.signAndBroadcastTransaction(t);
    });
};
exports.sendSingleMosaic = sendSingleMosaic;
