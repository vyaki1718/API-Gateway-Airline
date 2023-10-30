const dotenv=require('dotenv');

dotenv.config();


module.exports={
    PORT:process.env.PORT || 8080,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY
}