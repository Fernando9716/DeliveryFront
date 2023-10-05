import React, { useEffect } from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import useViewModel from './ViewModel'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';

const ProfileinfoScreen = () => {

  const { clearUserSession, user } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log("user perfil ",user)
  useEffect(() => {
    if (user?.id === '') {
      navigation.replace('HomeScreen');
    }

  }, [user])

  return (
    <View style={styles.container}>
      {/* <Button
        title='Cerrar sesion'
        onPress={()=>{
          clearSesion();
          //navigation.navigate('HomeScreen');
        }}
       
       />  */}

      <Image style={styles.imageBackGround}
        source={require("../../../../../assets/ciudad.jpg")}
      />
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          clearUserSession();

        }}
      >
        <Image
          style={styles.logoutImage}
          source={require("../../../../../assets/logout.png")}
        />
      </TouchableOpacity>




      <View style={styles.logoContainer}>
        {user?.image !==''
        &&  
        <Image style={styles.logoImage}
        source={{ uri: user?.image }} />
        }
       
        <Text style={styles.logoText}>

        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require('../../../../../assets/user.png')}
            style={styles.fromImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.name} {user?.lastname}
            </Text>
            <Text style={styles.formTextDescription}>
              Nombre del usuario
            </Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require('../../../../../assets/email.png')}
            style={styles.fromImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.email}
            </Text>
            <Text style={styles.formTextDescription}>
              Correo electronico
            </Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 60 }}>
          <Image
            source={require('../../../../../assets/phone.png')}
            style={styles.fromImage}
          />
          <View style={styles.formContent}>
            <Text>
              {user?.phone}
            </Text>
            <Text style={styles.formTextDescription}>
              Telefono
            </Text>
          </View>
        </View>
        <RoundedButton
          onPress={() => { navigation.navigate('ProfileUpdateScreen', { user: user! }) }}
          text='ACTUALIZAR INFORMACION'
        />
      </View>
    </View>
  )
}

export default ProfileinfoScreen