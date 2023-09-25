import { UserLocalRepository } from '../../Domain/respositories/UserLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
import { User } from '../../Domain/entities/User';

export class UserLocalRepositoryImp implements UserLocalRepository{
    async save(user:User): Promise<void>{
        const {save} = LocalStorage();
        await save('user',JSON.stringify(user));
    }

     async getUser(): Promise<User> {
        const {getItem} = LocalStorage();
        const data = await getItem('user');
        const user:User = JSON.parse(data as any);
        return user;
    }

    async clearUser(): Promise<void> {
        const {clear} = LocalStorage();
        await clear('user')
    }

}