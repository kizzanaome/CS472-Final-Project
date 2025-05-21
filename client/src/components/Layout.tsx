import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <div className='header'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> Products</Link>
                        </li>
                        <li>
                            <Link to="/reviews">Reviews</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Outlet />
        </>
    )
}