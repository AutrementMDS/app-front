const { default: axios } = require("axios");
import { getItem, setItem, removeItem } from "../store/store.js";

//const baseURL = "https://be23-212-106-119-45.eu.ngrok.io/";
//const baseURL = "http://172.24.232.115:1337/";
const baseURL = "https://back.autrement.site/api/";

function refactorObject(obj) {
  let nObj = {};
  nObj.id = obj.id;
  Object.keys(obj.attributes).map((key) => {
    nObj[key] = obj.attributes[key];
  });
  return nObj;
}

/**
 * Get all products
 */
export async function getProducts(jwt) {
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

/**
 * Get products by string query
 */
export const getCustomQuery = async (jwt, query) => {
  let pro = await axios
    .get(baseURL + `products?populate=*&filters[name][$contains]=${query}`, {
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
};

/**
 * Get all products from a producteur
 */
export async function getProductsByProducteur(id) {
  let user = await getUser();
  let pro = await axios
    .get(
      baseURL + "products?populate=*&filters[producteur][id][$eq]=" + id ??
        user.id,
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

/**
 * Get a product by id
 */
export async function getProductById(id) {
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

/**
 * Get all products from a category
 */
export async function getProductsByCategory(jwt, cat) {
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

/**
 * Get all categories
 */
export async function getCategories(jwt) {
  if (!jwt) return [];
  return await axios
    .get(baseURL + "categories?populate=*", {
      headers: { Authorization: "Bearer " + jwt },
    })
    .then((res) => {
      if (res.data) {
        let catArray = [];
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

/**
 * Get orders for an user
 */
export async function getOrders(jwt, userID) {
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
    .catch(async (err) => {
      console.log(err);
    });
}

/**
 * New order
 */
export async function postOrder(jwt, userID, price, articles, products) {
  let date = new Date();
  let actualDay = date.getDate(); // - 1; // like 13 janvier
  let actualDayInWeek = date.getDay(); // - 1; // like 13 janvier

  if (actualDayInWeek <= 3) {
    let path = 5 - actualDayInWeek;
    date.setDate(actualDay + path);
  } else {
    let path = 5 - actualDayInWeek + 7;
    date.setDate(actualDay + path);
  }

  let data = {
    user: userID,
    price: price,
    articles: articles,
    products: products,
    state: "waiting",
    dateRetrait: date,
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
          dateRetrait: date,
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
            console.log(err.response?.data?.error?.message);
          });
      }
    })
    .catch((err) => {
      console.log(err.response?.data?.error?.message);
    });
}

/**
 * Get all reviews for a product
 */
export async function getProductsReview(jwt, id) {
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

/**
 * Login user
 */
export async function login(mail, password) {
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

/**
 * Register user
 */
export async function register(username, mail, password) {
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

/**
 * Get user informations
 */
export async function me(jwt) {
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

export async function getUser() {
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
export async function getProducteurOrders() {
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
        dateRetrait: order.attributes.dateRetrait,
      };
      resReturn[order.attributes.orderID].push(obj);
    } else {
      let obj = {
        product: order.attributes.product,
        quantity: order.attributes.quantity,
        price: order.attributes.price,
        dateRetrait: order.attributes.dateRetrait,
      };
      resReturn[order.attributes.orderID].push(obj);
    }
  }

  return resReturn;
}

/**
 * Get images from producteur to display on the producteur page
 */
export async function getProducteurImages(producteurID) {
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

/**
 * Update product by an productID
 */
export async function updateProduct(
  productID,
  name,
  price,
  stock,
  description
) {
  let user = await getUser();
  let data = {
    name: name,
    price: price,
    stock: stock,
    description: description,
  };

  return await axios
    .put(
      baseURL + "products/" + productID,
      {
        data: data,
      },
      {
        headers: { Authorization: "Bearer " + user.jwt },
      }
    )
    .then(async (response) => {
      //console.log(response);
    })
    .catch((err) => {
      console.log(err.response);
    });
}

// module.exports = {
//   getProducts,
//   login,
//   register,
//   getProductsReview,
//   getCategories,
//   getProductsByCategory,
//   login,
//   register,
//   getProductById,
//   postOrder,
//   getOrders,
//   getProducteurOrders,
//   getProducteurImages,
//   getProductsByProducteur,
//   updateProduct,
// };
