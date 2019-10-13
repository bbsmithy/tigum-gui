import { any } from "prop-types";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "MI4KC197Y2IGVDWCY4ZR",
  secretAccessKey: "lAVozczUatRDEQ1RAcAvVcbhmh1u3N1W1UIPYkC8"
});
const endpoint = new AWS.Endpoint("cellar-c2.services.clever-cloud.com");

const s3 = new AWS.S3({ endpoint });

export const getBuckets = () => {
  s3.listBuckets(function(err: any, res: any) {
    console.log(res);
  });
};

export const uploadToBucket = (data: any) => {
  const base64data = new Buffer(data, "binary");
  s3.putObject(
    {
      Bucket: "notes",
      Key: "MI4KC197Y2IGVDWCY4ZR",
      Body: base64data
    },
    function(resp: any) {
      console.log(resp);
    }
  );
};

/* In order to share access to access non-public files via HTTP, you need to get a presigned url for a specific key
 * the example above present a 'getObject' presigned URL. If you want to put a object in the bucket via HTTP,
 * you'll need to use 'putObject' instead.
 * see doc : http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
 */
s3.getSignedUrl("getObject", { Bucket: "notes", Key: "MI4KC197Y2IGVDWCY4ZR" });
