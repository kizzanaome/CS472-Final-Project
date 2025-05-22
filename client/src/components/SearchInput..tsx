import { useEffect, useState } from "react"
import { useProductContext } from "../context/ProductContext";

export function SearchInput() {

    const context = useProductContext();

    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }

    const { setSearchQuery, searchQuery } = context;
    const [inputValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            // only updates after user stops typing
            setSearchQuery(inputValue);
        }, 100);
        // cleanup on next keystroke
        return () => clearTimeout(timeout);
    }, [inputValue]);

    return (
        <div className="d-flex align-items-center w-50">
            {/* <label htmlFor="search" className="form-label mr-3">Search:</label> */}
            <input className="form-control ml-3"
                id="search"
                name="Search product by name"
                placeholder="Search product..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
        </div>
    )
}