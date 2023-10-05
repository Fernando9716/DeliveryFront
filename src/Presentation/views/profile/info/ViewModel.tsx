import React, {useContext} from 'react'
import { ClearUserLocalUseCase } from '../../../../Domain/useCases/userLocal/ClearUserLocal';
import { UserContext } from '../../../../context/UserContext';

const ProfileInfoViewModel = () => {
    const { user, clearUserSession } = useContext(UserContext)

    console.log(user)
    
    return {
        clearUserSession,
        user
    }   
}

export default ProfileInfoViewModel;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwidXNlcklkIjoxNDYsImlhdCI6MTY5NjM3MDgyNCwiZXhwIjoxNjk2MzcwODQ0fQ.wEM6ZC4fS65QCnfRqPGA6LfpnKlEh1Xgry1enEatbuc
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZlcm5hbmRvIiwidXNlcklkIjoxNDYsImlhdCI6MTY5NjM3MDgyNCwiZXhwIjoxNjk2MzcwODQ0fQ.wEM6ZC4fS65QCnfRqPGA6LfpnKlEh1Xgry1enEatbuc