const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'MI4KC197Y2IGVDWCY4ZR',
  secretAccessKey: 'e4Jb6HMD6EeLDZwC2b4AGl4DbuLLzBKFKotxQAOX',
});


const endpoint = new AWS.Endpoint('cellar-c2.services.clever-cloud.com');

const s3 = new AWS.S3({ endpoint: "cellar-c2.services.clever-cloud.com" });

export const getBuckets = () => {
  s3.listBuckets(function (err: any, res: any) {
    console.log(res);
  });
};

getBuckets()

export const uploadToBucket = (data: any, fileKey: string, bucket: string) => {
  return new Promise((resolve, reject) => {
    const base64data = new Buffer(data, 'binary');
    s3.putObject(
      {
        Bucket: 'notes',
        Key: fileKey,
        Body: base64data,
        ContentType: 'text/html;charset=utf-8',
      },
      (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

export const getFile = (file: string, bucket: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: 'notes', Key: file }, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        const file = new TextDecoder('utf-8').decode(data.Body);
        resolve(file);
      }
    });
  });
};

export const deleteFile = (file: string, bucket: string) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: bucket, Key: file }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/* In order to share access to access non-public files via HTTP, you need to get a presigned url for a specific key
 * the example above present a 'getObject' presigned URL. If you want to put a object in the bucket via HTTP,
 * you'll need to use 'putObject' instead.
 * see doc : http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
 */
export const getSignedPublicUrl = (bucket, key) => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', { Bucket: bucket, Key: key }, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })
}

export const uploadImage = (data, type, fileName) => {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: 'images-tigum',
        Key: fileName,
        Body: data,
        ContentType: type,
      },
      (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          console.log("Image uplaod res: ", data)
          resolve(data);
        }
      }
    );
  })
}

export const uploadImageandGetPublicUrl = async ({
  data,
  type,
  fileName
}) => {
  await uploadImage(data, type, fileName);
  return `https://images-tigum.cellar-c2.services.clever-cloud.com/${fileName}`
}
