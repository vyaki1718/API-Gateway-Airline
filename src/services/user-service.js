const {UserRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError= require('../utils/errors/app-error')

const userRepository= new UserRepository();

async function create(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if ((error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError")) {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "can not create new user object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports= {
    create,
}