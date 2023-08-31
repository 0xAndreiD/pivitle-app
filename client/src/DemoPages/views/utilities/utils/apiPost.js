import axios from "axios";
// import simpleAlertCall from "./alerts";
import config from "../Config";
const axiosAPI = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export function axiosPOSTCall(url, data, callback) {
  axiosAPI
    .post(url, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err?.response?.data);
        alert(err?.response?.data?.message);
        // simpleAlertCall(err?.response?.data?.message, () => {});
      } else {
        alert("Network error please check your internet connection.");
        callback(err);
      }
    });
}

export function axiosGETCall(url, callback) {
  axiosAPI
    .get(url, { headers: {} })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err);
    });
}

export function axiosGETCall1(url, params, callback) {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newUrl = `${url}?` + searchParams.toString();

  axiosAPI
    .get(newUrl)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      alert("Network error please try again later.");
      callback(err);
    });
}
