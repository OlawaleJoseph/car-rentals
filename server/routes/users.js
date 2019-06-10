import User from '../controllers/users';
import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    res.send("Welcome")
});


router.post("/signup", User.create);


export default router;