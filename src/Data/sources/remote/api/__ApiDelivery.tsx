import axios from "axios";
import { LocalStorage } from "../../local/LocalStorage";
import { UserContext } from "../../../../context/UserContext";
import React, { useState,useContext } from 'react'

function createAxiosInstance(baseURL: any, contentType: any) {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': contentType,
    },
  });

  instance.interceptors.request.use(async (config) => {
    const data = await LocalStorage().getItem('user');
    if (data) {
      const user = JSON.parse(data);
      config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
    }
    // if (x !== "") {
    //   console.log("configurando headers")
    //   config.headers['accept'] = x;
    //   console.log("headers",config.headers)
    // }
    console.log("headers", config.headers)
    return config;
  });
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwidXNlcklkIjoxNDYsImlhdCI6MTY5NjQ1NzQ4NiwiZXhwIjoxNjk2NDU3NDk2fQ.EdIPuV1Nc2XgpG6dmb0fMYGyAg4bubfcSKJV_brjPco
  //refresh eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwiaWF0IjoxNjk2NDU3MTUwLCJleHAiOjE2OTY0NjQzNTB9.XVUo2MPPlNqSwy1Rz3pXWfTNH9g4Csx8wiQsrfUd4pE
  instance.interceptors.response.use(
    async (response) => response,
    async (error) => {
      //const userC = useContext(UserContext)
      const data = await LocalStorage().getItem('user');
      const { save } = LocalStorage();
      const user = JSON.parse(data as any);
      const originalRequest = error.config;
      console.log("token de acceso ", user?.accessToken)
      if (error.response && error.response.status === 403) {
       
        try {

          const newAccessToken = await instance.put('/users/refresh', {
            refreshToken: user?.refreshToken,
          });
          const updateUser = {
            ...user,
            accessToken: newAccessToken.data.data.accessToken,
          };
          await save('user', JSON.stringify(updateUser));

          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${user?.accessToken}`;
            return instance(originalRequest);
          } else {
            // Maneja el error de actualización del token aquí
          }
        } catch (refreshError) {
          console.error('Error al actualizar el token:', refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

const ApiDelivery = createAxiosInstance('http://192.168.0.130:3002/api', 'application/json');
export { ApiDelivery };

const ApiDeliveryForImage = createAxiosInstance('http://192.168.0.130:3002/api', 'multipart/form-data');
ApiDeliveryForImage.defaults.headers['Content-Type'] = 'multipart/form-data';
export { ApiDeliveryForImage };