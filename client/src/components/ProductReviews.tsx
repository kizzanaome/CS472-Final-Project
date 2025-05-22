import type { ReviewType } from "../types/ProductInterface";
import { Review } from "./Review";

type ReviewProps = {
    reviews: ReviewType[];
};

export function Reviews({ reviews }: ReviewProps) {
    return (
        <div>
            {reviews && reviews.map((item, key) => {
                return (
                    <Review
                        key={key}
                        review={item}
                    />
                )
            }

            )
            }
        </div>
    )
}