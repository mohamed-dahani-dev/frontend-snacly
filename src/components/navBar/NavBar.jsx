/* eslint-disable react/prop-types */
import "./NavBar.css";
import { useEffect, useState, useRef, useContext } from "react";
import LoginPopup from "../loginPopup/LoginPopup";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
const NavBar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme]);
  const [menu, setMenu] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    });
  }, []);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const moveUp = useRef();

  const { getTotalAmount, token, setToken, userName, setUserName } =
    useContext(StoreContext);
  const navigate = useNavigate();

  // log out

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserName("");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <div ref={moveUp} className="navbar" id="navbar">
        <button
          className="menu icon-menu"
          onClick={() => {
            setShowMenu(true);
          }}
        />
        <Link to="/">
          <h1 className="logo">Snackly</h1>
        </Link>

        <ul className="navbar-menu">
          <Link to="/">
            <li
              onClick={() => {
                setMenu("home");
              }}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <a href="#explore-menu">
            <li
              onClick={() => {
                setMenu("menu");
              }}
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </li>
          </a>
          <a href="#app-download">
            <li
              onClick={() => {
                setMenu("mobile-app");
              }}
              className={menu === "mobile-app" ? "active" : ""}
            >
              Mobile-app
            </li>
          </a>
          <a href="#footer">
            <li
              onClick={() => {
                setMenu("contact-us");
              }}
              className={menu === "contact-us" ? "active" : ""}
            >
              Contact us
            </li>
          </a>
        </ul>
        {showMenu && (
          <div className="pop-up">
            <div className="menu-list">
              <ul className="navbar-menu-list">
                <div className="btnCloseMenu">
                  <button
                    className="icon-close"
                    onClick={() => {
                      setShowMenu(false);
                    }}
                  />
                </div>
                <Link to="/">
                  <li
                    onClick={() => {
                      setMenu("home");
                      setShowMenu(false);
                    }}
                    className={menu === "home" ? "active" : ""}
                  >
                    Home
                  </li>
                </Link>
                <a href="#explore-menu">
                  <li
                    onClick={() => {
                      setMenu("menu");
                      setShowMenu(false);
                    }}
                    className={menu === "menu" ? "active" : ""}
                  >
                    Menu
                  </li>
                </a>
                <a href="#app-download">
                  <li
                    onClick={() => {
                      setMenu("mobile-app");
                      setShowMenu(false);
                    }}
                    className={menu === "mobile-app" ? "active" : ""}
                  >
                    Mobile-app
                  </li>
                </a>
                <a href="#footer">
                  <li
                    onClick={() => {
                      setMenu("contact-us");
                      setShowMenu(false);
                    }}
                    className={menu === "contact-us" ? "active" : ""}
                  >
                    Contact us
                  </li>
                </a>
              </ul>
            </div>
          </div>
        )}
        <div className="navbar-right">
          <div className="basket">
            <Link to="/cart">
              <span className="icon-shopping-basket"></span>
              <span className={getTotalAmount() === 0 ? "" : "dot"}></span>
            </Link>
          </div>
          {!token ? (
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="sign-in"
            >
              Sign in
            </button>
          ) : (
            <div className="navbar-profile">
              <h3>
                Welcome <span className="username">{userName}</span>
              </h3>
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <span className="icon-box" />
                  <p>Orders</p>
                </li>
                <div className="diveder" />
                <li onClick={logOut}>
                  <span className="icon-sign-out" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
          <button
            onClick={() => {
              // send value to ls
              localStorage.setItem(
                "currentMode",
                theme === "dark" ? "light" : "dark"
              );

              // get value from ls
              setTheme(localStorage.getItem("currentMode"));
            }}
            className="mode"
          >
            {theme === "dark" ? (
              <span className="icon-moon-o"></span>
            ) : (
              <span className="icon-sunny"></span>
            )}
          </button>
        </div>
      </div>
      <button
        style={{
          opacity: showScrollBtn ? 1 : 0,
        }}
        className="scroll2top icon-keyboard_arrow_up"
        onClick={() => {
          moveUp.current.scrollIntoView({
            block: "start",
          });
        }}
      ></button>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </>
  );
};

export default NavBar;
