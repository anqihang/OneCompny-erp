import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { url } from '@/utils/url'

// create an axios instance
const service = axios.create({
  //-----------------------------------------------------------------------------------------------
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: "http://192.168.1.122:8080", // url = base url + request url
  // baseURL: "http://tongyu.api.ltokay.cn",
  // baseURL: "http://ltql.api.ltokay.cn",
  // baseURL: "http://ds.api.ltokay.cn",
  baseURL: "http://hwd.api.ltokay.cn",

  // baseURL: 'http://127.0.0.1:4523/m1/1930977-0-default', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout

});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //------------
      // console.log(1,getToken());
      // config.headers['X-Token'] ='bearer '+ getToken()
      config.headers['Authorization'] = 'bearer ' + getToken()

    }
    // if(localStorage.getItem('ax-token')){
    //   config.headers['Authorization'] ='bearer '+ getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    console.log(1, response.data);
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    if (res.code !== 200) {
      Message({
        //---------------
        message: res.msg || "not200Error",
        type: "error",
        duration: 5 * 1000,
      });

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code == 101) {
        // to re-login
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
        // MessageBox.confirm(
        //   // "You have been logged out, you can cancel to stay on this page, or log in again",
        //   // "Confirm logout",
        //   "登录失效",
        //   {
        //     confirmButtonText: "Re-Login",
        //     type: "warning",
        //   }
        // ).then(() => {

        // });
      }
      // console.log(7);
      // return res;
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // localStorage.removeItem('ax-token');
      // localStorage.removeItem('name');
      // localStorage.removeItem('id')
      // this.$router.push(`/login`)

      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      //---------------------
      if (res.msg != "Success") {
        Message({
          //---------------
          message: res.msg || "Success",
          type: "success",
          duration: 5 * 1000,
        });
      }
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
