import { useState } from "react";
import type { ReviewType } from "../types/ProductInterface";
import { EditReview } from "./EditReview";
type ReviewProp = {
    id: string
    review: ReviewType;
};

export function Review({ review, id }: ReviewProp) {

    const [viewEdit, setViewEdit] = useState(false)
    return (
        <>
            <div className="review">
                <div className="d-flex justify-content-between">
                    <strong>{review.author}</strong>
                    <span>
                        <i className="bi bi-star-fill"></i> {review.rating}
                    </span>
                </div>
                <p>{review.comment}</p>
                <small className="text-muted">{review.date}</small>
            </div>

            <button onClick={() => setViewEdit(!viewEdit)}>Edit Review</button>
            {viewEdit && <EditReview
                id={id}
                reviewData={review}
            />}

        </>

    )
}