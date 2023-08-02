const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}); 

const endpoint = new AWS.Endpoint('cellar-c2.services.clever-cloud.com');
const s3 = new AWS.S3({ endpoint });

const getFile = async (file) => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: 'images-tigum', Key: file }, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (file.endsWith('.html') || file.endsWith('.md')) {
            const file = new TextDecoder('utf-8').decode(data.Body);
            resolve(file);
        } else {
            resolve(data.Body);
        }
      }
    });
  });
};

const writeFileToDisk = async (file, fileKey) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileKey, file, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(fileKey);
            }
        })
    })

}

const getFilesInBucket = (bucketName, cb) => {
  s3.listObjects({ Bucket: bucketName }, cb);
};

const storeFilesLocally = async (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const fileKeys = data['Contents'].map((file) => file.Key);
        for (var i = 0; i < fileKeys.length; i++) {
           const file = await getFile(fileKeys[i]);
           const path = await writeFileToDisk(file, `images/${fileKeys[i]}`);
           console.log(`file written to disk: ${path}`);
        }
    }
}

const downloadAllFilesInBucket = (bucketName) => {
  getFilesInBucket(bucketName, storeFilesLocally);
}

downloadAllFilesInBucket('images-tigum');
