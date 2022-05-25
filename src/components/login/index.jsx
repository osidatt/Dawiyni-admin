import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.jpg";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../Context/UserContext";
import { signIn } from "../../apis/adminV1";
import NotifyBanner from "../NotifyBanner";
const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setToken } = useUserContext();
  const [errMsg, setErrMsg] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const showHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSignIn = async (data) => {
    try {
      console.log(data);
      setIsloading(true);
      let res = await signIn(data);
      setIsloading(false);
      window.localStorage.setItem("token", res?.token);
      setToken(res?.token);
      props.history.push(`/doctor-list`);
    } catch (error) {
      setIsloading(false);
      setErrMsg(error.errMsg);
    }
  };
  return (
    <div>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={Logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="form-group">
                      <input
                        type="email"
                        className={
                          errors.email
                            ? "form-control invalid-input"
                            : "form-control"
                        }
                        placeholder="Email"
                        {...register("email", {
                          required: "Email required",
                        })}
                      />
                      {errors.email && (
                        <span className="invalid-input-feedback">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="input-group" id="show_hide_password">
                        <input
                          className={
                            errors.password
                              ? "form-control invalid-input"
                              : "form-control"
                          }
                          type={isShowPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Password required",
                          })}
                          placeholder="Password"
                        />
                        <div
                          className="input-group-addon passwordFieldEyeIcon"
                          onClick={showHidePassword}
                        >
                          <a>
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </div>
                      {errors.password && (
                        <span className="invalid-input-feedback">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        {isloading && (
                          <div
                            className="spinner-border spinnerTest"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        )}
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="text-center forgotpass">
                    <Link to="/forgotPassword">Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NotifyBanner message={errMsg} setMsg={setErrMsg} />
        </div>
      </div>
    </div>
  );
};

export default Login;
