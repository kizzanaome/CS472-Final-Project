import express from 'express';
import type { Request, Response } from 'express';
import { Product } from '../models/product.ts';
import { Review } from '../models/reviews.ts';


export const getProducts = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const category = req.query.category as string | undefined;

    try {
        const result = await Product.fetchFilteredAndPaginated(page, category);
        res.status(200).json({
            products: result.products,
            pagination: {
                totalItems: result.totalItems,
                totalPages: result.totalPages,
                currentPage: result.currentPage
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}


export const getProductById = async (req: Request, res: Response) => {
    const product = await Product.getProductById(Number(req.params.productId))
    console.log(req.params.productId)
    res.status(200).json(product);
}

export const searchProducts = async (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (typeof query !== 'string' || query.trim() === '') {
        return res.status(400).json({ error: 'Missing or invalid query parameter' });
    }
    const product = await Product.searchProductsByName(query);
    res.status(200).json(product);
}
/** reviews */

export const getProductReviews = async (req: Request, res: Response) => {
    const reviews = await Review.fetchProductReviews(Number(req.params.productId));
    res.status(200).json(reviews);
}

export const addProductReview = async (req: Request, res: Response) => {
    const prodReview = req.body;
    const newReview = new Review(prodReview.productId, prodReview.author, prodReview.rating, prodReview.comment, prodReview.date)
    const savedReview = await newReview.save(Number(req.params.productId));
    res.status(201).json(savedReview);
}

export const updateProductReview = async (req: Request, res: Response) => {
    try {
        const { productId, id } = req.params;
        const updatedData = req.body;
        const updatedReview = await Review.updateReview(Number(productId), Number(id), updatedData);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
};

export const deleteProductReview = async (req: Request, res: Response) => {
    try {
        const { productId, id } = req.params;
        await Review.deleteReview(Number(productId), Number(id));
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Delete failed' });
    }
};






