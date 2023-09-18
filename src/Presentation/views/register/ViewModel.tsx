import React, {useState} from 'react'
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';

function RegisterViewwModel() {
    const [errorMessage, setErrorMessage] = useState('');
    const [values,setValues]=useState({
        name:'',
        lastname:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:''
      });
      const onChange = ( property:string, value:any)=>{
        setValues({...values, [property]:value});
      }
      const limpiarCampos = () => {
        setValues({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      };

      const register = async () => {
        if(isValidForm()){
          console.log("es valido? ")
          const apiResponse = await RegisterAuthUseCase(values);
          console.log("RESULT VIEWMODEL ",JSON.stringify(apiResponse));
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

        return true;

      }
  return {
    ...values,
    onChange,
    register,
    isValidForm,
    errorMessage
  }
   
  
}

export default RegisterViewwModel