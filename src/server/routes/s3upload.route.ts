import * as trpc from "@trpc/server";
import asknew from "../../pages/asknew";
import { createRouter } from "../createRouter";
import aws from "aws-sdk";
import { env } from "../../env/server.mjs";
import crypto from "crypto";
import { getS3Url } from "../../schema/post.schema";

const region = "us-east-1";
const bucketName = "ospi-question-images";
const accessKeyId = env.AWS_S3_UPLOAD_ACCESS_KEY;
const secretAccessKey = env.AWS_S3_UPLOAD_ACCESS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const randomBytes = crypto.randomBytes;
const rawBytes = crypto.randomBytes(16);
const imageName = rawBytes.toString("hex");
const params = {
  Bucket: bucketName,
  Key: imageName,
  Expires: 60,
};

export const s3Router = createRouter().query("s3", {
  input: getS3Url,
  async resolve({ input, ctx }) {
    if (!ctx.session?.user) {
      new trpc.TRPCError({
        code: "FORBIDDEN",
        message: "Cannot create a post while logged out",
      });
    }
    let arrayOfSignedUrls = [];
    for (let i = 0; i < input.numberOfImages; i++) {
      const signedS3Url = await s3.getSignedUrlPromise("putObject", params);
      arrayOfSignedUrls.push(signedS3Url);
    }
    // console.log("from router: ", arrayOfSignedUrls);
    return arrayOfSignedUrls;
  },
});
