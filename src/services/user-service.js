const {UserRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError= require('../utils/errors/app-error')
const { Auth } = require('../utils/common');
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

async function signin(data){
    try {
        const user = await userRepository.getUserbyEmail(data.email);
        if(!user){
            throw new AppError("No user found for given email", StatusCodes.NOT_FOUND);
        }
       const passwordMatch =  Auth.checkPassword(data.password, user.password);

       if(!passwordMatch){
          throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
       }
       const token = Auth.createToken({id:user.id, email:user.email});
       return token;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError("Something went wrong ", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports= {
    create,
    signin
}