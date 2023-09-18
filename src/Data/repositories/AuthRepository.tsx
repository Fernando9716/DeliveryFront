import { AuthRepository } from '../../Domain/respositories/AuthRepository';
import { User } from '../../Domain/entities/user';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';
import {AxiosError} from 'axios';

export class AuthRepositoryImpl implements AuthRepository{

     async register(user: User): Promise<ResponseApiDelivery> {
        try {

            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create',user)
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