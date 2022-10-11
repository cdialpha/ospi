import * as trpc from "@trpc/server";
import asknew from "../../pages/asknew";
import { createRouter } from "../createRouter";
import aws from "aws-sdk";
import { env } from "../../env/server.mjs";
import crypto from "crypto";

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
  async resolve({ ctx }) {
    if (!ctx.session?.user) {
      new trpc.TRPCError({
        code: "FORBIDDEN",
        message: "Cannot create a post while logged out",
      });
    }
    const uploadUrl = s3.getSignedUrlPromise("putObject", params);
    return uploadUrl;
  },
});
