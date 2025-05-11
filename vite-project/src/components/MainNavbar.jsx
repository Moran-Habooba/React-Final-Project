import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import CustomerNavbar from "./CustomerNavbar";

const MainNavbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (!currentUser) return null;

  return currentUser.role === "admin" ? <AdminNavbar /> : <CustomerNavbar />;
};

export default MainNavbar;
