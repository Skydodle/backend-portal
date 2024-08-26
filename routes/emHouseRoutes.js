const { Router } = require('express');
const {
  createFacilityReport,
  getFacilityReportsForHouse,
} = require('../controllers/facilityReportController');
const { getHouseDetails } = require('../controllers/houseController');
const {
  addCommentToFacilityReport,
  updateComment,
  getCommentsForFacilityReport,
} = require('../controllers/commentController');
const { validateJWT } = require('../middlewares/AuthMiddleware');

const emHouseRouter = Router();

emHouseRouter.get('/house/:id', validateJWT, getHouseDetails);
emHouseRouter.post('/house/:houseId/report', validateJWT, createFacilityReport);
emHouseRouter.get(
  '/house/:houseId/reports',
  validateJWT,
  getFacilityReportsForHouse,
);
emHouseRouter.post(
  '/report/:reportId/comment',
  validateJWT,
  addCommentToFacilityReport,
);
emHouseRouter.put('/comment/:id', validateJWT, updateComment);
emHouseRouter.get(
  '/report/:reportId/comments',
  validateJWT,
  getCommentsForFacilityReport,
);

module.exports = emHouseRouter;
