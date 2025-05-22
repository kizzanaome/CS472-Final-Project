import ProductList from "../components/ProductList";
import { SearchInput } from "../components/SearchInput.";

export function Home() {
    return (
        <div>
            <SearchInput />
            <ProductList />
        </div>
    )
}