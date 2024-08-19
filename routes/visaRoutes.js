const {Router} = require('express');
const { getEmployeeVisaDoc, putEmployeeVisaDocName, postEmployeeVisaDoc, getEmployeeUploadedDocumentUrls } = require('../controllers/employeeVisaController');
const multer = require('multer');
const path = require('path');
const { getEmployeeVisaPreview, putEmployeeVisaApprove, putEmployeeVisaReject } = require('../controllers/hrVisaController');
const upload = multer({dest: 'upload/'})


const visaRouter = Router()

visaRouter.get('/employee', getEmployeeVisaDoc)
visaRouter.post('/employee', postEmployeeVisaDoc)
visaRouter.put('/employee', upload.single('document'), putEmployeeVisaDocName)
visaRouter.get('/employee/doc', getEmployeeUploadedDocumentUrls)

visaRouter.get('/hr', getEmployeeVisaPreview)
visaRouter.put('/hr/approve', putEmployeeVisaApprove)
visaRouter.put('/hr/reject', putEmployeeVisaReject)

module.exports = visaRouter;