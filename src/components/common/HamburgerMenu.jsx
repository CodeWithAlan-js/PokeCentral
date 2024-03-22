import "@styles/HamburgerMenu.css";
import { Pivot as Hamburger } from "hamburger-react"; 
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const menuRef = useRef(null);

  const handleOpenMenu = () => {
    setOpen(true);
    document.body.classList.add("no-scroll");
  };

  const handleCloseMenu = () => {
    setAnimationClass("slideLeft");
    setTimeout(() => {
      setOpen(false);
      setAnimationClass("");
      document.body.classList.remove("no-scroll");
    }, 200);
  };


  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handler)
    document.body.classList.remove("no-scroll")

    return () => {
      document.removeEventListener('mousedown', handler)
      document.body.classList.remove("no-scroll")
    }
  }, [])

  return (
    <div className="hamburger-container">
        <div className="menu-icon-container">
        <Hamburger
            toggled={open}
            toggle={open ? handleCloseMenu : handleOpenMenu}
          />
        </div>
      {open ? (
        <div className="background-menu">
          <div className={`menu-container ${animationClass}`} ref={menuRef}>
            <div className="menu-option">
              <ul>
                <Link to={'/search'}>
                 <li>Find a pokemon</li>
                </Link>
                <Link to={'/berries'}>
                <li>Berries</li>
                </Link>
                <Link to={'/types'}>
                <li>Type Table</li>
                </Link>
                <Link to={'/battle'}>
                <li>Battle</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default HamburgerMenu;
