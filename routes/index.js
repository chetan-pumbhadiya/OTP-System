var express = require('express');
var router = express.Router();
var OtpController = require('../controllers/index');
// parseError function use for manage errors
const parseError = require('../helper/helper');

//postman: localhost:3000/api/v1/generate-otp
router.post('/generate-otp', async (req, res) => {
  let ApiResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await OtpController.otp(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

//postman: localhost:3000/api/v1/verify-otp
router.post('/verify-otp', async (req, res) => {
  let ApiResponse = { code: 200, data: null };
  console.log("req.body", req.body);
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await OtpController.verifyOTP(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

module.exports = router;
