const { default: axios } = require("axios");
import { getItem, setItem, removeItem } from "../store/store.native";

module.exports = {
  getProducts,
  login,
  register,
  getProductsReview,
  getCategories,
  getProductsByCategory,
  login,
  register,
  getProductById,
  postOrder,
  getOrders,
  getProducteurOrders,
  getProducteurImages,
  getProductsByProducteur,
};

//const baseURL = "https://be23-212-106-119-45.eu.ngrok.io/";
//const baseURL = "http://172.24.232.115:1337/";
const baseURL = "http://51.210.104.99:1556/api/";

function refactorObject(obj) {
  let nObj = {};
  nObj.id = obj.id;
  Object.keys(obj.attributes).map((key) => {
    nObj[key] = obj.attributes[key];
  });
  return nObj;
}

async function getProducts(jwt) {
  let pro = await axios
    .get(baseURL + "products?populate=*", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      let productsArray = [];
      res.data.data.forEach((product) => {
        productsArray.push(refactorObject(product));
      });
      return productsArray;
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getProductsByProducteur() {
  let user = await getUser();
  let pro = await axios
    .get(
      baseURL + "products?populate=*&filters[producteur][id][$eq]=" + user.id,
      {
        headers: { Authorization: "Bearer " + user.jwt },
      }
    )
    .then((res) => {
      let productsArray = [];
      res.data.data.forEach((product) => {
        productsArray.push(refactorObject(product));
      });
      return productsArray;
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getProductById(id) {
  let user = await getUser();
  let pro = await axios
    .get(baseURL + "products/" + id + "/?populate=*", {
      headers: { Authorization: "Bearer " + user.jwt },
    })
    .then((res) => {
      return refactorObject(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getProductsByCategory(jwt, cat) {
  let pro = await axios
    .get(baseURL + "products?populate=*&filters[category][name][$eq]=" + cat, {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      //return res.data;
      let productsArray = [];
      res.data.data.forEach((product) => {
        productsArray.push(refactorObject(product));
      });
      return productsArray;
    })
    .catch((err) => {
      console.log(err);
    });
  return pro;
}

async function getCategories(jwt) {
  if (!jwt) return [];
  return await axios
    .get(baseURL + "categories?populate=*", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      if (res.data) {
        catArray = [];
        res.data.data.forEach((cat, index) => {
          catArray.push({ id: index + 1, name: cat.attributes.name });
        });
        return catArray;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getOrders(jwt, userID) {
  if (!jwt) return [];
  return await axios
    .get(
      baseURL +
        "commands?populate=*&filters[user][id][$eq]=" +
        userID +
        "&sort[createdAt]=DESC",
      {
        headers: { Authorization: "Bearer " + jwt },
      }
    )
    .then((res) => {
      if (res.data) {
        return res.data.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function postOrder(jwt, userID, price, articles, products) {
  let data = {
    user: userID,
    price: price,
    articles: articles,
    products: products,
    state: "waiting",
  };

  return await axios
    .post(
      baseURL + "commands",
      {
        data: data,
      },
      {
        headers: { Authorization: "Bearer " + jwt },
      }
    )
    .then(async (response) => {
      const orderID = response.data.data.id;

      for (let product of products) {
        product = JSON.parse(product);

        let payload = {
          producteur: product.producteur,
          quantity: product.quantity,
          orderID: orderID.toString(),
          price: product.price,
          product: product.product,
          client: userID,
        };

        await axios
          .post(
            baseURL + "producteur-orders",
            { data: payload },
            { headers: { Authorization: "Bearer " + jwt } }
          )
          .then((response) => {})
          .catch((err) => {
            console.log(err.response);
          });
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
}

async function getProductsReview(jwt, id) {
  let reviews = await axios
    .get(baseURL + "avis?populate=*&filters[product][id][$eq]=" + id, {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      let reviewArray = [];
      res.data.data.forEach((review) => {
        reviewArray.push(refactorObject(review));
      });
      return reviewArray;
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

async function login(mail, password) {
  return await axios
    .post(baseURL + "auth/local", {
      identifier: mail,
      password: password,
    })
    .then(async (response) => {
      /**
       * Auth OK
       */

      return await me(response.data.jwt);
    })
    .catch((error) => {
      console.log(error);
      return {
        error: error.response.data.error.message ?? "Identifiants incorrects",
      };
    });
}

async function register(username, mail, password) {
  return await axios
    .post(baseURL + "auth/local/register", {
      username: username,
      email: mail,
      password: password,
    })
    .then(async (response) => {
      /**
       * Register OK
       */
      return await me(response.data.jwt);
    })
    .catch((error) => {
      console.log(error);
      return {
        error:
          error?.response?.data?.error?.message ?? "Identifiants incorrects",
      };
    });
}

async function me(jwt) {
  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  return await axios
    .get(baseURL + "users/me?populate=*", config)
    .then((res) => {
      res.data.jwt = jwt;
      return res;
    })
    .catch((error) => {
      console.log(error);
      return {
        error: error.response.data.error.message ?? "Identifiants incorrects",
      };
    });
}

async function getUser() {
  return new Promise((resolve, reject) => {
    getItem("user").then((user) => {
      user = JSON.parse(user);
      resolve(user);
    });
  });
}

/**
 * Get all orders for a producer
 */
async function getProducteurOrders() {
  let user = await getUser();
  let orders = await axios
    .get(
      baseURL +
        "producteur-orders?populate=*&filters[producteur][id][$eq]=" +
        user.id,
      {
        headers: { Authorization: "Bearer " + user.jwt },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

  let resReturn = {};

  for (let order of orders) {
    if (!resReturn[order.attributes.orderID]) {
      resReturn[order.attributes.orderID] = [];
      let obj = {
        product: order.attributes.product,
        quantity: order.attributes.quantity,
        price: order.attributes.price,
      };
      resReturn[order.attributes.orderID].push(obj);
    } else {
      let obj = {
        product: order.attributes.product,
        quantity: order.attributes.quantity,
        price: order.attributes.price,
      };
      resReturn[order.attributes.orderID].push(obj);
    }
  }

  return resReturn;
}

async function getProducteurImages(producteurID) {
  let user = await getUser();
  return await axios
    .get(baseURL + "images?filters[producteur][id][$eq]=" + producteurID, {
      headers: { Authorization: "Bearer " + user.jwt },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
