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

                        <button className="btn" onClick={() => setViewEdit(!viewEdit)}><i className="bi bi-pencil-fill ms-4"></i></button>
                        <i className="bi bi-trash-fill ms-2 text-danger"></i>
                    </span>
                </div>
                <p>{review.comment}</p>
                <small className="text-muted">{review.date}</small>
            </div>

            {/* <button onClick={() => setViewEdit(!viewEdit)}>Edit Review</button> */}
            {viewEdit &&
                <EditReview
                    id={id}
                    reviewData={review}
                    setViewEdit={() => setViewEdit(!viewEdit)}
                />
            }

        </>

    )
}