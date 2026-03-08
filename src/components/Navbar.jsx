import { BoxArrowLeft, BoxArrowInRight, GraphUpArrow } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-gradient navbar-dark shadow mb-4 py-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}> <img src="royal.png" width={55} alt="" /> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav px-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/Entries"}> <h5 className="px-4">الـمـدخـلات  <BoxArrowInRight/> </h5></Link>
                        </li>
                        <li className="nav-item">   
                            <Link className="nav-link" to={"/Exits"}> <h5 className="px-4">الـمـخـرجـات <BoxArrowLeft/> </h5></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/Stats"}> <h5 className="px-4">الإحـصـائـيـات  <GraphUpArrow/> </h5></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}    