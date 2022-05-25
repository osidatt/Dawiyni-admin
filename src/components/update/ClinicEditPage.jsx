import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import {
  editClinicById,
  getAppointmentWithDocId,
  getClinicById,
  getDocByClinicId,
} from "../../apis/adminV1.js";
import SidebarNav from "../sidebar";
import "./clinicEditPage.css";
import { specializationsArr, stateAndCities } from "./constants";
import { IMG01 } from "./image";
import { useLocales } from "../../hooks/useLocales";

export default function ClinicEditPage() {
  const filename = (file) => {
    debugger;
    let name = file;
    let sanitize = name.replace("user/files/", "");
    return sanitize;
  };
  const { id } = useParams();
  const [appointmentData, setAppointmentData] = React.useState({
    data: [],
  });
  const { t } = useLocales();
  const showAppointment = async (id) => {
    try {
      const appointments = await getAppointmentWithDocId(id);
      setAppointmentData({ ...appointmentData, data: appointments });
    } catch (err) {
      setIsloading(false);
      setMsg(err.errMsg);
    }
  };
  const showProfile = () => {
    history.push(`/doctor/${id}`);
  };

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
  const [specializations, setSpecializations] = React.useState([]);
  const [doctorsWithClinics, setDoctorsWithClinics] = React.useState({
    data: [],
  });

  const [visible, setVisible] = React.useState(false);
  const history = useHistory();

  const fetchClinicById = async () => {
    try {
      const res = await getClinicById(id);
      debugger;
      setUser(res);
      debugger;
      const data = res?.ClinicSpecializations.map(
        (obj, index) => obj.specialization
      );
      setSpecializations([...data]);
    } catch (err) {
      setMsg(err.errMsg);
    }
  };
  //fetching doctors
  const fetchDoctorsByClinicId = async () => {
    const response = await getDocByClinicId(id);
    setDoctorsWithClinics({ ...doctorsWithClinics, data: response });
  };
  React.useEffect(() => {
    fetchClinicById();
    fetchDoctorsByClinicId();
  }, []);
  const selectHandler = (e) => {
    const isExist = specializations.includes(e.target.value);
    !isExist && setSpecializations([...specializations, e.target.value]);
  };
  const handleUpdateProfile = async (data) => {
    try {
      data = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v != null)
      );
      specializations.length && (data = { ...data, specializations });
      if (user.phoneNumber === data.phoneNumber) {
        data = _.omit(data, ["phoneNumber"]);
      }
      setIsloading(true);
      await editClinicById(id, data);
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
  const getToClinicsLists = () => {
    history.push(`/clinics-list`);
  };
  const selectDeleteHandler = (index) => {
    const temp = specializations;
    temp.splice(index, 1);
    setSpecializations([...temp]);
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
                onClick={getToClinicsLists}
                className="btn btn-primary mb-2"
              >
                <RollbackOutlined />
              </button>
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">{t("Clinic Details")}</h3>
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
                                  <label>{t("Name")}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={user?.name}
                                    {...register("name", {
                                      pattern: {
                                        value: /^[a-zA-Z ]*$/,
                                        message:
                                          "name can only contain alphabets",
                                      },
                                    })}
                                  />
                                  {errors.name && (
                                    <span className="invalid-input-feedback">
                                      {errors.name.message}
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
                              <div className="col-12 col-md-12">
                                <div className="form-group">
                                  <label>{t("Specialization")}</label>
                                  <select
                                    className="form-control"
                                    onChange={selectHandler}
                                    defaultValue=""
                                  >
                                    <option value={""} disabled></option>
                                    {specializationsArr?.map((name, index) => (
                                      <option key={index} value={name}>
                                        {t(name)}
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
                                    {specializations.length
                                      ? specializations?.map((name, index) => (
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
                                    {user?.authorizationFile && (
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "10px",
                                          flexWrap: "wrap",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <a
                                          href={`https://dawiyni.com/api/${user?.authorizationFile}`}
                                          target={"_blank"}
                                        >
                                          {filename(user?.authorizationFile)}
                                        </a>
                                      </div>
                                    )}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="submit-section profileSettingBtn">
                          <button
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
        <div className="tableButom">
          <div className="table-responsive tableSetting">
            <table className="table table-hover table-center mb-0 ml-2">
              <thead>
                <tr>
                  <th>{t("Avatar")}</th>
                  <th>{t("Doctors")}</th>
                  <th>{t("Phone Number")}</th>
                  <th>
                    {" "}
                    <i className="fa fa-map-marker" aria-hidden="true">
                      {" "}
                    </i>
                    {t("City")}
                  </th>
                  <th>{t("Member Since")}</th>
                  <th>{t("Is Approved")}</th>
                  <th>{t("Delete")}</th>
                  <th>{t("Appointments")}</th>
                </tr>
              </thead>

              {doctorsWithClinics?.data?.length > 0 &&
                doctorsWithClinics?.data?.map((obj, index) => (
                  <tr key={index}>
                    <td onClick={() => showProfile(obj?.id)}>
                      <Link className="profileImage"></Link>
                    </td>
                    <td>
                      <p>
                        <Link className="dataStyle">{`${obj?.firstName} ${obj?.lastName}`}</Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <Link className="dataStyle">{`${obj?.phoneNumber}`}</Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <Link className="dataStyle">{`${obj?.city}`}</Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <Link className="dataStyle">
                          {moment(obj?.createdAt).format("l")}
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <Switch defaultChecked={obj?.isApproved} disabled />
                      </p>
                    </td>
                    <td>
                      <p>
                        <Link className="dataStyle">
                          {" "}
                          {!obj?.isDeleted && <DeleteOutlined />}
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <span>
                          <u>
                            <Link
                              className="Appointments"
                              onClick={() => {
                                setVisible(true);
                                showAppointment(obj?.id);
                              }}
                            >
                              {t("View Appointment")}
                            </Link>
                          </u>
                        </span>
                      </p>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
        <Modal
          title="Appointments"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <div className="paperIcon">
            {appointmentData?.data?.length < 1 ? (
              <></>
            ) : (
              <img
                className="paperIconPic"
                src="./../../../public/images/2545517-200.png"
                alt=""
              />
            )}
          </div>
          <table className="PopUptable">
            {appointmentData?.data?.length < 1 ? (
              <h3>{t("No Appointments 😞 ")}</h3>
            ) : (
              <thead>
                <tr>
                  <th>{t("Start Time")}</th>
                  <th>{t("End Time")}</th>
                  <th>{t("Status")}</th>
                  <th>{t("Doctor Name")}</th>
                  <th>{t("Patient Name")}</th>
                </tr>
              </thead>
            )}
            {appointmentData?.data?.length > 0 &&
              appointmentData?.data?.map((obj, index) => (
                <tr key={index}>
                  <td>{moment(obj?.startTime).format("l")}</td>
                  <td>{moment(obj?.endTime).format("l")}</td>
                  <td>{obj?.status}</td>
                  <td>{`${obj?.userDoctor.firstName} ${obj?.userDoctor.lastName}`}</td>
                  <td>{`${obj?.userPatient.firstName} ${obj?.userPatient.lastName}`}</td>
                </tr>
              ))}
          </table>
        </Modal>
      </div>
    </>
  );
}
