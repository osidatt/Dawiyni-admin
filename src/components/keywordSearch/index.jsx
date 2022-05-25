import React, { useState, useEffect } from "react";
import "./index.css";
import SidebarNav from "../sidebar";
import { addKeywords, getKeywords } from "./../../apis/adminV1";
import NotifyBanner from "./../NotifyBanner";
import { Link } from "react-router-dom";
import { useLocales } from "../../hooks/useLocales";
const KeywordSearch = (props) => {
  let addMoreObj = {
    keyword: null,
    specialization: null,
  };
  const [isloading, setIsloading] = useState(false);
  const [msg, setMsg] = useState("");
  const { t } = useLocales();
  const [state, setState] = useState({
    data: [],
  });
  const handleDelete = (index) => {
    const { data } = state;
    data.splice(index, 1);
    setState({ ...state, data: data });
  };
  const handleChange = async (index, key, value, option) => {
    const { data } = state;
    if (key == "keyword") {
      data[index].keyword = value;
    }
    if (key == "specialization") {
      data[index].specialization = value;
    }
    setState({ ...state, data: data });
  };
  useEffect(() => {
    fetchKeywords();
  }, []);
  const fetchKeywords = async () => {
    try {
      const res = await getKeywords();
      res.forEach((trim) => {
        delete trim.id;
        delete trim.createdAt;
        delete trim.updatedAt;
      });
      setState({ ...state, data: res });
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  const formatData = () => {
    let keywordObj = [];
    state.data.forEach((obj) => {
      keywordObj.push(obj);
    });
    return keywordObj;
  };
  const handelSave = async () => {
    try {
      const keywordData = formatData();
      setIsloading(true);
      const res = await addKeywords(keywordData);
      setMsg(t("Keywords are updated successfully"));
      setIsloading(false);
      fetchKeywords();
    } catch {}
  };
  const specializationsArr = [
    "Dermatologie",
    "Gastro-entérologie",
    "Gériatrie",
    " Hématologie Clinique",
    "Maladies Infectieuses",
    "Médecine Interne",
    "Médecine Préventive",
    "Médecine Légale et du Travail",
    "Néphrologie",
    "Ophtalmologie",
    "Neurologie",
    "Pédiatrie",
    "Pneumologie",
    "Psychiatrie",
    "Radiothérapie",
    "Rhumatologie",
  ];
  return (
    <>
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">{t("Keyword Search")}</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">{t("Dashboard")}</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#0">{t("Users")}</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {t("Keyword Search")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <table className="table table-hover table-center mb-0">
            <thead>
              <tr>
                <th>{t("Keyword")}</th>
                <th>{t("Select Specialty")}</th>
                <th>{t("Delete")}</th>
              </tr>
            </thead>
            <tbody>
              {/* <RenderRow /> */}
              <>
                {state.data.length > 0 &&
                  state.data?.map((obj, index) => (
                    <tr key={obj.id}>
                      <td>
                        <input
                          className="inputKey"
                          type="text"
                          value={obj?.keyword}
                          onChange={({ target: { value } }) => {
                            handleChange(index, "keyword", value);
                          }}
                        />
                      </td>
                      <td>
                        <select
                          className="form-control"
                          value={obj?.specialization}
                          onChange={({ target: { value } }) => {
                            handleChange(index, "specialization", value);
                          }}
                        >
                          <option>{t("Select Specialization")}</option>
                          {specializationsArr?.map((name, index) => (
                            <option key={index} value={name}>
                              {t(name)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash deletebtn"
                          onClick={() => handleDelete(index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </>
            </tbody>
          </table>
        </div>
        <div className="alignBtn">
          <div className="submit-section profileSettingBtnaddmore">
            <button
              type="button"
              className="btn btn-primary submit-btn"
              onClick={() =>
                setState({
                  ...state,
                  data: [...state.data, addMoreObj],
                })
              }
            >
              {t("Add Keyword")}
            </button>
          </div>

          <div className="submit-section profileSettingBtn">
            {isloading ? (
              <button
                type="button"
                className="btn btn-primary submit-btn"
                onClick={handelSave}
                disabled
              >
                {isloading && (
                  <div className="loading-spinner" role="status">
                    <span className="sr-only">{t("Loading...")}</span>
                  </div>
                )}
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {t("loading...")}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary submit-btn"
                onClick={handelSave}
              >
                {t("Save Changes")}
              </button>
            )}
          </div>
        </div>
      </div>
      <NotifyBanner message={msg} setMsg={setMsg} />
    </>
  );
};

export default KeywordSearch;
