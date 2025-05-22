import express from 'express';
import { getProducts, getProductById, searchProducts, getProductReviews } from '../controllers/productController.ts';
import { Review } from '../models/reviews.ts';


const productRouter = express.Router();
productRouter.get('/search', searchProducts);
productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);

/**review endpoints**/
productRouter.get('/:productId/reviews', getProductReviews )


export default productRouter;
