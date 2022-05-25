import React from "react";
import { useForm } from "react-hook-form";

export default function UserSettingsForm({
  handleUpdateProfile,
  modelType,
  user,
  setActiveIndex,
  stateAndCities,
  activeIndex,
  doctorClinicSelectDelHandler,
  isloading,
  clinicsList,
  selectHandler,
  doctorClinics,
  doctorClinicSelectHandler,
  specializationsArr,
  specializations,
  selectDeleteHandler,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="card">
          <div className="card-body">
            <div className="row form-row">
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <div className="change-avatar">
                    {modelType === "clinic" ? (
                      <h4>Clinic Details</h4>
                    ) : (
                      <h4>Personal Details</h4>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user?.firstName}
                    {...register("firstName", {
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "First name can only contain alphabets",
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
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user?.lastName}
                    {...register("lastName", {
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Last name can only contain alphabets",
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
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={user?.email}
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                  <label>Phone Number</label>
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
                  <label className="control-label mb-0">Wilaya</label>
                  <select
                    className="form-control"
                    {...register("state")}
                    onChange={(e) => {
                      setActiveIndex(e.target.selectedIndex - 1);
                    }}
                    defaultValue=""
                  >
                    {" "}
                    <option value={user?.state} disabled>
                      {user?.state}
                    </option>
                    {stateAndCities?.map((obj, index) => (
                      <option key={index} value={obj.state} id={index}>
                        {obj.state}
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
                  <label className="control-label mb-0">City</label>
                  <select
                    className="form-control"
                    {...register("city")}
                    defaultValue=""
                  >
                    <option value={user.city} disabled>
                      {user.city}
                    </option>
                    {stateAndCities[activeIndex]?.cities.map((name, index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <span className="invalid-input-feedback">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Date of Birth</label>

                          <input
                            type="date"
                            max={new Date().toJSON().slice(0, 10)}
                            className="form-control datetimepicker"
                            defaultValue={user?.dob}
                            {...register("dob")}
                          />
                        </div>
                      </div> */}
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
                      <h4>Other Details</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Experience</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      defaultValue={user?.UserDoctor?.experience}
                      {...register("experience")}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Degree</label>
                    <select
                      className={
                        errors.qualification
                          ? "form-control invalid-input"
                          : "form-control"
                      }
                      {...register("qualification")}
                    >
                      <option disabled value={user?.UserDoctor?.qualification}>
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
                    <label>Address</label>
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
                    <label>Description</label>
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
                    <label>Specialization</label>
                    <select
                      className="form-control"
                      onChange={selectHandler}
                      defaultValue=""
                    >
                      <option value="" disabled></option>
                      {specializationsArr?.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
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
                              {name}
                              <span
                                value={name}
                                className="specializationListItem"
                                onClick={() => selectDeleteHandler(index)}
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
                  <div className="form-group">
                    <label> Associated Clinics</label>
                    <select
                      className="form-control"
                      onChange={doctorClinicSelectHandler}
                      defaultValue=""
                    >
                      <option value="" disabled></option>
                      {clinicsList?.map((obj, index) => (
                        <option id={index} key={index} value={obj.id}>
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
                                  doctorClinicSelectDelHandler(index)
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
              </div>
            </div>
          </div>
        )}

        <div className="submit-section profileSettingBtn">
          <button
            type="submit"
            disabled={isDirty ? false : false}
            className="btn btn-primary submit-btn"
          >
            {isloading && (
              <div className="spinner-border spinnerTest" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
