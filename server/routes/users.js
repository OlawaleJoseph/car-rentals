import User from '../controllers/users';
import express from 'express';
import {validateNewUser, isRegistered} from '../middlewares/signupValidation'

const router = express.Router()


router.get('/', (req, res) => {
    res.send("Welcome")
});


router.post("/signup", validateNewUser, isRegistered,User.create);


export default router;