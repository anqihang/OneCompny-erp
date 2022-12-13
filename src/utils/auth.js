// import Cookies from "js-cookie";

// const TokenKey = "vue_admin_template_token";
const TokenKey = 'token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

export function getToken() {
  return localStorage.getItem(TokenKey);
}
export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}
export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
