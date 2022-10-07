const { default: axios } = require("axios");

module.exports = {
  getUsers,
  getProducts,
  login,
  register,
};

const baseURL = "https://172.24.232.75:1337";

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

async function getProducts(jwt) {
  return await axios
    .get(baseURL + "products", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function login(mail, password, cb) {
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

async function register(username, mail, password, cb) {
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
