
export  interface ReviewInterface {
    id: number,
    productId: number,
    author: string,
    rating: string,
    comment: string,
    date: Date
}



export  interface ProductInterface {
    id: number,
    name: string,
    description: string,
    category: string,
    price: number,
    dateAdded: Date,
    averageRating: number,
    reviews?: ReviewInterface[];
}
