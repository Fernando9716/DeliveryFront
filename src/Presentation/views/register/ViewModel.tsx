import React, {useState,useContext} from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import * as ImagePicker from 'expo-image-picker'
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../../context/UserContext';

function RegisterViewModel() {
    const [errorMessage, setErrorMessage] = useState('');
    //imagepickerasset
    const { saveUserSesion } = useContext(UserContext)
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const {user, getUserSession } = useUserLocal()
    const [loading, setLoading] = useState(false)
    const [values,setValues]=useState({
        name:'',
        lastname:'',
        email:'',
        image:'',
        phone:'',
        password:'',
        confirmPassword:''
      });

      const onChange = ( property:string, value:any)=>{
        
        setValues({...values, [property]:value});
      }

      //en la ultima version del paquete hay que usar este plugin para pedir permiso a la galeria
      /**
       *     "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "custom photos permission",
          "cameraPermission": "Allow $(PRODUCT_NAME) to open the camera",

          "//": "Disables the microphone permission",
          "microphonePermission": false
        }
      ]
    ],
    canceled y llamar a result.assets[0].uri y a setFile(result.assets[0])
       */
      const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing:true,
          quality:1
        })
        if(!result.canceled){
          console.log("result ", result)
          onChange('image',result.assets[0].uri);
          setFile(result.assets[0]);
        }
      }
      const takePhoto = async () =>{
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing:true,
          quality:1
        })
        if(!result.canceled){
          console.log("result ", result)
          onChange('image',result.assets[0].uri);
          setFile(result.assets[0]);
        }
      }

      const register = async () => {
        if(isValidForm()){
          setLoading(true);
          console.log("es valido? ")
          //const apiResponse = await RegisterAuthUseCase(values);
          const response = await RegisterWithImageAuthUseCase(values,file!);
          setLoading(false);
          console.log("RESULT VIEWMODEL REGISTRO",JSON.stringify(response));
          if(response.success){
            await saveUserSesion(response.data);
            // await SaveUserLocalUseCase(response.data);
            // getUserSession();
          }else{
            setErrorMessage(response.message);
          }
          
        }
      }

      const isValidForm = () : boolean =>{
        if (values.name === ""){
          setErrorMessage("Ingresa tu nombre ")
          return false
        }
        if (values.lastname === ""){
          setErrorMessage("Ingresa tus apellidos ")
          return false
        }
        if (values.phone === ""){
          setErrorMessage("Ingresa tu telefono ")
          return false
        }
        if (values.email === ""){
          setErrorMessage("Ingresa tu correo electronico ")
          return false
        }
        if (values.password === ""){
          setErrorMessage("Ingresa una contrasñea ")
          return false
        }
        if (values.confirmPassword === ""){
          setErrorMessage("Confirma tu contraseña ")
          return false
        }
        if (values.password !== values.confirmPassword){
          setErrorMessage("Tus contraseñas no coinciden  ")
          return false
        }
        if (values.image ===""){
          setErrorMessage("Selecciona una imagen  ")
          return false
        }
        return true;

      }
  return {
    ...values,
    onChange,
    register,
    isValidForm,
    errorMessage,
    pickImage,
    takePhoto,
    user,
    getUserSession,
    loading
  }
   
  
}

export default RegisterViewModel