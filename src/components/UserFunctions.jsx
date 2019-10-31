import axios from "axios";

export const register = newUser => {
  return axios
    .post("http://localhost:9000/client", {
      fullName: newUser.fullName,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const login = user => {
  return axios
    .post("http://localhost:9000/auth", {
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
    .get(`http://localhost:9000/auth/verify_email?token=${token}`)
    .then(res => {
      console.log("Res ",res)
      return res.data;
    })
    .catch(err => {
      return err
    });
};
