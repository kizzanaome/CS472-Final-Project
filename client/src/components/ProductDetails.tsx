import { useParams } from 'react-router-dom';
import type { ProductInterface } from '../types/ProductInterface';
import { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import iphone from '../assets/images/iphone.webp'
import { Reviews } from './ProductReviews';
import placeholder from '../assets/images/placeholder_img3.png'


function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { productList } = useProductContext();

    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const foundProduct = productList.find(p => p.id.toString() === id);

        if (foundProduct) {
            setProduct(foundProduct);
            setError(null);
        } else {

            setLoading(true);
            setError(null);

            fetch(`http://localhost:3000/products/${id}/reviews`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch product');
                    return res.json();
                })
                .then((data: ProductInterface) => {
                    setProduct(data);
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id, productList]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <>
            <div className="row">
                <div className="col-md-6 text-center">
                    <div className='product-image-box'>
                        <img src={placeholder} className="product-image img-fluid" alt="AirPods Pro" />
                    </div>
                </div>

                <div className="col-md-6">
                    <h3>{product.name}</h3>
                    <div className="mb-3">
                        <i className="bi bi-star-fill"></i> {product.averageRating}
                    </div>

                    <p>{product.description}</p>

                    <h4 className="text-primary mb-3">${product.price}</h4>

                    <ul className="list-unstyled">
                        {product?.category?.length > 1 ? product.category?.join(', ') : product?.category}
                        <li><strong>Category:</strong> {product?.category?.length > 1 ? product.category?.join(', ') : product?.category}</li>

                        <li><strong>Date Added:</strong> {new Date(product.dateAdded).toLocaleDateString()}</li>
                    </ul>

                    <button className="btn btn-outline-primary btn-sm">Add Review</button>

                </div>
            </div>



            <div className="mt-4">
                <h4 className='mb-4'>Product Reviews</h4>
                <Reviews
                    reviews={product.reviews}
                />
            </div>


            <div className="mt-5">
                <h4>Leave a Review</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Name: </label>
                        <input type="text" className="form-control" id="author" placeholder="Enter your name" />
                    </div>

                    {/* author
                    productid
                    Rating
                    comment */}

                    <div className="mb-3">
                        <label htmlFor="reviewRating" className="form-label">Rating</label>
                        <select className="form-select" id="reviewRating">
                            <option value="5"><i className="bi bi-star-fill"></i> 5.0</option>
                            <option value="4"><i className="bi bi-star-fill"></i> 4.0</option>
                            <option value="3"><i className="bi bi-star-fill"></i> 3.0</option>
                            <option value="2"><i className="bi bi-star-fill"></i> 2.0</option>
                            <option value="1"><i className="bi bi-star-fill"></i> 1.0</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="reviewComment" className="form-label">Review</label>
                        <textarea className="form-control" id="reviewComment" rows={4} placeholder="Write your experience..."></textarea>
                    </div>

                    <button type="submit" className="btn btn-outline-primary btn-sm">Submit Review</button>
                </form>
            </div>
        </>

    );
}

export default ProductDetails;
