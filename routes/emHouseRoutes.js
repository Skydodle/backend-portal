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

emHouseRouter.get('/:id', validateJWT, getHouseDetails);
emHouseRouter.post('/:houseId/report', validateJWT, createFacilityReport);
emHouseRouter.get('/:houseId/reports', validateJWT, getFacilityReportsForHouse);
emHouseRouter.post(
  '/report/:reportId/comment',
  validateJWT,
  addCommentToFacilityReport,
);
emHouseRouter.put('/comment/:commentId', validateJWT, updateComment);
emHouseRouter.get(
  '/report/:reportId/comments',
  validateJWT,
  getCommentsForFacilityReport,
);

module.exports = emHouseRouter;
