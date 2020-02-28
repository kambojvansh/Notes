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
    Modal,
    ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        lname: '',
        errorMessage: null,
        isLoading: false
    }
    storeData = async () => {
        try {
            await AsyncStorage.setItem('firstName', this.state.name)
            await AsyncStorage.setItem('lastName', this.state.lname)
        } catch (e) {
            // saving error
        }
    }
    handleSignUp = () => {
        setTimeout(() => { this.setState({ isLoading: false }) }, 20000);
        this.setState({ isLoading: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            // .then(() => this.props.navigation.navigate('Home'))
            .then(() => {
                this.setState({ isLoading: false })
                this.storeData()
                this.props.navigation.navigate('LoginPage')
                // alert("sucsess")

            })
            .catch(error => {
                this.setState({ isLoading: false })
                this.setState({ errorMessage: error.message })
                alert(this.state.errorMessage)
            })
    }
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
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                        // placeholderTextColor="#fff"
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Last Name"}
                            onChangeText={(text) => this.setState({ lname: text })}
                            value={this.state.lname}
                        // placeholderTextColor="#fff"
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Email"}
                            // placeholderTextColor="#fff"
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email: email })}
                            value={this.state.email}
                        ></TextInput>
                        <TextInput style={styles.textinput}
                            placeholder={"Password"}
                            // placeholderTextColor="#fff"
                            secureTextEntry={true}
                            onChangeText={(email) => this.setState({ password: email })}
                            value={this.state.password}
                        ></TextInput>
                        <TouchableOpacity style={styles.btn}
                            // onPress={() => this.props.navigation.navigate("user")}
                            onPress={() => {
                                if (this.state.email == "" && this.state.password == "")
                                    return
                                this.handleSignUp()
                            }
                            }
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                Create Account
                        </Text>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isLoading}>

                            <View style={{ marginTop: 350, alignSelf: 'center' }}>
                                <View style={{ backgroundColor: "#3498db" }}>
                                    <ActivityIndicator size='large'
                                        color="white"
                                        style={{ height: 100 }} />
                                </View>
                            </View>

                        </Modal>
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
        height: screenHeight / 4.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    BottumContainer: {
        flex: 3,
        backgroundColor: "#3498db",
        borderTopRightRadius: 400,
        elevation: 20,
        height: screenHeight / 1.3,
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