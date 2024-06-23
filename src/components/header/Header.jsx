import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from ".."; //../index
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex  px-3 ">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className=" ml-auto hidden md:flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* //responsive */}

          <button className="md:hidden text-2xl ml-auto" onClick={toggleMenu}>
            &#9776; {/* Menu Icon */}
          </button>
          {menuOpen && (
            <nav
              className={`absolute top-12 z-30 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden transition-transform duration-300 ease-in-out ${
                menuOpen
                  ? "opacity-100 transform translate-y-0 "
                  : "opacity-0 transform -translate-y-full"
              }`}
            >
              {navItems.map((item) =>
                item.active ? (
                  <ul key={item.name}>
                    <li key={item.name} className="decoration-transparent">
                      <button
                        className="inline-block px-6 py-2 duration-200 text-xl hover:bg-blue-100 rounded-full "
                        onClick={() =>{
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        
                      >
                        {item.name}
                      </button>
                    </li>
                  </ul>
                ) : null
              )}
              {authStatus && (
                <ul>
                  <li className="text-xl" >
                    <LogoutBtn />
                  </li>
                </ul>
              )}
            </nav>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
