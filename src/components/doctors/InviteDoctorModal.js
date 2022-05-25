import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";

const InviteDoctorToClinicModal = ({
  t,
  handleOk,
  isModalVisible,
  setIsModalVisible,
  handleInvite,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleCancel = () => {
    reset();
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        title={t("Please enter the email of doctor you want to invite")}
        visible={isModalVisible}
        onOk={handleSubmit(handleInvite)}
        onCancel={handleCancel}
        okText={t("Ok")}
        cancelText={t("Cancel")}
      >
        <label className="control-label mb-0">{t("Email")}</label>
        <form autoComplete="off">
          <input
            {...register("email", {
              required: t("Email required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("Invalid email address"),
              },
            })}
            type="email"
            className={
              errors.email ? "form-control invalid-input" : "form-control"
            }
          />
          {errors.email && (
            <span className="invalid-input-feedback">
              {errors.email.message}
            </span>
          )}
        </form>
      </Modal>
    </>
  );
};

export default InviteDoctorToClinicModal;
