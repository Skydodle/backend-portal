// const db = require('./connection');
const Employee = require('../models/Employee');
const argon2 = require('argon2');
const visaDocumentS = require('../models/VisaDocuments')
const fs = require('fs');
const { PutObjectCommand, HeadObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('./connectionS3')
require('dotenv').config()
const { BUCKET_NAME } = process.env
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const seedHR = async () => {
  try {
    await Employee.deleteMany({ role: 'HR' }); // Delete existing HR accounts

    const hashedPassword = await argon2.hash('1234HR!');

    await Employee.create({
      username: 'hradmin',
      email: 'hr@company.com',
      password: hashedPassword,
      role: 'HR',
    });

    console.log('HR account seeded successfully');
  } catch (error) {
    console.error('Error seeding HR account', error);
  } finally {
    await db.close();
  }
};

// seedHR();


// for visa documents seed
const seedVisa = async () => {
  try {
    await visaDocumentS.create({
      userid:'xxxxxx',
      optReceipt:{name:'receipt'},
      optEAD:{name:'ead'},
      i983:{name:'i983'},
      i20:{name:'i20'}
    })


  } catch (e) {
    console.error('Error seeding visa documents dataset', e)
  } finally {
    await db.close()
  }
}
// seedVisa()



//example for object push to S3
// I will pass filePath, newFileName, mimeType as params when I working on this in controller
const s3Put = async (newFileName) => {
  try {
    // Read the file from local as a test
    const fileContentjpeg = fs.readFileSync("C:/Users/i9856/Desktop/spongebob.jpeg");
    const fileContentpdf = fs.readFileSync("C:/Users/i9856/Desktop/MLA_form.pdf");
    

    const params = {
      Bucket: BUCKET_NAME,

    // Specifying the file extension will be better
    //   Key: 'example.jpeg',
      Key: newFileName,
    //   Body: fileContentjpeg,
      Body: fileContentpdf,
    //   ContentType: 'image/jpeg',
      ContentType: 'application/pdf',
      // You have to specify the type; otherwise, the file will download locally when using s3GetUrl
      // application/pdf  image/jpeg (for jpg/jpeg)  image/png
    };
    const command = new PutObjectCommand(params);

    // Send the command to S3
    const data = await s3.send(command);
    console.log("File uploaded successfully", data);
  } catch (e) {
    console.error("Error uploading", e);
  }
};



// get object from S3 with temporary url
const s3GetUrl = async (fileName) => {
    try{
        const getObjectParams = {
            Bucket: BUCKET_NAME,
            // Key: 'example.jpeg',
            Key: fileName,
        }
        // Step 1: Retrieve object metadata
        // passing mimeType to frontend. using <img> for picture, <iframe> for pdf
        const headCommand = new HeadObjectCommand(getObjectParams);
        const metadata = await s3.send(headCommand);
        const mimeType = metadata.ContentType; // Get the MIME type from the metadata
        console.log("MIME Type:", mimeType);
        
        // Step 2: Generate a presigned URL
        const command = new GetObjectCommand(getObjectParams);
        //expires in 1 hour
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        console.log("Get Url successfully", url);
    } catch (e) {
        console.error("Error getting url", e);
    }
}

// implemented delete if needed
const s3DeleteObject = async (fileName) => {
    try {
        const deleteObjectParams = {
            Bucket: BUCKET_NAME,
            Key: fileName,
        };

        const command = new DeleteObjectCommand(deleteObjectParams);
        const data = await s3.send(command);
        console.log("File deleted successfully", data);
    } catch (e) {
        console.error("Error deleting file", e);
    }
};
// s3DeleteObject('example.pdf')

const executePutAndGet = async () => {
    await s3Put('example.pdf');    // Wait for the file to be uploaded
    await s3GetUrl('example.pdf'); // Then get the URL
  };
  
// executePutAndGet();
