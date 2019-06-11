import User from '../controllers/users';
import express from 'express';
import {validateNewUser, isRegistered} from '../middlewares/signupValidation';
import {validateLoginDetails} from '../middlewares/login';
import { updateUserValidation } from '../middlewares/updateUser';

const router = express.Router()


router.get('/', (req, res) => {
    res.send("Welcome")
});


router.post("/signup", validateNewUser, isRegistered,User.create);

router.post("/login", validateLoginDetails, User.login);

router.patch("/update",updateUserValidation, User.updateUser)


export default router;