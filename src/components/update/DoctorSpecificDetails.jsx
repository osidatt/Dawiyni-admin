import React from "react";

export default function DoctorSpecificDetails() {
  return (
    <div>
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
    </div>
  );
}
