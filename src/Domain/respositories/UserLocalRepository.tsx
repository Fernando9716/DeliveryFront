import { User } from "../entities/User"

export interface UserLocalRepository{
    save(User: User): Promise<void>
    getUser():Promise<User>
    clearUser():Promise<void>
}