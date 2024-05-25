function WebHeader() {
  return (
    <header>
      <div className="container">
        <nav className="Menu">
          <a href="#" className="Logo">
            <img
              src="./src/Assest/Logo.png"
              alt="Mim Crypto Web"
              className="Logo__Img"
            />
          </a>
          <div className="Menu__Desktop">
            <ul className="DesktopMenuList">
              <li className="DesktopMenu__item">
                <a href="" className="menuitem__link">
                  Prices
                </a>
              </li>
              <li className="DesktopMenu__item">
                <a href="" className="menuitem__link">
                  Products
                </a>
              </li>
              <li className="DesktopMenu__item">
                <a href="" className="menuitem__link">
                  Company
                </a>
              </li>
              <li className="DesktopMenu__item">
                <a href="" className="menuitem__link">
                  Learn
                </a>
              </li>
            </ul>
          </div>
          <div className="Menu__Mobile">
            <ul className="MobileMenuList">
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link"></a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link"></a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link"></a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link"></a>
              </li>
            </ul>
            <div className="MobileMenu__Links">
              <a href="" className="MobileMenu__Link">
                Login
              </a>
              <a href="" className="MobileMenu__Link--Border">
                Sign Up
              </a>
            </div>
          </div>
          <div className="DesktopMenu__Links">
            <a href="" className="Menu__Link">
              Login
            </a>
            <a href="" className="Menu__Link--Border">
              Sign Up
            </a>
          </div>
          <select className="Language">
            <optgroup label="Language">
              <option>EN</option>
              <option>Farsi</option>
              <option>Germany</option>
            </optgroup>
          </select>
          <div className="Menu__MobileHamburger">
            <span className="hamgurgerLine"></span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default WebHeader;
