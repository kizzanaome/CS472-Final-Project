import { createContext, useState, type ReactNode, useEffect, useContext } from "react";

interface Product {
    id: number,
    name: string,
    description: string,
    category: string[],
    price: number,
    dateAdded: Date,
    averageRating: number

}





//define the inteface for the context
interface ProductContextType {
    productList: Product[];
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}
const ProductContext = createContext<ProductContextType>({
    productList: [],
    setProductList: () => { }, // no-op function
  });

interface ProductProviderProps {
    children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [productList, setProductList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/products");
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                if (data) {
                    setProductList(data)
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)

            } else {
                setError("An unknown error occured.")
            }

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProducts()
    }
        , [])
    return (
        <ProductContext.Provider value={{ productList, setProductList }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext);