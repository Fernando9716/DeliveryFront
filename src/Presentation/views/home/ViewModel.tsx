import React, { useState, useEffect, useContext } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../../context/UserContext';

const HomeViewwModel = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  //const {user,getUserSession} = useUserLocal();
  const {user, saveUserSesion} = useContext(UserContext);
  console.log( "USUARIO DE SESION :" ,JSON.stringify(user));


  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  }
  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password)
      console.log('RESPONSE: ', JSON.stringify(response));
      if(!response.success){
        setErrorMessage(response.error);
      }else{
        await saveUserSesion(response.data);
      }
    }
  }

  const isValidForm = (): boolean => {
    if (values.email === '') {
      setErrorMessage('Ingresa el correo electronico');
      return false;
    }
    if (values.password === '') {
      setErrorMessage('Ingresa la contraseña');
      return false;
    }
    return true;
  }
  return {
    ...values,
    user,
    onChange,
    login,
    errorMessage
  }
}

export default HomeViewwModel;
