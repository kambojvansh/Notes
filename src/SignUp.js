import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignUp extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <KeyboardAwareScrollView
                    style={{ flex: 1, backgroundColor: 'white' }}
                >

                    {/* <View style={{ flex: 1, backgroundColor: 'white' }}> */}
                    {/* <View> */}

                    <View style={styles.TopContainer}>
                        <Text style={styles.text}>SignUp</Text>
                    </View>
                    <View style={styles.BottumContainer}>
                        <TextInput style={styles.textinput}
                            placeholder={"First Name"}
                            placeholderTextColor="#fff"
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Last Name"}
                            placeholderTextColor="#fff"
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Email"}
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Password"}
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                        ></TextInput>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => this.props.navigation.navigate("user")}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                Create Account
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}

                    {/* </View> */}

                </KeyboardAwareScrollView >
            </TouchableWithoutFeedback>


        )
    }
}
const styles = StyleSheet.create({
    TopContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: screenHeight / 4.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    BottumContainer: {
        flex: 3,
        backgroundColor: "#3498db",
        borderTopRightRadius: 400,
        elevation: 20,
        height: screenHeight / 1.4,
        justifyContent: 'center',
        paddingHorizontal: 70
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#3498db'
    },
    textinput: {
        borderWidth: 1,
        color: 'white',
        borderColor: "#3498db",
        borderBottomColor: 'skyblue',

    },
    btn: {
        backgroundColor: 'skyblue',
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20


    }
})