import { User } from '../../../../Respaldo front/AppDeliveryReactNative/src/Domain/entities/user';
export interface UserLocalRepository{
    save(User: User): Promise<void>
    getUser():Promise<User>
    clearUser():Promise<void>
}