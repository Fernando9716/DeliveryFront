import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../../Domain/entities/User";
import { userRepository } from "../../Domain/respositories/UserRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import { ApiDelivery}  from "../sources/remote/api/ApiDelivery";
import mime from 'mime';
import { ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';

export class UserRepositoryImpl implements userRepository {
    
    async update(user: User): Promise<ResponseApiDelivery> {

        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/actualizarWhithoutImage',user);
            return Promise.resolve(response.data)
            
        } catch (error) {
            let e = (error as AxiosError);

            console.log('ERROR AuthRepositoryImpl : ',JSON.stringify(e.response?.data))
            const apiError :ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }       
    }
    async updateWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            let data = new FormData();
           data.append('image',{
            uri:file.uri,
            type:mime.getType(file.uri), 
            name: file.uri.split('/').pop()
            }as any)
            data.append('user',JSON.stringify(user));
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/users/actualizar',data)
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