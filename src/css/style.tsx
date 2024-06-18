import { StyleSheet } from "react-native";



const styles=StyleSheet.create({
    
    screen : {
        height: "100%",
        width: "100%",
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: "#ABD1C6",
    },
    title:{
        fontWeight: '400',
        fontSize: 30,
        color: '#004643',
       },
    normalText : {
        color : "black",
        fontSize : 16
    },
    inputTextContainer : {
        width : "100%",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    inputText : {
        backgroundColor : "white",
        elevation : 5,
        margin: 8,
        width: "80%",
        borderRadius: 30,
        padding: 20,
        color: '#004643',
        fontSize: 16,
        fontWeight: '500',
    },
    button:{
        margin: 20,
        padding: 10,
        paddingHorizontal: 40,
        backgroundColor: "#F8C660",
        borderRadius: 30,
        elevation: 15,
        alignItems: 'center'
        
    },
    buttonText:{
        fontSize: 26,
        fontWeight: '500',
        color : 'white'
    },
    icon: { 
        marginLeft: 10, 
    }, 
    listItemBtn : {
        margin: 20,
        padding: 10,
        width: '80%',
        paddingHorizontal: 40,
        backgroundColor: "#F8C660",
        borderRadius: 30,
        elevation: 15,
        alignItems: 'center',
        alignSelf: 'center'
},
    listItemText : {},
    imageContainer: {
        backgroundColor: 'white', 
        elevation: 5, 
        height: 150,
        width:150, 
        marginVertical: 30, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    reportItemContainer : {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10

    },
    questionContainer : {
        width: '80%',
        backgroundColor: 'white',
        height: '30%',
        borderRadius: 20,
        elevation: 5,
    },
    radioButtonLabelStyle: {
        color: '#004643', 
        padding : 0, 
        margin: 0,
        borderRadius: 20,
        width: '80%', 
        fontSize: 16, 
        fontWeight: '500'
    },
    radioButtonContainerStyle : {
        backgroundColor: 'white', 
        padding: 10, 
        borderRadius: 30
    }
    

});

export default styles;