import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View, Image, TextInput, Button, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native';
import { RoundedButton } from '../../../components/RoundedButton';
import { CustomTextInput } from '../../../components/CustomTextInput';
import useViewModel from './ViewModel';
import styles from './Styles';
import { ModalPickImage } from '../../../components/ModalPickImage';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { MyColors } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'> { };

export const ProfileUpdateScreen = ({ navigation, route }: Props) => {
    const { user } = route.params;
    const { name, lastname, image, phone, onChange, update,loading,successMessage, errorMessage, pickImage, takePhoto } = useViewModel(user);
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        if (errorMessage != '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }

    }, [errorMessage])
    useEffect(() => {
        if (successMessage != '') {
            ToastAndroid.show(successMessage, ToastAndroid.LONG)
        }

    }, [successMessage])

    //  useEffect(() => {
    //     onChangeInfoUpdate(user?.name!,user?.lastname!,user?.phone!);

    //  }, [user])


    return (
        //ETIQUETA VIEW ES PADRE
        //ETIQUETA IMAGE ES HIJO POR ESO NO SE CIERRA
        //Columna
        <View style={styles.container}>

            
            <Image style={styles.imageBackGround} source={require("../../../../../assets/ciudad.jpg")} />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                            ?
                            <Image style={styles.logoImage} source={{uri: user?.image}} />
                            :
                            <Image style={styles.logoImage} source={{ uri: image }} />
                    }


                </TouchableOpacity>
                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>
            <View style={styles.form}>
                <ScrollView>
                    <Text style={styles.formText}>  </Text>
                    <CustomTextInput
                        image={require("../../../../../assets/user.png")}
                        placeholder='Nombres'
                        keyboardType='default'
                        property='name'
                        onChangeText={onChange}
                        value={name}
                    />
                    <CustomTextInput
                        image={require("../../../../../assets/my_user.png")}
                        placeholder='Apellidos'
                        keyboardType='default'
                        property='lastname'
                        onChangeText={onChange}
                        value={lastname}
                    />
                    <CustomTextInput
                        image={require("../../../../../assets/phone.png")}
                        placeholder='Telefono'
                        keyboardType='number-pad'
                        property='phone'
                        onChangeText={onChange}
                        value={phone}
                    />
                   
                    <View style={{ marginTop: 30 }}>
                        <RoundedButton text='Confirmar' onPress={() => { update(); }} />
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
