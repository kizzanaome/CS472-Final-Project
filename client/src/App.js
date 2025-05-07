import './App.css';
import iphone from './assets/images/iphone.webp'

function App() {
  return (
    <div className="">
      <div>
        <img src={iphone} alt="product" width="250px"/>
        <h3>Iphone pink</h3>
        <p>Best iphone ever</p>
        <p>Category</p>
        <p>Price</p>
        <p>Date Added</p>
        <p>Average rating</p>
        <button>Review</button>
      </div>

      <div>
        <img src={iphone} alt="product" width="250px" />
        <h3>Iphone pink</h3>
        <p>Best iphone ever</p>
        <p>Category</p>
        <p>Price</p>
        <p>Date Added</p>
        <p>Average rating</p>
        <button>Review</button>

      </div>
      <div>
        <img src={iphone} alt="product" width="250px" />
        <h3>Iphone pink</h3>
        <p>Best iphone ever</p>
        <p>Category</p>
        <p>Price</p>
        <p>Date Added</p>
        <p>Average rating</p>
        <button>Review</button>
      </div>
    </div>
  );
}

export default App;
