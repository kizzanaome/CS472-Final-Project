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
    id: number;
    productId: string;
    author: string;
    rating: string;
    comment: string;
    date: string;
  };


