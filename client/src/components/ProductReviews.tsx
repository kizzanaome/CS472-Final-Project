import type { ReviewType } from "../types/ProductInterface";
import { Review } from "./Review";

type ProductProp = {
    id: number,
    name: string,
    description: string,
    category: string[],
    price: number,
    dateAdded: Date,
    averageRating: number,
    reviews: ReviewType[]


}

type ReviewProps = {
    id: string | undefined;
    reviews: ReviewType[];
    product: ProductProp
};

export function Reviews({ product, reviews }: ReviewProps) {
    return (
        <div>
            {reviews && reviews.map((item, key) => {
                return (
                    <Review
                        key={key}
                        review={item}
                        productId={product.id}
                    />
                )
            }

            )
            }
        </div>
    )
}