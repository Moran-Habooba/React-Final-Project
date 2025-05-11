import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch({
      type: "LOGIN",
      payload: formData,
    });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin/customers");
      } else {
        navigate("/my-orders");
      }
    }
  }, [currentUser, navigate]);

  return (
    <section className="vh-100">
      <h1>Next Generation E-Commerce</h1>
      <br />
      <br />
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form autoComplete="off">
              <div className="form-outline mb-4">
                <input
                  type="userName"
                  id="loginUserName"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  autoComplete="off"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <label className="form-label fw-bold" htmlFor="loginUserName">
                  User Name
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="form-label fw-bold" htmlFor="loginPassword">
                  Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={handleSubmit}
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  New User?
                  <Link className="link-danger m-1" to="/register">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {error && (
          <p className="text-danger fw-bold mt-2 text-center">{error}</p>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
