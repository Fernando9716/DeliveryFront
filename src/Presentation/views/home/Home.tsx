import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles'

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{};

export const HomeScreen = ({navigation,route}:Props) => {

    const { email, password, onChange,login,errorMessage,user } = useViewModel();

    useEffect(()=>{
        if(errorMessage !==''){
            ToastAndroid.show(errorMessage,ToastAndroid.LONG)
        }       
    },[errorMessage])

    useEffect(()=>{
        if(user?.id !== null && user?.id !== undefined){
            if(user.roles?.length! > 1){
                console.log("if roles ")
                navigation.replace('RolesScreen');
            }else {
                 navigation.replace('ClientTabsNavigator');
                }
        }

    }, [user])

    return (
        //ETIQUETA VIEW ES PADRE
        //ETIQUETA IMAGE ES HIJO POR ESO NO SE CIERRA
        //Columna
        <View style={styles.container}>
            <Image style={styles.imageBackGround} source={require("../../../../assets/chef.jpg")} />
            <View style={styles.logoContainer}>
                <Image style={styles.logoImage} source={require("../../../../assets/logo.png")} />
                <Text style={styles.logoText}>FOOD APP</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}> INGRESAR</Text>
                <CustomTextInput
                    image={require("../../../../assets/email.png")}
                    placeholder='Correo electronico'
                    keyboardType='email-address'
                    property='email'
                    onChangeText={onChange}
                    value={email}
                />
                <CustomTextInput
                    image={require("../../../../assets/password.png")}
                    placeholder='Contraseña'
                    keyboardType='default'
                    property='password'
                    onChangeText={onChange}
                    value={password}
                    secureTextEntry={true}
                />
                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='ENTRAR' onPress={() => login()} />
                </View>
                <View style={styles.formRegister}>
                    <Text>No tienes cuenta?</Text>
                    <TouchableOpacity>
                        <Text style={styles.fromRegisterTex} onPress={() => navigation.navigate("RegisterScreen")}>Registrate</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>

    );
}


