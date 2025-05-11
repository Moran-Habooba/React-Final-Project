import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }, [dispatch, navigate]);

  return null;
};

export default LogoutPage;
