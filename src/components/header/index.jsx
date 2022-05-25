import React from "react";
import { NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../assets/images/avatar-01.jpg";
import logoicon from "../../assets/images/logo-small.png";
import logo from "../../assets/images/logo.jpg";
import { languages } from "../../components/update/constants";
import i18n from "../../helpers/i18n";
import { useLocales } from "../../hooks/useLocales";

const Header = (props) => {
  const [value, setValue] = React.useState("en");

  React.useEffect(() => {
    const language = window.navigator.language;
    if (languages.en.includes(language)) {
      setValue("en");
    } else if (languages.ar.includes(language)) setValue("ar");
    else if (languages.fr.includes(language)) setValue("fr");

    if (props.location.pathname.split("/")[1] === "admin") {
      require("../../assets/plugins/bootstrap-rtl/css/bootstrap.min.css");
      require("../..//assets/css/feathericon.min.css");
      // require("../../assets/js/app.js");
      // require("../../assets/js/jquery-3.2.1.min.js");
      // require("../../assets/js/jquery.slimscroll.min.js");
      require("../../assets/plugins/fontawesome/css/fontawesome.min.css");
      require("../../assets/plugins/fontawesome/css/all.min.css");
      require("../../assets/css/font-awesome.min.css");
      require("../../assets/css/style.css");
    }
  }, []);
  const logout = () => {
    window.localStorage.removeItem("token");
    props.history.push("/");
    window.location.reload();
  };
  const changeLocale = (l) => {
    if (i18n.language !== l) {
      i18n.changeLanguage(l);
    }
  };
  const { t } = useLocales();

  const exclusionArray = [
    "/admin/login",
    "/admin/register",
    "/admin/forgotPassword",
    "/admin/lockscreen",
    "/admin/404",
    "/admin/500",
  ];
  if (exclusionArray.indexOf(props.location.pathname) >= 0) {
    return "";
  }
  return (
    <div className="header">
      <div className="header-left">
        <a href="" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <a href="" className="logo logo-small">
          <img src={logoicon} alt="Logo" width="30" height="30" />
        </a>
      </div>

      <a href="#0" className="mobile_btn" id="mobile_btn">
        <i className="fa fa-bars" />
      </a>

      <ul className="nav user-menu" style={{ alignItems: "center" }}>
        <div>
          <NavDropdown
            defaultValue={value}
            title={t("language")}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#" onClick={() => changeLocale("en")}>
              English
            </NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={() => changeLocale("ar")}>
              العربية
            </NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={() => changeLocale("fr")}>
              français
            </NavDropdown.Item>
          </NavDropdown>
        </div>
        <li className="nav-item dropdown has-arrow">
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={avatar}
                  width="31"
                  alt="Ryan Taylor"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>{t("Logout")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Header;
