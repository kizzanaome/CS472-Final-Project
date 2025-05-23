import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
// import  {  ReviewInterface }  from '../types/interface.ts';

// import { ProductInterface } from '../interface.ts';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.resolve(__dirname, '../storage/products.json');

const filePath = path.join(__dirname, '../storage/products.json');

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
    id: number,
    productId: number,
    author: string,
    rating: string,
    comment: string,
    date: Date
}

export class Product implements ProductInterface {
    public id: number;
    public name: string;
    public description: string;
    public category: string;
    public price: number;
    public dateAdded: Date;
    public averageRating: number;


    constructor(id: number, name: string, description: string, category: string, price: number, dateAdded: Date, averageRating: number) {
        this.id = id,
            this.name = name,
            this.description = description,
            this.category = category,
            this.price = price,
            this.dateAdded = dateAdded,
            this.averageRating = averageRating
    }

    private static async readProducts(): Promise<ProductInterface[]> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading or parsing products.json:', error);
            return [];
        }
    }

    static async fetchFilteredAndPaginated(page = 1, category?: string): Promise<{
        products: ProductInterface[]
        totalItems: number,
        totalPages: number,
        currentPage: number
    }> {
        const products = await this.readProducts();

        let filtered = products;
        if (category) {
            filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        // Sort by dateAdded descending
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());

        // Paginate
        const pageSize = 10;
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const currentPage = Math.max(1, Math.min(page, totalPages))

        const startIndex = (page - 1) * pageSize;
        const paginated =
            currentPage > totalPages ? [] : filtered.slice(startIndex, startIndex + pageSize);


        return {
            products: paginated,
            totalItems,
            totalPages,
            currentPage
        }
    }



    static async fetchAll(): Promise<ProductInterface[]> {
        return await this.readProducts();
    }

    static async getProductById(productId: number): Promise<ProductInterface | undefined> {
        const products = await this.readProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            return products[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    static async searchProductsByName(productName: string): Promise<Product[]> {
        const products = await this.readProducts();
        const foundProducts = products.filter(item => item.name.toLowerCase().includes(productName.toLowerCase()));
        return foundProducts
    }




}
