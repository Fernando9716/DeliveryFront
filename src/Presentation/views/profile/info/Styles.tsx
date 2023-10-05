import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: 'black'
},
imageBackGround: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
    bottom: '30%'
},
form: {
    width: '100%', //ancho de la pantalla
    height: '45%', //Altura
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
formInfo:{
    flexDirection:'row',
    alignItems:'center'
},
formContent:{
    marginLeft:15
},
fromImage:{
    width:30,
    height:30
},
formTextDescription:{
    fontSize:13,
    color:'gray'
},
logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '11%'
},
logoImage: {
    width: 180,
    height: 180,
    borderRadius:100,
    borderColor:'white',
    borderWidth:3
},
logoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
},
logout:{
    position: 'absolute',
    alignSelf:'center',
    top:30,
    right:10
},
logoutImage:{
    width:40,
    height:40,
}

});

export default ProfileInfoStyles;