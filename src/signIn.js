import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Modal,
    BackHandler,
    Image
} from 'react-native';
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignIn extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView>
                    <View
                        style={{
                            // flex: 1,
                            backgroundColor: 'white',
                            height: screenHeight,
                            // marginVertical: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../images/toDoLogo.png')}
                            style={styles.img}
                        />

                        <View style={{
                            alignItems: 'center',
                        }}>
                            <TextInput
                                placeholder={"example@gmail.com"}
                                style={styles.inputtext}
                                // onChangeText={(email) => this.setState({ Email: email })}
                                // value={this.state.Email}
                                keyboardType="email-address"
                            ></TextInput>
                            <TextInput
                                placeholder={"*******"}
                                style={styles.inputtext}
                                // onChangeText={(email) => this.setState({ Password: email })}
                                // value={this.state.Password}
                                secureTextEntry={true}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.btn}
                            >
                                <Text style={styles.text}>Login</Text>
                            </TouchableOpacity>
                            <View
                                style={{ flexDirection: 'row' }}
                            >

                                <Text
                                    style={{
                                        color: 'gray',
                                        textAlign: "justify"

                                    }}
                                >________</Text>


                                <Text
                                    style={{
                                        color: 'gray',
                                        textAlign: 'center'

                                    }}
                                >or with</Text>
                                <Text
                                    style={{
                                        color: 'gray',
                                        textAlign: "justify"

                                    }}
                                >________</Text>

                            </View>

                            {/* buttons for face book */}

                            <View
                                style={{ flexDirection: 'row' }}
                            >
                                <TouchableOpacity
                                    style={styles.btnLink}
                                >
                                    <Image
                                        source={require('../images/facebook.png')}
                                        style={{
                                            height: 20
                                            , resizeMode: 'contain',
                                            width: 30
                                        }}
                                    />
                                    <Text style={{ color: '#3498db', fontWeight: 'bold' }}>Facebook</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.btnLink, { borderColor: 'red' }]}
                                >
                                    <Image
                                        source={require('../images/google.png')}
                                        style={{
                                            height: 20
                                            , resizeMode: 'contain',
                                            width: 30
                                        }}
                                    />
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}> Google</Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                            >
                                <Text style={{ color: 'gray' }}>Don't have an account? REGISTER</Text>

                            </TouchableOpacity>




                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>

        )
    }
}


const styles = StyleSheet.create({
    img: {
        height: screenHeight / 6,
        resizeMode: 'contain',
        marginBottom: 20
    },
    inputtext: {
        borderWidth: 1,
        // borderBottomColor: '#3498db',
        width: screenWidth / 1.5,
        borderColor: "lightgray",
        margin: 10,
        marginHorizontal: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center'
    },
    btn: {
        // borderWidth: 1,
        backgroundColor: '#45a0e6',
        width: screenWidth / 1.5,
        height: 50,
        // borderColor: "lightgray",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        // fontWeight: 'bold',
        color: 'white',
        fontSize: 25

    },
    btnLink: {
        borderWidth: 2,
        // backgroundColor: '#45a0e6',
        width: screenWidth / 3.5,
        height: 50,
        borderColor: "#3498db",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
})