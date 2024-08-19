const {Router} = require('express');
const { getEmployeeVisaDoc, putEmployeeVisaDocName, postEmployeeVisaDoc, getEmployeeUploadedDocumentUrls } = require('../controllers/employeeVisaController');
const multer = require('multer');
const path = require('path')
const upload = multer({dest: 'upload/'})


const visaRouter = Router()

visaRouter.get('/employee', getEmployeeVisaDoc)
visaRouter.post('/employee', postEmployeeVisaDoc)
visaRouter.put('/employee', upload.single('document'), putEmployeeVisaDocName)
visaRouter.get('/employee/doc', getEmployeeUploadedDocumentUrls)

module.exports = visaRouter;