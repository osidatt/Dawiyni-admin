import { RollbackOutlined } from "@ant-design/icons";
import _ from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { getPatientById, updatePatientById } from "../../apis/adminV1.js";
import SidebarNav from "../sidebar";
import { stateAndCities } from "./constants";
import { IMG01 } from "./image";
import { useLocales } from "../../hooks/useLocales.js";
export default function PatientEditPage() {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useLocales();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const [user, setUser] = React.useState({});
  const [msg, setMsg] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isloading, setIsloading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchPatientById = async () => {
    try {
      const res = await getPatientById(id);
      setUser(res);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  React.useEffect(() => {
    fetchPatientById();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      data = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );
      if (user.phoneNumber === data.phoneNumber) {
        data = _.omit(data, ["phoneNumber"]);
      }
      setIsloading(true);
      await updatePatientById(id, data);
      setIsloading(false);
      setMsg(t("updated successfully"));
      // refetch();
      if (data.phoneNumber) {
        setIsModalVisible(true);
      }
    } catch (error) {
      setIsloading(false);
      setMsg(error.errMsg);
    }
  };
  const getToPatientsLists = () => {
    history.push(`/patient-list`);
  };
  const profileImageSrc = user?.profileImage
    ? `https://www.dawiyni.com/api/${user?.profileImage}`
    : IMG01;
  return (
    <>
      <SidebarNav />
      <div className="main-wrapper">
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <button
                type="button"
                onClick={getToPatientsLists}
                className="btn btn-primary mb-2"
              >
                <RollbackOutlined />
              </button>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">{t("Patient Details")}</h3>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                {/* Blog Details*/}
                <div className="blog-view">
                  <div className="card new-comment clearfix">
                    <div className="card-header">
                      <h4 className="card-title">{t("Edit")}</h4>
                    </div>
                    <div className="card-body">
                      <div className="profile-info-widget">
                        <Link to="#" className="booking-doc-img">
                          <img
                            className="profileImgUser"
                            src={profileImageSrc}
                            alt="User"
                          />
                        </Link>
                      </div>
                      <form onSubmit={handleSubmit(handleUpdateProfile)}>
                        <div className="card">
                          <div className="card-body">
                            <div className="row form-row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>{t("First Name")}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user?.firstName}
                                    {...register("firstName", {
                                      pattern: {
                                        value: /^[a-zA-Z ]*$/,
                                        message:
                                          "First name can only contain alphabets",
                                      },
                                    })}
                                  />
                                  {errors.firstName && (
                                    <span className="invalid-input-feedback">
                                      {errors.firstName.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>{t("Last Name")}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user?.lastName}
                                    {...register("lastName", {
                                      pattern: {
                                        value: /^[a-zA-Z ]*$/,
                                        message:
                                          "Last name can only contain alphabets",
                                      },
                                    })}
                                  />
                                  {errors.lastName && (
                                    <span className="invalid-input-feedback">
                                      {errors.lastName.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>{t("Email")}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user?.email}
                                    {...register("email", {
                                      pattern: {
                                        value:
                                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                      },
                                    })}
                                  />
                                  {errors.email && (
                                    <span className="invalid-input-feedback">
                                      {errors.email.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label>{t("Phone Number")}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user?.phoneNumber}
                                    {...register("phoneNumber", {
                                      pattern: {
                                        value: /^[0-9]{8}$/,
                                        message: "Invalid phone number",
                                      },
                                    })}
                                  />
                                  {errors.phoneNumber && (
                                    <span className="invalid-input-feedback">
                                      {errors.phoneNumber.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="control-label mb-0">
                                    {t("Wilaya")}
                                  </label>
                                  <select
                                    className="form-control"
                                    {...register("state")}
                                    onChange={(e) => {
                                      setActiveIndex(
                                        e.target.selectedIndex - 1
                                      );
                                    }}
                                    defaultValue=""
                                  >
                                    {" "}
                                    <option value={user?.state} disabled>
                                      {t(user?.state)}
                                    </option>
                                    {stateAndCities?.map((obj, index) => (
                                      <option
                                        key={index}
                                        value={obj.state}
                                        id={index}
                                      >
                                        {t(obj.state)}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.state && (
                                    <span className="invalid-input-feedback">
                                      {errors.state.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label className="control-label mb-0">
                                    {t("City")}
                                  </label>
                                  <select
                                    className="form-control"
                                    {...register("city")}
                                    defaultValue=""
                                  >
                                    <option value={user.city} disabled>
                                      {t(user.city)}
                                    </option>
                                    {stateAndCities[activeIndex]?.cities.map(
                                      (name, index) => (
                                        <option key={index} value={name}>
                                          {t(name)}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {errors.city && (
                                    <span className="invalid-input-feedback">
                                      {errors.city.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="submit-section profileSettingBtn">
                          <button
                            type="submit"
                            disabled={isDirty ? false : true}
                            className="btn btn-primary submit-btn"
                          >
                            {isloading && (
                              <div
                                className="spinner-border spinnerTest"
                                role="status"
                              >
                                <span className="sr-only">
                                  {t("Loading...")}
                                </span>
                              </div>
                            )}
                            {t("Save Changes")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Blog Details*/}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
}
