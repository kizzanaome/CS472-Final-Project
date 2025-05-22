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
    page: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loading: boolean;
    error: string | null;
    setPage: (page: number) => void;
    total: number;
    setTotal: (total: number) => void;
}
const ProductContext = createContext<ProductContextType>({
    productList: [],
    setProductList: () => { },
    searchQuery: '',
    setSearchQuery: () => { },
    loading: false,
    error: null,
    page: 1,
    setPage: () => { },
    total: 0,
    setTotal: () => { }


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
    const [total, setTotal] = useState(0);




    const fetchProducts = async (page = 1, category?: string) => {
        try {
            setLoading(true)
            let url = `http://localhost:3000/products?page=${page}`;
            if (category) {
                url += `&category=${encodeURIComponent(category)}`;
            }

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setProductList(data.products)
                    setTotal(data.pagination.totalItems)
                    setPage(data.pagination.currentPage);

                }
            } else {
                throw new Error("Failed to fetch products")
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



    //search product by name
    const searchProducts = async (query: string) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/products/search?q=${encodeURIComponent(query)}`);

            if (!response.ok) throw new Error('Failed to fetch products');

            const results = await response.json();
            setProductList(results);
            setTotal(results.length);
            setPage(1);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            searchProducts(searchQuery);
        } else {
            fetchProducts(page);
        }
    }
        , [searchQuery, page])




    return (
        <ProductContext.Provider value={{
            productList,
            setProductList,
            searchQuery,
            setSearchQuery,
            loading,
            error,
            page,
            setPage,
            total,
            setTotal
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => useContext(ProductContext);