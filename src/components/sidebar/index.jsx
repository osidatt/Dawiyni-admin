import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { formatMoney } from "../../components/update/constants";
import { getWallet, updatePercentage } from "../../apis/adminV1";
import { useLocales } from "../../hooks/useLocales";
const SidebarNav = (props) => {
  const [wallet, setWallet] = React.useState(null);
  const { location } = props;
  let pathname = location.pathname;
  React.useEffect(() => {
    (async () => {
      const wallet = await getWallet();
      setWallet(wallet);
    })();
  }, []);
  const { t } = useLocales();
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <p className="alignAmountPara">
            {t("Total Amount :")}{" "}
            <span className="balanceDigits">
              {formatMoney(wallet?.credit)}
              <small>
                <b> UM</b>
              </small>
            </span>
            {"   "}{" "}
          </p>

          <ul>
            <div className="main ">
              <li className="menu-title">
                <span>{t("Main")}</span>
              </li>
            </div>

            <li className={pathname.includes("doctor-list") ? "active" : ""}>
              <Link to="/doctor-list">
                <i className="fe fe-user-plus" /> <span>{t("Doctors")}</span>
              </Link>
            </li>
            <li className={pathname.includes("patient-list") ? "active" : ""}>
              <Link to="/patient-list">
                <i className="fe fe-user" /> <span>{t("Patients")}</span>
              </Link>
            </li>
            <li className={pathname.includes("clinics-list") ? "active" : ""}>
              <Link to="/clinics-list">
                <i className="fe fe-user" /> <span>{t("Clinics")}</span>
              </Link>
            </li>
            <li className={pathname.includes("keyword-search") ? "active" : ""}>
              <Link to="/keyword-search">
                <i className="fa fa-search" />{" "}
                <span>{t("Keyword Search")}</span>
              </Link>
            </li>
            <li className={pathname.includes("invoices-list") ? "active" : ""}>
              <Link to="/invoices-list">
                <span>{t("Top Up Requests")}</span>
              </Link>
            </li>
            <li
              className={
                pathname.includes("withdrawl-requests") ? "active" : ""
              }
            >
              <Link to="/withdrawl-requests">
                <span>{t("Withdrawl Requests")}</span>
              </Link>
            </li>

            <li className={pathname.includes("settings") ? "active" : ""}>
              <Link to="/settings">
                <i class="fas fa-cog"></i> <span>{t("Settings")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SidebarNav);
