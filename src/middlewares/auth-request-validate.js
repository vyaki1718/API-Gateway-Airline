const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')

function validateAuthRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.messege = "something went wrong while  authenticating  user";
        ErrorResponse.error = { explaination: ["Email not found in oncoming request"] };
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.password) {
        ErrorResponse.messege = "something went wrong while  authenticating  user";
        ErrorResponse.error = { explaination: ["Password not found in oncoming request"] };
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}



module.exports = {
    validateAuthRequest,
}