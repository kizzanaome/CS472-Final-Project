import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import type { ReviewType } from "../types/ProductInterface";

interface ReviewProps {
    id: string
    reviewData: ReviewType;
    setViewEdit: React.MouseEventHandler
}
export function EditReview({ reviewData, id, setViewEdit }: ReviewProps) {
    const { fetchProducts } = useProductContext();


    const [formData, setFormData] = useState({
        authorName: reviewData.author,
        rating: reviewData.rating,
        comment: reviewData.comment,
    });



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/products/${id}/reviews/${reviewData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData}),
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const data = await response.json();
            console.log('Review submitted:', data);
            alert('Review submitted successfully!');
            setFormData({ authorName: '', rating: '5', comment: '' });
            fetchProducts()

        } catch (err) {
            console.error('Error:', err);
            alert('Error submitting review.');

        }
    };



    return (
        <div>
            <div className="mt-5 mb-4 p-4 rounded border border-warning">
                <h4>Edit a Review</h4>
                <form onSubmit={handleEdit}>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Name: </label>
                        <input type="text" className="form-control" id="author" placeholder="Enter your name" name="authorName"
                            value={formData.authorName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reviewRating" className="form-label">Rating</label>
                        <select
                            className="form-select" id="reviewRating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                        >
                            <option value="5"><i className="bi bi-star-fill"></i> 5.0</option>
                            <option value="4"><i className="bi bi-star-fill"></i> 4.0</option>
                            <option value="3"><i className="bi bi-star-fill"></i> 3.0</option>
                            <option value="2"><i className="bi bi-star-fill"></i> 2.0</option>
                            <option value="1"><i className="bi bi-star-fill"></i> 1.0</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="reviewComment" className="form-label">Review</label>
                        <textarea className="form-control" id="reviewComment" rows={4}
                            value={formData.comment}
                            name="comment"
                            placeholder="Write your experience..."
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-primary btn-sm">Submit Updated Review</button>
                    <button onClick={setViewEdit} className="btn btn-outline-dark ms-2 btn-sm">close</button>

                </form>
            </div>
        </div>
    )
}