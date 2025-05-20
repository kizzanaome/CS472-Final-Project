import { createContext, useState, type ReactNode, useEffect } from "react";

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
    productList: any[];
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}
const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
    children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [productList, setProductList] = useState<any[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/products");
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setProductList(data)
                }
            }
        } catch (error) {
            console.log("failed to fetch:", error)
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