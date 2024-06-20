"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const { AWS_HOST, AWS_ACCESS, AWS_SECRET } = process.env;
const aws_sdk_1 = require("aws-sdk");
const AWS_config = {
    endpoint: AWS_HOST,
    accessKeyId: AWS_ACCESS,
    secretAccessKey: AWS_SECRET
};
exports.s3 = new aws_sdk_1.S3(AWS_config);
