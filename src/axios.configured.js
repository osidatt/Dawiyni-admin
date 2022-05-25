import axios from "axios";
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
console.log("env", process.env);
export const setAuthHeader = (token) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
setAuthHeader(window.localStorage.getItem("token"));
const onSuccess = function (response) {
  console.debug("Request Successful!", response);
  return response.data;
};
const onError = function (error) {
  console.error("Request Failed:", error.config);
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);
    if (
      error.response.data.status === 401 &&
      error.response.data.message === "invalid signature"
    ) {
      console.log("redirect to login");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("activeStep");
      window.location.reload();
    }
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error("Error Message:", error.message);
  }
  return Promise.reject({
    errMsg: !error?.response
      ? "Network Issue!"
      : error?.response?.data?.message ||
        error?.response?.data?.errors[0].param +
          " " +
          error?.response?.data?.errors[0].msg,
    status: error?.response?.status || "not status",
  });
};
client.interceptors.response.use(onSuccess, onError);
client.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "Bearer " + window.localStorage.getItem("token");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default client;
