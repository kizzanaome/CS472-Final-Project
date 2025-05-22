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
            {/* <SearchPorduct> */}
            {productList.map((item, key) => {
                return <Product
                    key={key}
                    product={item}
                />
            })}
        </div>
    )
}




export default ProductList
