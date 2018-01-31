import '@firebase/storage';
import '@firebase/firestore';
import firebase from '@firebase/app';
import CryptoJS from 'crypto-js';

const storageRef = firebase.storage().ref();

const data = {
  uploading: false,
  percent: 0,
  file: '',
  hashes: '',
  url: '',
  error: '',
};

const handleFileSelect = e => {
  data.file = e.target.files[0];
  calculateHashes();
};

const handleFileUpload = callback => {
  data.uploading = true;
  var someVar = storageRef.child('file').put(data.file);
  someVar
    .then(snap => {
      data.uploading = false;
    })
    .catch(err => data.error.message);

  someVar.on(
    'state_changed',
    function(snapshot) {
      var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    function(error) {
      // Handle unsuccessful uploads
    },
    function() {
      data.url = someVar.snapshot.downloadURL;
      callback();
    },
  );
};

function calculateHashes() {
  const reader = new FileReader();
  reader.readAsBinaryString(data.file);
  reader.onloadend = function() {
    let md5 = CryptoJS.MD5(reader.result).toString();
    let sha1 = CryptoJS.SHA1(reader.result).toString();
    data.hashes = { md5: md5, sha1: sha1 };
  };
}

const FileService = {
  data,
  handleFileSelect,
  handleFileUpload,
};
export default FileService;
