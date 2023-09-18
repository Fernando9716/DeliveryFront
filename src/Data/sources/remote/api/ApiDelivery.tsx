import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: 'http://192.168.0.132:3002/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export {
    ApiDelivery
}