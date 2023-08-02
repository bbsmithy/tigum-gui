const AWS = require('aws-sdk');
const convertor = require('html-to-markdown');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const endpoint = new AWS.Endpoint('cellar-c2.services.clever-cloud.com');

const s3 = new AWS.S3({ endpoint });

const deleteFile = (file) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: 'notes', Key: file }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log('deleted file: ', file);
        resolve(data);
      }
    });
  });
};

const getFile = async (file) => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: 'notes', Key: file }, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const file = new TextDecoder('utf-8').decode(data.Body);
        resolve(file);
      }
    });
  });
};

const uploadToBucket = (data, fileKey) => {
  return new Promise((resolve, reject) => {
    const base64data = new Buffer(data, 'binary');
    s3.putObject(
      {
        Bucket: 'notes',
        Key: fileKey,
        Body: base64data,
        ContentType: 'text/html;charset=utf-8',
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const pullAndReplaceFiles = async (err, data) => {
  for (var i = 0; i < data['Contents'].length; i++) {
    console.log(data['Contents'][i]);

    try {
      const htmlKey = data['Contents'][i].Key;
      if (htmlKey.includes('.html')) {
        const mdKey = htmlKey.replace('.html', '.md');
        const html = await getFile(htmlKey);
        const md = convertor.convert(html);
        uploadToBucket(md, mdKey)
          .then(() => {
            console.log('Uploaded file: ', mdKey);
            deleteFile(htmlKey);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('NO FILE NAME .HTML', htmlKey);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const getFilesInBucket = () => {
  s3.listObjects({ Bucket: 'notes' }, pullAndReplaceFiles);
};

getFilesInBucket();
