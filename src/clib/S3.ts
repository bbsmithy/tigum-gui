import { setProfilePicture } from "./api";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const endpoint = new AWS.Endpoint("cellar-c2.services.clever-cloud.com");

const s3 = new AWS.S3({ endpoint: "cellar-c2.services.clever-cloud.com" });

export const getBuckets = () => {
  s3.listBuckets(function (err: any, res: any) {
    console.log(res);
  });
};

export const uploadToBucket = (data: any, fileKey: string, bucket: string) => {
  return new Promise((resolve, reject) => {
    const base64data = new Buffer(data, "binary");
    s3.putObject(
      {
        Bucket: "notes",
        Key: fileKey,
        Body: base64data,
        ContentType: "text/html;charset=utf-8",
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
    s3.getObject({ Bucket: "notes", Key: file }, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        const file = new TextDecoder("utf-8").decode(data.Body);
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
    s3.getSignedUrl("getObject", { Bucket: bucket, Key: key }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

export const uploadImage = (data, type, fileName) => {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: "images-tigum",
        Key: fileName,
        Body: data,
        ContentType: type,
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

export const deleteImage = (fileName) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: "images-tigum",
        Key: fileName,
      },
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getUploadedFileUrl = (fileName) => {
  return `https://images-tigum.cellar-c2.services.clever-cloud.com/${fileName}`;
};

export const uploadImageandGetPublicUrl = async ({ data, type, fileName }) => {
  await uploadImage(data, type, fileName);
  return getUploadedFileUrl(fileName);
};

const sendProfilePic = async (userName, data, type) => {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: "images-tigum",
        Key: userName,
        Body: data,
        ContentType: type,
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

const openImagePicker = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // add onchange handler if you wish to get the file :)
    input.id = "profile-input-uploader";
    input.onchange = async (evt) => {
      // @ts-ignore
      var files = evt.target.files; // FileList object
      var file = files[0];
      resolve(file);
    };
    input.click();
  });
};

export const uploadProfilePictureAndUpdateUser = async (userName) => {
  try {
    const file = await openImagePicker();
    // @ts-ignore
    const imageUploadResult = await sendProfilePic(userName, file, file.type);
    const ppURL = getUploadedFileUrl(userName);
    await setProfilePicture(
      // @ts-ignore
      ppURL
    );
    return ppURL;
  } catch (err) {
    throw err;
  }
};
