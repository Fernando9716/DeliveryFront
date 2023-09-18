import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        width: '100%', //ancho de la pantalla
        height: '40%', //Altura
        backgroundColor: 'white',
        position: 'absolute', //posicion absoluta esta foltando
        bottom: 0, //Baje hasta lo ultimo de la pantalla
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30 //Se aplica al contenido y margin se aplica por fuera
    },

    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    fromRegisterTex: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%'
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    }

});
export default HomeStyles;