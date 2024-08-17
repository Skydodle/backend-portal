const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config()
const { BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env


// connect to S3 bucket
const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey:SECRET_ACCESS_KEY
    }    
});

module.exports = s3
