import type { ReviewType } from "../types/ProductInterface";
type ReviewProp = {
    review: ReviewType;
};

export function Review({ review }: ReviewProp) {
    return (
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



    )
}