import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../storage/products.json');

export interface ProductInterface {
    id: number,
    name: string,
    description: string,
    category: string,
    price: number,
    dateAdded: Date,
    averageRating: number,
    reviews?: ReviewInterface[];
}


export interface ReviewInterface {
    id?: number,
    productId: number,
    author: string,
    rating: string,
    comment: string,
    date: Date
}



export class Review implements ReviewInterface {
    public id?: number;
    public productId: number;
    public author: string;
    public rating: string;
    public comment: string;
    public date: Date;

    constructor(productId: number, author: string, rating: string, comment: string, date: Date) {
        this.productId = productId;
        this.author = author;
        this.rating = rating;
        this.comment = comment;
        this.date = date

    }

    private static async readReviews(): Promise<ProductInterface[]> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading or parsing reviews.json:', error);
            return [];
        }
    }

    static async fetchProductReviews(productId: number): Promise<ReviewInterface[]> {
        const products = await this.readReviews();
        // const index = products.findIndex(p => p.id === productId);
        // if (index > -1) {
        //     return products[index].reviews;
        // } else {
        //     throw new Error('NOT Found');
        // }
        const product = products.find(p => p.id === productId);

        if (product && Array.isArray(product.reviews)) {
            return product.reviews;
        } else {
            throw new Error('Product not found or has no reviews');
        }

    }

    static async writeProducts(products: ProductInterface[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    }

    async save(productId: Number): Promise<ReviewInterface> {

        const products = await Review.readReviews();
        //get product id
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const reviews = product.reviews ?? [];

        const maxId = reviews.reduce((max, r) => (r.id && r.id > max ? r.id : max), 0);
        this.id = maxId + 1;
        this.date = new Date();
        reviews.push(this);
        product.reviews = reviews
        await Review.writeProducts(products);
        return this;
    }

    static async updateReview(productId: number, reviewId: number, updatedData: Partial<ReviewInterface>): Promise<ReviewInterface> {

        const products = await Review.readReviews();
        //get product id
        const product = products.find(p => p.id === productId);
        if (!product || !product.reviews) throw new Error("Product or reviews not found");

        const reviewIndex = product.reviews.findIndex(r => r.id === reviewId);
        if (reviewIndex === -1) throw new Error("Review not found");

        product.reviews[reviewIndex] = {
            ...product.reviews[reviewIndex],
            ...updatedData,
            id: reviewId,
            productId,
            date: new Date(),
        };

        await Review.writeProducts(products);
        return product.reviews[reviewIndex];
    }

    static async deleteReview(productId: number, reviewId: number): Promise<void> {
        const products = await this.readReviews();
        const product = products.find(p => p.id === productId);
        if (!product || !product.reviews) throw new Error("Product or reviews not found");

        const reviewIndex = product.reviews.findIndex(r => r.id === reviewId);
        if (reviewIndex === -1) throw new Error("Review not found");

        product.reviews.splice(reviewIndex, 1); // remove review
        await this.writeProducts(products);
    }








}