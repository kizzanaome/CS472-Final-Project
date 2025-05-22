import iphone from '../assets/images/iphone.webp'
import type { ProductInterface } from '../interfaces/ProductInterface';
interface ProductProps {
    product: ProductInterface;
}

export function Product({ product }: ProductProps) {
    return (
        <div>
            <div>
                <img src={iphone} alt="product" className='product-img' />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{new Date(product.dateAdded).toLocaleDateString()}</p>
                <p>{product.averageRating}</p>
                <button className='btn btn-primary'>Review</button>
            </div>
        </div>
    )
}

