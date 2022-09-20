const { default: axios } = require("axios");

module.exports = {
  getUsers,
  login,
  register,
};

const baseURL = "https://bca5-212-106-119-45.eu.ngrok.io/";

async function getUsers() {
  await axios
    .get(baseURL + "/users")
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => console.log(error));
  return 0;
}

export async function login(mail, password, cb) {
  axios
    .post(baseURL + "auth/local", {
      identifier: mail,
      password: password,
    })
    .then((response) => {
      /**
       * Auth OK
       */

      me(response.data.jwt, cb);
    })
    .catch((error) => {
      /**
       * Auth not OK
       */
      //console.log(error);
      cb(error);
    });
}

export async function register(username, mail, password, cb) {
  axios
    .post(baseURL + "auth/local/register", {
      username: username,
      email: mail,
      password: password,
    })
    .then((response) => {
      /**
       * Register OK
       */
      me(response.data.jwt, cb);
    })
    .catch((error) => {
      /**
       * Email already used / password not enought strong
       */
      //LogsError(error);
      cb(error);
    });
}

export function me(jwt, cb) {
  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  axios
    .get(baseURL + "users/me", config)
    .then((res) => {
      res.data.jwt = jwt;
      cb(res);
    })
    .catch((error) => {
      //LogsError(error);
      cb(error);
    });
}
