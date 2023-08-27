import axios from "axios";
// import {useRouter} from 'next/navigation'
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // our API base URL
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config, "config");

    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["Accept"] = "application/json";
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401
      // && originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      window.location.replace("/login");
      return Promise.reject(error);
    }

    //   if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true
    //     const refreshToken = localStorageService.getRefreshToken()
    //     return axios
    //       .post('/auth/token', {
    //         refresh_token: refreshToken
    //       })
    //       .then(res => {
    //         if (res.status === 201) {
    //           localStorageService.setToken(res.data)
    //           axios.defaults.headers.common['Authorization'] =
    //             'Bearer ' + localStorageService.getAccessToken()
    //           return axios(originalRequest)
    //         }
    //       })
    //   }
    return Promise.reject(error);
  }
);
