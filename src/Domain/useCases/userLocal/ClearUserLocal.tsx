import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const {clearUser} = new UserLocalRepositoryImp();

export const ClearUserLocalUseCase = async ()=>{
    return await clearUser();
}

