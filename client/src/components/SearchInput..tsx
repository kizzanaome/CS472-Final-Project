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
        <div>
            <input name="Search product by name" value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
        </div>
    )
}