import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/user";

const { register } = new AuthRepositoryImpl()

export const RegisterAuthUseCase = async (user: User) => {
    return await register(user);
};