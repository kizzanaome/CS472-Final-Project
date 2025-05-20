import iphone from '../assets/images/iphone.webp'

export function Product(){
    return(
        <div>
            <div>
                <img src={iphone} alt="product" className='product-img' />
                <h3>Iphone pink</h3>
                <p>Best iphone ever</p>
                <p>Category</p>
                <p>Price</p>
                <p>Date Added</p>
                <p>Average rating</p>
                <button className='btn btn-primary'>Review</button>
            </div>
        </div>
    )
}

