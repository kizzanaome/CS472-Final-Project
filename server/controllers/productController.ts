import express from 'express';
import type { Request, Response } from 'express';
import { Product } from '../models/product.ts';
import { Review } from '../models/reviews.ts';


export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.fetchAll();
    res.status(200).json(products);
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

export const save = async (req: Request, res: Response) => {
    const prodReview = req.body;
    const savedProd = new Review(null, prodReview.productId, prodReview.author, prodReview.rating, prodReview.comment, prodReview.date).save();
    res.status(201).json(savedProd);
}






