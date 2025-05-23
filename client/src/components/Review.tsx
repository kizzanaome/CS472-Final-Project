import { useState } from "react";
import type { ReviewType } from "../types/ProductInterface";
import { EditReview } from "./EditReview";
import { useProductContext } from "../context/ProductContext";
type ReviewProp = {
    id: string
    review: ReviewType;
};

export function Review({ review, id }: ReviewProp) {

    const { fetchProducts } = useProductContext();


    const deleteReview = async (reviewId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/products/${id}/reviews/${reviewId}`, {
                method: 'DELETE',
            });

            console.log(response)

            // if (!response.ok) {
            //     throw new Error('Failed to delete review');
            // }

            const data = await response.json();
            console.log('Review deleted:', data);
            alert('Review deleted successfully!');

            fetchProducts();

        } catch (err) {
            console.error('Error:', err);
            alert('Error deleting review.');
        }
    };
    

    const [viewEdit, setViewEdit] = useState(false)
    return (
        <>
            <div className="review">
                <div className="d-flex justify-content-between">
                    <strong>{review.author}</strong>
                    <span>
                        <i className="bi bi-star-fill"></i> {review.rating}

                        <button className="btn" onClick={() => setViewEdit(!viewEdit)}><i className="bi bi-pencil-fill ms-4"></i></button>
                        <i className="bi bi-trash-fill ms-2 text-danger"></i>
                    </span>
                </div>
                <p>{review.comment}</p>
                <small className="text-muted">{review.date}</small>
            </div>

            <button onClick={() => setViewEdit(!viewEdit)}>Edit Review</button>
            <button onClick={() => deleteReview(review.id)}>Delete Review</button>

            {viewEdit && <EditReview
                id={id}
                reviewData={review}
                setViewEdit={() => setViewEdit(!viewEdit)}

            />}

        </>

    )
}