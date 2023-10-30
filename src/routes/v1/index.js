const express =require('express');

const router=express.Router();
const {InfoController} =require('../../controllers')
const {AuthMiddleware} = require('../../middlewares');
const userRoutes= require('./user-routes');

router.get('/info', AuthMiddleware.checkAuth, InfoController.info)

router.use('/user', userRoutes);



module.exports=router;