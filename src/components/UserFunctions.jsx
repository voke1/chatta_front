import axios from "axios";
import { APP_ENVIRONMENT } from "../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;

export const register = newUser => {
  return axios
    .post(`http://localhost:9000/client`, {
      fullName: newUser.fullName,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

export const login = user => {
  return axios
    .post(`${BASE_URL}/auth`, {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data.token);
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const verifyEmail = token => {
  return axios
    .get(`${BASE_URL}/auth/verify_email?token=${token}`)
    .then(res => {
      console.log("Res ", res);
      return res.data;
    })
    .catch(err => {
      return err;
    });
};
