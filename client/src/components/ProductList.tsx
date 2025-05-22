import { useProductContext } from '../context/ProductContext';
import { Product } from './Product'



const ProductList = ({ }) => {
    const context = useProductContext();

    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }

    const { productList } = context;

    return (
        <div className="d-flex justify-content-between w-75 mx-auto">
            {productList.map((item, key) => {
                return <Product
                    key={key}
                    product={item}
                />
            })}
        </div>
    )
}


{/* <div>
    <img src={iphone} alt="product" className='product-img' />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>{product.category}</p>
    <p>{product.price}</p>
    <p>{product.dateAdded}</p>
    <p>{product.averageRating}</p>
    <button className='btn btn-primary'>Review</button>
</div> */}

export default ProductList
