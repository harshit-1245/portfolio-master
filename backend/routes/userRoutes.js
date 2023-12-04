const express=require('express');
const { getUser, sendInfo, sendEmail } = require( '../controllers/userControllers' );
const router=express.Router();

router.route('/').get(getUser);
router.route('/user').post(sendInfo)
router.route('/send-email').post(sendEmail)

module.exports=router;