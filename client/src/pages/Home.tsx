import { Pagination } from "../components/Pagination";
import ProductList from "../components/ProductList";
import { SearchInput } from "../components/SearchInput.";
import { useProductContext } from "../context/ProductContext";

export function Home() {
    const { page, setPage, total } = useProductContext();
    return (
        <div>
            <SearchInput />
            <ProductList />
            <Pagination
                currentPage={page}
                totalItems={total}
                pageSize={10}
                onPageChange={setPage}
            />
        </div>
    )
}