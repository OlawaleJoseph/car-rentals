import Cars from '../controllers/cars';
import express from 'express';
import imageMiddleware from '../middlewares/imageParser';
import verifyToken from '../middlewares/veirfyToken';
import verifyCarUpdate from '../middlewares/updateCar';

const router = express.Router()


router.get('/', Cars.getAllCars);

router.get('/:id', Cars.getOneCar)

router.post("/",verifyToken, imageMiddleware, Cars.add);

router.patch('/:id', verifyToken,verifyCarUpdate, Cars.updateCar)

export default router;