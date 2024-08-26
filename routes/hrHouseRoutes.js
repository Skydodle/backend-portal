const { Router } = require('express');
const {
  createHouse,
  deleteHouse,
  getAllHouses,
  getHouseDetails,
} = require('../controllers/houseController');
const {
  updateFacilityReportStatus,
  getFacilityReportsForHouse,
} = require('../controllers/facilityReportController');
const {
  addCommentToFacilityReport,
  updateComment,
} = require('../controllers/commentController');
const { validateHRJWT } = require('../middlewares/AuthMiddleware');

const hrHouseRouter = Router();

hrHouseRouter.post('/house', validateHRJWT, createHouse);
hrHouseRouter.delete('/house/:id', validateHRJWT, deleteHouse);
hrHouseRouter.get('/houses', validateHRJWT, getAllHouses);
hrHouseRouter.get('/house/:id', validateHRJWT, getHouseDetails);
hrHouseRouter.put(
  '/report/:id/status',
  validateHRJWT,
  updateFacilityReportStatus,
);
hrHouseRouter.get(
  '/house/:houseId/reports',
  validateHRJWT,
  getFacilityReportsForHouse,
);
hrHouseRouter.post(
  '/report/:reportId/comment',
  validateHRJWT,
  addCommentToFacilityReport,
);
hrHouseRouter.put('/comment/:id', validateHRJWT, updateComment);

module.exports = hrHouseRouter;
