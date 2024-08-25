const {Router} = require('express');
const { getEmployeeVisaDoc, putEmployeeVisaDocName, postEmployeeVisaDoc, getEmployeeUploadedDocumentUrls } = require('../controllers/employeeVisaController');
const multer = require('multer');
const path = require('path');
const { getEmployeeVisaPreview, putEmployeeVisaApprove, putEmployeeVisaReject, getF1EmployeeVisaStatus } = require('../controllers/hrVisaController');
const { validateJWT } = require('../middlewares/AuthMiddleware');
const upload = multer({dest: 'upload/'})


const visaRouter = Router()

visaRouter.get('/employee', validateJWT, getEmployeeVisaDoc)
visaRouter.post('/employee',validateJWT, upload.single('document'), postEmployeeVisaDoc)
visaRouter.put('/employee', validateJWT, upload.single('document'), putEmployeeVisaDocName)
visaRouter.get('/employee/doc', validateJWT, getEmployeeUploadedDocumentUrls)

visaRouter.get('/hr', getF1EmployeeVisaStatus)
visaRouter.post('/hr/doc', getEmployeeVisaPreview)
visaRouter.put('/hr/approve', putEmployeeVisaApprove)
visaRouter.put('/hr/reject', putEmployeeVisaReject)

module.exports = visaRouter;