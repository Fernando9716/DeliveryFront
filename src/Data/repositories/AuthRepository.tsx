import { AuthRepository } from '../../Domain/respositories/AuthRepository';
import { User } from '../../Domain/entities/User';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';
import {AxiosError} from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime';
export class AuthRepositoryImpl implements AuthRepository{

     async register(user: User): Promise<ResponseApiDelivery> {
        try {

            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create',user)
            console.log("RESPONSE REPOSITORY",JSON.stringify(response.data));
            return Promise.resolve(response.data)
            
        } catch (error) {

            let e = (error as AxiosError);
            
            console.log('ERROR AuthRepositoryImpl : ',e)
            const apiError :ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
    async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
           
            let data = new FormData();

           // data.append("image",blob,file.uri.split('/').pop())
           data.append('image',{
            uri:file.uri,
            type:mime.getType(file.uri), 
            name: file.uri.split('/').pop()
            }as any)
            //console.log("esto se va a subir con imagen ", data.get("image"))
            data.append('user',JSON.stringify(user));

            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/users/registerWithImage',data)
            console.log("RESPONSE REPOSITORY",JSON.stringify(response.data));
            return Promise.resolve(response.data)
            
        } catch (error) {

            let e = (error as AxiosError);
            
            console.log('ERROR AuthRepositoryImpl : ',JSON.stringify(e.response?.data))
            const apiError :ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {

            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/login',{email,password})
            
            console.log("RESPONSE REPOSITORY",JSON.stringify(response.data));
            return Promise.resolve(response.data)
            
        } catch (error) {

            let e = (error as AxiosError);
            
            console.log('ERROR AuthRepositoryImpl : ',JSON.stringify(e.response?.data))
            const apiError :ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }


}