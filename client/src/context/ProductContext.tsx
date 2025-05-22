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
    // total: number;
    page: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
    error: string | null;
    setPage: (page: number) => void;
}
const ProductContext = createContext<ProductContextType>({
    productList: [],
    setProductList: () => { },
    searchQuery: '',
    setSearchQuery: () => { },
    loading: false,
    error: null,
    page: 1,
    setPage: () => { }

});

interface ProductProviderProps {
    children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [productList, setProductList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1);



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


    // const searchProducts = async (query: string) => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch("http://localhost:3000/products",{

    //         });
    //         setProducts(results);
    //         setTotal(results.length);
    //         setError(null);
    //     } catch (err) {
    //         setError('Failed to search products.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchProducts()
    }
        , [productList, searchQuery])




    return (
        <ProductContext.Provider value={{ productList, setProductList, searchQuery, setSearchQuery, loading, error, page, setPage }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext);