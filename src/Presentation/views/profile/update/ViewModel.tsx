import React, { useState,useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SaveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import { UpdateWithImageUserUseCase } from '../../../../Domain/useCases/user/UpdateUserWithImageUser';
import { User } from '../../../../Domain/entities/User';
import { ResponseApiDelivery } from '../../../../Data/sources/remote/models/ResponseApiDelivery';
import { UserContext } from '../../../../context/UserContext';
import { LocalStorage } from '../../../../Data/sources/local/LocalStorage';

function ProfileUpdateViewModel(user: User) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  //imagepickerasset
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(user);
  const {getUserSession} = useUserLocal();
  const { saveUserSesion } = useContext(UserContext)
  
  const onChange = (property: string, value: any) => {

    setValues({ ...values, [property]: value });
  }
  // const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {

  //   setValues({ ...values, name, lastname, phone });
  // }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      console.log("result ", result)
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  }
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      console.log("result ", result)
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  }

  const update = async () => {
    if (isValidForm()) {
      setLoading(true);
      let response = {} as ResponseApiDelivery;
      if (values.image?.includes('https://')) {
        try {
          response = await UpdateUserUseCase(values);
        } catch (error) {
          console.log("ERROR: ",error)
        }
        
      }
      else {
        response = await UpdateWithImageUserUseCase(values, file!)
      }
      setLoading(false);
      console.log("RESULT VIEWMODEL ", JSON.stringify(response));
      if (response.success) {
        console.log("RESPONSE DATA UPDATE",response.data )
        const data = await LocalStorage().getItem('user');
        const user: User = JSON.parse(data as any);
        const nuevo: User = {
          ...response.data,
          accessToken: user.accessToken
        }
        saveUserSesion(nuevo);
        setSuccessMessage("El registro se actualizó correctamente")
      } else {
        setErrorMessage(response.message);
      }

    }
  }

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Ingresa tu nombre ")
      return false
    }
    if (values.lastname === "") {
      setErrorMessage("Ingresa tus apellidos ")
      return false
    }
    if (values.phone === "") {
      setErrorMessage("Ingresa tu telefono ")
      return false
    }
    return true;

  }
  return {
    ...values,
    onChange,
    update,
    isValidForm,
    errorMessage,
    pickImage,
    takePhoto,
    user,
    loading,
    successMessage
    //onChangeInfoUpdate
  }


}

export default ProfileUpdateViewModel