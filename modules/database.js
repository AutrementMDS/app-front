const { default: axios } = require("axios");

module.exports = {
  getUsers,
  getProducts,
  login,
  register,
  getProductsReview,
  getCategories,
  getProductsByCategory,
};

//const baseURL = "https://be23-212-106-119-45.eu.ngrok.io/";
const baseURL = "http://172.24.232.115:1337/";

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
  let pro = await axios
    .get(baseURL + "products", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getProductsByCategory(jwt, cat) {
  let pro = await axios
    .get(baseURL + "products?category.name=" + cat, {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getCategories(jwt) {
  return await axios
    .get(baseURL + "categories", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getProductsReview(jwt, id) {
  let reviews = await axios
    .get(baseURL + "avis?product._id=" + id, {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  if (reviews.length == 0) {
    return -1;
  }

  let count = 0;
  let sum = 0;

  for (let review of reviews) {
    count++;
    sum += review.note;
  }

  return sum / count;
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
