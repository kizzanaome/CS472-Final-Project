import express from 'express';
import { getProducts, getProductById, searchProducts, getProductReviews, addProductReview, updateProductReview, deleteProductReview } from '../controllers/productController.ts';
import { Review } from '../models/reviews.ts';


const productRouter = express.Router();
productRouter.get('/search', searchProducts);
productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);

/**review endpoints**/
productRouter.get('/:productId/reviews', getProductReviews )
productRouter.post('/:productId/reviews', addProductReview)
productRouter.put('/:productId/reviews/:id', updateProductReview)
productRouter.delete('/:productId/reviews/:id', deleteProductReview)




export default productRouter;
