import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { RefreshTokenAuthUseCase } from "../../Domain/useCases/auth/RefreshTokenAuth";
import { User } from "../../Domain/entities/User";


const useRefreshToken = () => {
    try {
        const { user, saveUserSesion } = useContext(UserContext);

        const refresh = async () => {

            const response = await RefreshTokenAuthUseCase();
            const updateUser: User = {
                ...user,
                accessToken: response?.data?.accessToken
            }
            await saveUserSesion(updateUser);
            return response?.data?.accessToken;
        }
        return refresh;

    } catch (error) {
        console.log("ERROR: ",error);
        return error
    }


};
export default useRefreshToken;