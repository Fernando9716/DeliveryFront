import axios from "axios";
import { LocalStorage } from "../../local/LocalStorage";
import { User } from "../../../../Domain/entities/User";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

const baseURL = 'http://192.168.0.130:3002/api';


const ApiDelivery = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

ApiDelivery.interceptors.request.use(
    async(config)=>{
        const data = await LocalStorage().getItem('user');
        if(data){
            const user:User = JSON.parse(data as any);
            config.headers!['Authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config
    }
)

// Agrega un contador de intentos de refresco

ApiDelivery.interceptors.response.use(
    async (response) => {
        console.log("Entra interceptor 1 ");
        // Si la respuesta es exitosa, simplemente la devolvemos
        return response;
    },
    async (error) => {
        const data = await LocalStorage().getItem('user');
        const {save,clear} = LocalStorage();
        const user: User = JSON.parse(data as any);
        const originalRequest = error.config;
        console.log("Entra interceptor 2 ");
        // const {getUserSession} = useContext(UserContext);
        // console.log("contexto ",getUserSession);
        if (error.response && error.response.status === 403) {
                try {
                    // Intentar actualizar el token
                    console.log("token que se va a enviar refresco ",user?.refreshToken)
                    console.log("token que se va a enviar acceso ",user?.accessToken)
                    const newAccessToken = await ApiDelivery.put('/users/refresh', { refreshToken: user?.refreshToken });
                    const updateUser:User={
                        ...user,
                        accessToken:newAccessToken.data.data.accessToken
                    }
                    await save('user',JSON.stringify(updateUser));

                    if (newAccessToken) {
                        // Si se actualiza correctamente, vuelva a intentar la solicitud original
                        originalRequest.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                        return ApiDelivery(originalRequest);
                    } else {
                        console.log("cerrando sesion")
                        // Si no se actualiza correctamente, cierra la sesión y realiza otras acciones
                        await clear('user'); // Implementa logout() para cerrar la sesión
                        // Otras acciones que desees realizar en caso de error 403
                    }
                } catch (refreshError) {
                    console.log("cerrando sesion")
                    try {
                        await clear('user');    
                    } catch (error) {
                        console.log("error" ,error)
                    }
                    
                    // Maneja cualquier error que pueda ocurrir al actualizar el token
                    console.error('Error al actualizar el token:', refreshError);
                }
            
        }
        // Si no es un error 403, simplemente devuelve el error original
        return Promise.reject(error);
    }
);

const ApiDeliveryForImage = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json'
    },
    withCredentials: true
})




ApiDeliveryForImage.interceptors.request.use(
    async(config)=>{
        const data = await LocalStorage().getItem('user');
        if(data){
            const user:User = JSON.parse(data as any);
            config.headers!['Authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config
    }
)

ApiDeliveryForImage.interceptors.response.use(
    async (response) => {
        console.log("Entra interceptor 1 ");
        // Si la respuesta es exitosa, simplemente la devolvemos
        return response;
    },
    async (error) => {
        const data = await LocalStorage().getItem('user');
        const {save} = LocalStorage();
        const user: User = JSON.parse(data as any);
        const originalRequest = error.config;
        console.log("Entra interceptor 2 ");
        // const {getUserSession} = useContext(UserContext);
        // console.log("contexto ",getUserSession);
        if (error.response && error.response.status === 403) {
                try {
                    // Intentar actualizar el token
                    console.log("token que se va a enviar refresco ",user?.refreshToken)
                    console.log("token que se va a enviar acceso ",user?.accessToken)
                    const newAccessToken = await ApiDelivery.put('/users/refresh', { refreshToken: user?.refreshToken });
                    const updateUser:User={
                        ...user,
                        accessToken:newAccessToken.data.data.accessToken
                    }
                    await save('user',JSON.stringify(updateUser));

                    if (newAccessToken) {
                        // Si se actualiza correctamente, vuelva a intentar la solicitud original
                        originalRequest.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                        return ApiDelivery(originalRequest);
                    } else {
                        // Si no se actualiza correctamente, cierra la sesión y realiza otras acciones
                        //await logout(); // Implementa logout() para cerrar la sesión
                        // Otras acciones que desees realizar en caso de error 403
                    }
                } catch (refreshError) {
                    // Maneja cualquier error que pueda ocurrir al actualizar el token
                    console.error('Error al actualizar el token:', refreshError);
                }
            
        }
        // Si no es un error 403, simplemente devuelve el error original
        return Promise.reject(error);
    }
);





export {
    ApiDelivery,
    ApiDeliveryForImage,
    
}

