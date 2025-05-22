export interface ProductInterface {
    id: number,
    name: string,
    description: string,
    category: string[],
    price: number,
    dateAdded: Date,
    averageRating: number,
    reviews: ReviewType[]
    

}

export type ReviewType = {
    id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  };


