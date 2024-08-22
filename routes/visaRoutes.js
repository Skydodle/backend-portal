const {Router} = require('express');
const { getEmployeeVisaDoc, putEmployeeVisaDocName, postEmployeeVisaDoc, getEmployeeUploadedDocumentUrls } = require('../controllers/employeeVisaController');
const multer = require('multer');
const path = require('path');
const { getEmployeeVisaPreview, putEmployeeVisaApprove, putEmployeeVisaReject } = require('../controllers/hrVisaController');
const { validateJWT } = require('../middlewares/authMiddleware');
const upload = multer({dest: 'upload/'})


const visaRouter = Router()

visaRouter.get('/employee', validateJWT, getEmployeeVisaDoc)
visaRouter.post('/employee',validateJWT, upload.single('document'), postEmployeeVisaDoc)
visaRouter.put('/employee', validateJWT, upload.single('document'), putEmployeeVisaDocName)
visaRouter.get('/employee/doc', validateJWT, getEmployeeUploadedDocumentUrls)

visaRouter.get('/hr', getEmployeeVisaPreview)
visaRouter.put('/hr/approve', putEmployeeVisaApprove)
visaRouter.put('/hr/reject', putEmployeeVisaReject)

module.exports = visaRouter;