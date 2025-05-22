import { useState } from "react"

export function SearchProducts(){
    const [searchQuery, setSearchQuery] =  useState("")
    return(
        <div>
            {/* <input name="Search product by name" value={searchQuery} onChange={(e) => setSearchQuery(event.target.value)}/> */}
        </div>
    )
}