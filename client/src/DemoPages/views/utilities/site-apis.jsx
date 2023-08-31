import Config from "./Config";
import axios from "axios";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmtzbGF0ZXN0QGdtYWlsLmNvbSIsImlkIjoiNjRiZmJkZTIyZmNiZmU1N2RjZWY1MjYzIiwic3Vic2NyaWJlZCI6ZmFsc2UsInN1YnNjcmlwdGlvbnMiOlt7InRpdGxlIjoiU21hbGwgUGFja2FnZSIsInF1YW50aXR5IjoxLCJwcmljZSI6MjUwMDAsInRlYW1zIjoxMCwicGVvcGxlIjoxMDAsIl9pZCI6IjY0ZDNlZjA5NGU5ZjU0MTg4ZjQ1ZGM4ZSJ9XSwicm9sZXMiOlsiU3lzdGVtIEFkbWluaXN0cmF0b3IiXSwiaWF0IjoxNjkyMzczODgyLCJleHAiOjE3MjM5MDk4ODJ9.OI3fxWVEZzULHmxvmvNUmaYhL-UZp8E3RkzO2ziBtGg";

const axiosAPI = axios.create({
  baseURL: Config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export function apiPostCall(path, params) {
  let headers = {};
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newUrl = `${path}?` + searchParams.toString();
  return axiosAPI
    .post(
      newUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${testToken}`,
          // Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
}

export function apiPostCall1(path, params) {
  let headers = {};
  return axiosAPI
    .post(path, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
}

export function apiPutCall(path, params) {
  let headers = {};
  return axiosAPI
    .put(path, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
}

export function apiGETCall1(path, params) {
  let headers = {};
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newUrl = `${path}?` + searchParams.toString();
  return axiosAPI
    .get(newUrl, {
      headers: {
        Authorization: `Bearer ${testToken}`,
        // Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
}

export function apiDeleteCall(path, params) {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newUrl = `${path}?` + searchParams.toString();
  return axiosAPI
    .delete(newUrl, {
      headers: {
        Authorization: `Bearer ${testToken}`,
        // Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      data: {},
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
}

export function apiGetCall(path, params) {
  let headers = {};
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]));
  let newUrl = `${path}?` + searchParams.toString();
  // for (const key of Object.keys(params)) {
  //   if (params[key]) {
  //     newUrl += `${key}=${params[key]}`
  //   }
  // }
  return axiosAPI
    .get(newUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data) {
        return error.response;
      } else if (error.request.data) {
        return error.request;
      } else {
        alert("Network error, Please try again later.");
        return error.message;
      }
    });
}
