import axios from "axios";
import { APP_ENVIRONMENT } from "../../../../environments/environment";

const BASE_URL = APP_ENVIRONMENT.base_url;

export const register = (newUser, isChecked) => {
  return axios
    .post(`${BASE_URL}/client`, {
      fullName: newUser.fullName,
      email: newUser.email,
      password: newUser.password,
      isChecked: isChecked,
      isEnabled: true,
      companyId: null,
    })
    .then(res => {
      console.log( "register is called, posteduser:", res);

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
      console.log("this is tokrdetailsen res:", res);
      localStorage.setItem("userdetails", JSON.stringify(res.data.userDetails));
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

export const isAuthenticated = () => {
  if (localStorage.getItem("userdetails")) {
    return true;
  } else {
    return false;
  }
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
