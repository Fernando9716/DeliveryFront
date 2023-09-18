import React from 'react'
import { ClearUserLocalUseCase } from '../../../../Domain/useCases/userLocal/ClearUserLocal';

const ProfileInfoViewModel = () => {
    const clearSesion = async () =>{
        await ClearUserLocalUseCase();
    }
    
    return {
        clearSesion
    }   
}

export default ProfileInfoViewModel;