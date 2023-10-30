const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const {UserService} = require('../services')
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

async function checkAuth(req, res, next){
    try {
        const response =await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response){
            res.user = response;
            next();
        }
    } catch (error) {
        return res
        .status(error.statusCode)
        .json(error)
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth
}