import { RollbackOutlined } from "@ant-design/icons";
import _ from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import {
  clinics,
  getDoctorById,
  updateDoctorById,
} from "../../apis/adminV1.js";
import { useLocales } from "../../hooks/useLocales";
import SidebarNav from "../sidebar";
import { specializationsArr, stateAndCities } from "./constants";
import { IMG01 } from "./image";

export default function DoctorEditPage() {
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
  const [specializations, setSpecializations] = React.useState([]);
  const [doctorClinics, setDoctorClinics] = React.useState([]);
  const [clinicsList, setClinicsList] = React.useState([]);
  const [isloading, setIsloading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const fetchDoctorById = async () => {
    try {
      const res = await getDoctorById(id);
      setUser(res);
      const data = res?.UserDoctor?.UserDoctorSpecializations.map(
        (obj, index) => obj.specialization
      );
      setSpecializations([...data]);
      setDoctorClinics([...res?.Clinics]);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  const selectHandler = (e) => {
    const isExist = specializations.includes(e.target.value);
    !isExist && setSpecializations([...specializations, e.target.value]);
  };
  const filename = (file) => {
    let name = file;
    let sanitize = name.replace("user/files/", "");
    return sanitize;
  };
  const selectDeleteHandler = (index) => {
    const temp = specializations;
    temp.splice(index, 1);
    setSpecializations([...temp]);
  };
  const doctorClinicSelectHandler = (e) => {
    const index = e.target.selectedIndex - 1;
    const isExist = doctorClinics.some(
      (item) => item.id === clinicsList[index].id
    );
    !isExist && setDoctorClinics([...doctorClinics, clinicsList[index]]);
  };
  const doctorClinicSelectDelHandler = (index) => {
    const temp = doctorClinics;
    temp.splice(index, 1);
    setDoctorClinics([...temp]);
  };
  const fetchClinicsList = async () => {
    try {
      const res = await clinics();
      setClinicsList(res.data);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  React.useEffect(() => {
    fetchDoctorById();
    fetchClinicsList();
  }, []);

  const handleUpdateProfile = async (data) => {
    try {
      if (user.phoneNumber === data.phoneNumber) {
        data = _.omit(data, ["phoneNumber"]);
      }
      let doctorClinicsData = [];
      for (let i = 0; i < doctorClinics.length; i++) {
        doctorClinicsData.push(doctorClinics[i].id);
      }
      if (user?.type === "doctor") {
        specializations.length && (data = { ...data, specializations });
        doctorClinicsData.length &&
          (data = { ...data, doctorClinics: doctorClinicsData });
      }

      setIsloading(true);
      await updateDoctorById(id, data);
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
  const getToDoctorsLists = () => {
    history.push(`/doctor-list`);
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
                onClick={getToDoctorsLists}
                className="btn btn-primary mb-2"
              >
                <RollbackOutlined />
              </button>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">{t("Doctor Details")}</h3>
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
                          {user?.type === "doctor" && (
                            <div className="card">
                              <div className="card-body">
                                <div className="row form-row">
                                  <div className="col-12 col-md-12">
                                    <div className="form-group">
                                      <div className="change-avatar">
                                        <h4>{t("Professional Details")}</h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label>{t("Experience")}</label>
                                      <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        defaultValue={
                                          user?.UserDoctor?.experience
                                        }
                                        {...register("experience")}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label>{t("Degree")}</label>
                                      <select
                                        className={
                                          errors.qualification
                                            ? "form-control invalid-input"
                                            : "form-control"
                                        }
                                        {...register("qualification")}
                                      >
                                        <option
                                          disabled
                                          value={
                                            user?.UserDoctor?.qualification
                                          }
                                        >
                                          {user?.UserDoctor?.qualification}
                                        </option>
                                        <option value="MBBS">MBBS</option>
                                        <option value="DBMS">DBMS</option>
                                        <option value="DO">DO</option>
                                        <option value="DPM">DPM</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-12">
                                    <div className="form-group">
                                      <label>{t("Address")}</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={user?.address}
                                        {...register("address")}
                                      />
                                      {errors.address && (
                                        <span className="invalid-input-feedback">
                                          {errors.address.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-12">
                                    <div className="form-group">
                                      <label>{t("Description")}</label>
                                      <textarea
                                        className={
                                          errors.description
                                            ? "form-control invalid-input"
                                            : "form-control"
                                        }
                                        defaultValue={user?.description}
                                        {...register("description")}
                                        rows="3"
                                      ></textarea>
                                      {errors.description && (
                                        <span className="invalid-input-feedback">
                                          {errors.description.message}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-12">
                                    <div className="form-group">
                                      <label>{t("Specialization")}</label>
                                      <select
                                        className="form-control"
                                        onChange={selectHandler}
                                        defaultValue=""
                                      >
                                        <option value="" disabled></option>
                                        {specializationsArr?.map(
                                          (name, index) => (
                                            <option key={index} value={name}>
                                              {t(name)}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "10px",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {specializations.length
                                          ? specializations?.map(
                                              (name, index) => (
                                                <div
                                                  key={index}
                                                  className="specializationListContainer"
                                                >
                                                  {t(name)}
                                                  <span
                                                    value={name}
                                                    className="specializationListItem"
                                                    onClick={() =>
                                                      selectDeleteHandler(index)
                                                    }
                                                  >
                                                    &times;
                                                  </span>
                                                </div>
                                              )
                                            )
                                          : null}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-12">
                                    <div className="form-group">
                                      <label>{t("Associated Clinics")}</label>
                                      <select
                                        className="form-control"
                                        onChange={doctorClinicSelectHandler}
                                        defaultValue=""
                                      >
                                        <option value="" disabled></option>
                                        {clinicsList?.map((obj, index) => (
                                          <option
                                            id={index}
                                            key={index}
                                            value={obj.id}
                                          >
                                            {obj.name}
                                          </option>
                                        ))}
                                      </select>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "10px",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {doctorClinics.length
                                          ? doctorClinics.map((obj, index) => (
                                              <div
                                                key={index}
                                                style={{
                                                  cursor: "pointer",
                                                  border: "2px solid #dcdcdc",
                                                  width: "fit-content",
                                                  padding: " 0px 10px",
                                                  marginTop: "10px",
                                                  borderRadius: "25px",
                                                }}
                                              >
                                                {obj.name}
                                                <span
                                                  value={obj.name}
                                                  style={{
                                                    fontSize: "25px",
                                                    fontWeight: "700",
                                                    verticalAlign: "middle",
                                                    marginLeft: "10px",
                                                  }}
                                                  onClick={() =>
                                                    doctorClinicSelectDelHandler(
                                                      index
                                                    )
                                                  }
                                                >
                                                  &times;
                                                </span>
                                              </div>
                                            ))
                                          : null}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-12">
                                    <span className="form-group">
                                      <span>
                                        <label>
                                          {t("Authorization File")}{" "}
                                          <span>
                                            <i class="fas fa-file"></i>
                                          </span>
                                        </label>
                                      </span>
                                      <span>
                                        {user?.UserDoctor
                                          ?.authorizationFile && (
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                              flexWrap: "wrap",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <a
                                              href={`https://dawiyni.com/api/${user?.UserDoctor?.authorizationFile}`}
                                              target={"_blank"}
                                            >
                                              {filename(
                                                user?.UserDoctor
                                                  ?.authorizationFile
                                              )}
                                            </a>
                                          </div>
                                        )}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="submit-section profileSettingBtn">
                          <button
                            id="aye"
                            type="submit"
                            disabled={isDirty ? false : false}
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
