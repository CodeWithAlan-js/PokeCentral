import "@styles/NavBar.css";
import HamburgerMenu from "./hamburgerMenu";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to={"/"}>
        <div className="logo">
          <img src="src/assets/Logo.svg" alt="" />
        </div>
      </Link>
      <HamburgerMenu />
    </nav>
  );
};

export default NavBar;
