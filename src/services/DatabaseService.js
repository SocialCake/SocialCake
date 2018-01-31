import '@firebase/firestore';
import firebase from '@firebase/app';

const db = firebase.firestore();

//saves data to Firestore
const saveFileToDatabase = file => {
  return db
    .collection('files')
    .add({
      fileName: file.name,
      lastModified: file.lastModified,
      md5: file.md5,
      sha1: file.sha1,
      url: file.url,
      ownerAddress: file.owner,
      price: file.price,
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};

const getFileFromDatabase = productId => {
  let docRef = db.collection('files').doc(productId);
  return docRef;
};

const DatabaseService = {
  saveFileToDatabase,
  getFileFromDatabase,
};

export default DatabaseService;
