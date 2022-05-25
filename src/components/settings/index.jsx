import React, { useState, useEffect } from "react";
import { updatePercentage, getPercentage } from "../../apis/adminV1";
import SidebarNav from "../sidebar";
import { useLocales } from "../../hooks/useLocales";
function Settings() {
  const { t } = useLocales();
  let getPercentageforAdmin = async () => {
    let percent = await getPercentage();
    setPercentage(percent?.data?.percentage);
  };
  let getVal = (e) => {
    setPercentage(e.target.value);
  };
  let submit = async () => {
    await updatePercentage({ percentage: percentage });
  };
  const [percentage, setPercentage] = useState("");
  useEffect(() => {
    getPercentageforAdmin();
  }, []);
  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">{t("General Settings")}</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/admin">{t("Dashboard")}</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#0">{t("Settings")}</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {t("General Settings")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">{t("General")}</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group">
                      <label>
                        {t("Commission Percentage")}{" "}
                        <i class="fas fa-percentage percIcon "></i>
                      </label>
                      <div className="positionR">
                        <input
                          type="number"
                          className="form-control percentInput"
                          defaultValue={percentage}
                          onChange={(e) => {
                            getVal(e);
                          }}
                        />
                      </div>
                    </div>
                    <button className="submitBtn" onClick={submit()}>
                      {t("submit")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Settings;
