import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4">
                <Link className="navbar-brand fw-bold text-warning" to="/">Products</Link>
                <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav gap-4">
                        <li className="nav-item"><Link className="nav-link" to="/">Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="#">Reviews</Link></li>
                    </ul>
                </div>
                <div className="d-flex align-items-center gap-3">
                    {/* <i className="bi bi-search"></i> */}
                </div>
            </nav>

            <Outlet />
        </>
    )
}