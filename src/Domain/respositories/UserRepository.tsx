 
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery"
import { User } from "../entities/User"
import * as ImagePicker from 'expo-image-picker';

export interface userRepository{
    update(user:User):Promise<ResponseApiDelivery>;
    updateWithImage(user:User, file:ImagePicker.ImageInfo):Promise<ResponseApiDelivery>;
}