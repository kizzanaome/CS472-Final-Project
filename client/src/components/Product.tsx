import placeholder from '../assets/images/placeholder_img3.png'
import type { ProductInterface } from '../types/ProductInterface';
import { Link } from 'react-router-dom';
interface ProductProps {
    product: ProductInterface;
}

export function Product({ product }: ProductProps) {
    return (

        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
                <div className="favorite">
                    <i className="bi bi-heart"></i>
                </div>
                <div className='card-image-box'>
                    <img src={placeholder} className="card-image img-fluid" alt="Product" />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-product-title mb-3">{product.name}</h6>
                    <p className="text-muted small">{product.description}</p>
                    <div className="mb-2">
                        <span><i className='bi bi-star-fill'></i> {product.averageRating} </span>
                    </div>

                    <div className='d-flex justify-content-between text-muted mb-2'>
                        <small>{product?.category}</small>
                        <small>{new Date(product.dateAdded).toLocaleDateString()}</small>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="fw-bold mb-0 pb-0">${product.price}</h5>
                        <Link to={`/products/${product.id}/reviews`} className='btn btn-outline-primary btn-sm mt-2'>View more</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

