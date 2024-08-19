const fs = require('fs');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../config/connectionS3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();
const { BUCKET_NAME } = process.env;

// Function to upload a file to S3
const uploadFileToS3 = async (filePath, newFileName, mimeType) => {
    try {
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: BUCKET_NAME,
            Key: newFileName,
            Body: fileContent,
            ContentType: mimeType,
        };
        const command = new PutObjectCommand(params);
        const data = await s3.send(command);
        console.log("File uploaded successfully", data);
        return data;
    } catch (e) {
        console.error("Error uploading file to S3", e);
        throw e;
    }
};

// Function to get a temporary URL for a file in S3
const getTemporaryUrlFromS3 = async (fileName) => {
    try {
        const getObjectParams = {
            Bucket: BUCKET_NAME,
            Key: fileName,
        };
        
        // Step 1: Retrieve object metadata
        const headCommand = new HeadObjectCommand(getObjectParams);
        const metadata = await s3.send(headCommand);
        const mimeType = metadata.ContentType; // Get the MIME type from the metadata
        console.log("MIME Type:", mimeType);
        
        // Step 2: Generate a presigned URL
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { url, mimeType }; // Return both the URL and MIME type
    } catch (e) {
        console.error("Error getting temporary URL from S3", e);
        throw e;
    }
};

// Function to delete a file from S3
const deleteFileFromS3 = async (fileName) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
        };
        const command = new DeleteObjectCommand(params);
        const data = await s3.send(command);
        console.log("File deleted successfully", data);
        return data;
    } catch (e) {
        console.error("Error deleting file from S3", e);
        throw e;
    }
};

module.exports = {
    uploadFileToS3,
    getTemporaryUrlFromS3,
    deleteFileFromS3,
};