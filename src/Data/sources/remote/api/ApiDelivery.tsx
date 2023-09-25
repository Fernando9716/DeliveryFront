import axios from "axios";

const baseURL = 'http://192.168.0.114:3002/api';

const ApiDelivery = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const ApiDeliveryForImage = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json'
    }
})

export {
    ApiDelivery,
    ApiDeliveryForImage
}