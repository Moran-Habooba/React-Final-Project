import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const MyAccountPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData({
        ...currentUser,
        showOrdersToOthers: currentUser.showOrdersToOthers || false,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...formData,
        id: currentUser.id,
      },
    });

    setSuccessMessage("Your details have been successfully updated!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (!currentUser || !formData) {
    return (
      <div className="container mt-5">
        <h2>My Account</h2>
        <p>Loading user info...</p>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="showOrdersToOthers"
            checked={formData.showOrdersToOthers}
            onChange={handleChange}
            id="showOrdersCheckbox"
          />
          <label className="form-check-label" htmlFor="showOrdersCheckbox">
            Allow others to view my orders
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default MyAccountPage;
