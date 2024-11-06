import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Header:React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  return (
    <>
        {/* <nav className="navbar navbar-expand-lg w-100 bg-body-secondary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" >Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link active" >Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/verify" className="nav-link active" >Verify</Link>
                    </li>
                    
                </ul>
                </div>
            </div>
        </nav> */}
        <header className="p-3 text-bg-secondary">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="../Assets/title_logo" alt="EyeRefer" />
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          
          <li><Link to="/F" className="nav-link px-2 text-white">Features</Link></li>
          <li><Link to="/P" className="nav-link px-2 text-white">Pricing</Link></li>
          <li><Link to="/FA" className="nav-link px-2 text-white">FAQs</Link></li>
          <li><Link to="/AB" className="nav-link px-2 text-white">About</Link></li>
        </ul>

        <div className="text-end">
            {token && (<>
          <button type="button" onClick={()=>{
            localStorage.clear();
            navigate("/login");
          }} className="btn btn-outline-light me-2">Logout</button>
            </>)}
            {(!token) && (
                <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>

                {/* <button type="button" className="btn btn-outline-light me-2">Login</button> */}
                <Link to="/" className="btn btn-warning">Sign-up</Link>

                </>
            )}
        </div>
      </div>
    </div>
  </header>
        
        <br />
        <Outlet />
    </>
  )
}

export default Header