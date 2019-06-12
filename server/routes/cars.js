import Cars from '../controllers/cars';
import express from 'express';
import imageMiddleware from '../middlewares/imageParser';
import verifyToken from '../middlewares/veirfyToken';

const router = express.Router()


router.get('/', Cars.getAllCars);


router.post("/",verifyToken, imageMiddleware, Cars.add);

export default router;