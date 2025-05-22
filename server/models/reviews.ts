import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../storage/products.json');

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


export interface ReviewInterface {
    id: number,
    productId: number,
    author: string,
    rating: string,
    comment: string,
    date: Date
}



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

export class Review implements ReviewInterface {
    public id: number;
    public productId: number;
    public author: string;
    public rating: string;
    public comment: string;
    public date: Date;

    constructor(id: number, productId: number, author: string, rating: string, comment: string, date: Date) {
        this.id = id;
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
        const products  = await this.readReviews();
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

    async  writeProducts(products: ProductInterface[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      }

     async save(): Promise<this> {

        const products = await   Review.readReviews();
        // this.id = Math.random();
        // products.push(this);
        // return this;
        this.id = Number(Math.random());
        this.date = new Date();
        products.push(this);
        await Review.writeProducts(products); 
        return this;
    }

// this.id = Date.now(); // or Math.random(), just make sure it's unique
// this.date = new Date(); // if not already set
// product.reviews.push(this);

// await Review.writeProducts(products); // save updated products array

// return this;






}