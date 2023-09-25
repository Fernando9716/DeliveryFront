import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View, Image, TextInput, Button, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { CustomTextInput } from '../../components/CustomTextInput';
import useViewModel from './ViewModel';
import styles from './Styles';
import { ModalPickImage } from '../../components/ModalPickImage';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { MyColors } from '../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'> { };

export const RegisterScreen = ({ navigation, route }: Props) => {
    const { name, lastname, email, image, phone, password, confirmPassword, onChange, register,loading, errorMessage, pickImage, takePhoto, user } = useViewModel();
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }

    }, [errorMessage])

    useEffect(() => {
        if (user?.id !== null && user?.id !== undefined) {
            navigation.replace('ClientTabsNavigator');
        }

    }, [user])


    return (
        //ETIQUETA VIEW ES PADRE
        //ETIQUETA IMAGE ES HIJO POR ESO NO SE CIERRA
        //Columna
        <View style={styles.container}>

            
            <Image style={styles.imageBackGround} source={require("../../../../assets/chef.jpg")} />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                            ?
                            <Image style={styles.logoImage} source={require("../../../../assets/user_image.png")} />
                            :
                            <Image style={styles.logoImage} source={{ uri: image }} />
                    }


                </TouchableOpacity>
                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>
            <View style={styles.form}>
                <ScrollView>
                    <Text style={styles.formText}> REGISTRARSE</Text>
                    <CustomTextInput
                        image={require("../../../../assets/user.png")}
                        placeholder='Nombres'
                        keyboardType='default'
                        property='name'
                        onChangeText={onChange}
                        value={name}
                    />
                    <CustomTextInput
                        image={require("../../../../assets/my_user.png")}
                        placeholder='Apellidos'
                        keyboardType='default'
                        property='lastname'
                        onChangeText={onChange}
                        value={lastname}
                    />
                    <CustomTextInput
                        image={require("../../../../assets/phone.png")}
                        placeholder='Telefono'
                        keyboardType='number-pad'
                        property='phone'
                        onChangeText={onChange}
                        value={phone}
                    />
                    <CustomTextInput
                        image={require("../../../../assets/email.png")}
                        placeholder='Email'
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
                    <CustomTextInput
                        image={require("../../../../assets/confirm_password.png")}
                        placeholder='Confirmar Contraseña'
                        keyboardType='default'
                        property='confirmPassword'
                        onChangeText={onChange}
                        value={confirmPassword}
                        secureTextEntry={true}
                    />
                    <View style={{ marginTop: 30 }}>
                        <RoundedButton text='Confirmar' onPress={() => { register(); }} />
                    </View>
                </ScrollView>
            </View>

            <ModalPickImage
                openGallery={pickImage}
                openCamera={takePhoto}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
            />
            {
                loading && 
                <ActivityIndicator
                style={styles.loading}
                size="large" color={MyColors.primary} />
            }
           
        </View>

    );
}
