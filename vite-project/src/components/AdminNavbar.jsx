import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <div className="text-end fw-bold me-3 mt-2">
        Hello {currentUser?.userName}
      </div>
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/admin/categories">
                Categories
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/admin/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/admin/statistics">
                Statistics
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/logout">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
