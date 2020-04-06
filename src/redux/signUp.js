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
    Image,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    logInUser,
    signUpUser,
    nameChanged,
    numberChanged,
    onLoginOrRegisterGoogle,
    onLoginOrRegisterFacebook
} from "./actions"
import Loading from "./components/loading"
import { LoginButton, AccessToken } from 'react-native-fbsdk'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export class signUp extends Component {
    onEmailchanged(text) {
        this.props.emailChanged(text)

    }
    onPasswordChanged(text) {
        this.props.passwordChanged(text)
    }
    buttonPressed() {
        const { email, pass } = this.props
        this.props.signUpUser(email, pass)
    }
    onNameChanged(text) {
        this.props.nameChanged(text)
    }
    onNumberChanged(text) {
        this.props.numberChanged(text)
    }

    // state = {
    //     email: '',
    //     password: '',
    //     name: '',
    //     number: '',
    //     errorMessage: null,
    //     isLoading: false
    // }
    // handleSignUp = () => {
    //     setTimeout(() => { this.setState({ isLoading: false }) }, 20000);
    //     this.setState({ isLoading: true })
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //         // .then(() => this.props.navigation.navigate('Home'))
    //         .then(() => {
    //             this.setState({ isLoading: false })
    //             this.storeData()
    //             this.props.navigation.navigate('Deshboard')
    //             // alert("sucsess")

    //         })
    //         .catch(error => {
    //             this.setState({ isLoading: false })
    //             this.setState({ errorMessage: error.message })
    //             alert(this.state.errorMessage)
    //         })
    // }
    // fieldRef = React.createRef();

    // onSubmit = () => {
    //     let { current: field } = this.fieldRef;

    //     console.log(field.value());
    // };

    // formatText = (text) => {
    //     return text.replace(/[^+\d]/g, '');
    // };
    render() {
        // if (this.props.isLogin) {
        //     this.props.navigation.navigate('Deshboard')
        // }
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
                            source={require('../../images/toDoLogo.png')}
                            style={styles.img}
                        />

                        <View style={{
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: screenWidth / 1.5
                            }}>
                                <FilledTextField
                                    label='First and Last name'
                                    keyboardType='name-phone-pad'
                                    lineType='none'
                                    onChangeText={this.onNameChanged.bind(this)}
                                    value={this.props.name}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                        backgroundColor: 'white'
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                // formatText={this.formatText}
                                // onSubmitEditing={this.onSubmit}
                                // ref={this.fieldRef}
                                >
                                </FilledTextField>
                                <FilledTextField
                                    label='Phone Number'
                                    keyboardType='number-pad'
                                    lineType='none'
                                    onChangeText={this.onNumberChanged.bind(this)}
                                    value={this.props.number}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                        backgroundColor: 'white'
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                >
                                </FilledTextField>
                                <FilledTextField
                                    label='example@example.com'
                                    keyboardType='email-address'
                                    lineType='none'
                                    onChangeText={this.onEmailchanged.bind(this)}
                                    value={this.props.email}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                        backgroundColor: 'white'
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                >
                                </FilledTextField>
                                <FilledTextField
                                    label='Password'
                                    keyboardType='name-phone-pad'
                                    lineType='none'
                                    onChangeText={this.onPasswordChanged.bind(this)}
                                    value={this.props.pass}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                        backgroundColor: 'white'
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                    secureTextEntry={true}
                                    title="Minimum 6 characters"
                                >
                                </FilledTextField>

                            </View>



                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {
                                    if (this.props.email == "" && this.props.pass == "" && this.props.name == "" && this.props.number == "")
                                        return
                                    this.buttonPressed()
                                }
                                }
                            >
                                <Text style={styles.text}>Register</Text>
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

                                <LoginButton
                                    style={[styles.btnLink]}
                                    onLoginFinished={
                                        (error, result) => {
                                            if (error) {
                                                console.log("login has error: " + result.error);
                                            } else if (result.isCancelled) {
                                                console.log("login is cancelled.");
                                            } else {
                                                AccessToken.getCurrentAccessToken().then(
                                                    (data) => {
                                                        console.log(data.accessToken.toString())
                                                    }
                                                )
                                            }
                                        }
                                    }
                                    onLogoutFinished={() => console.log("logout.")} />
                                {/* <TouchableOpacity
                                    style={styles.btnLink}
                                    onPress={() => this.props.onLoginOrRegisterFacebook()}
                                >
                                    <Image
                                        source={require('../../images/facebook.png')}
                                        style={{
                                            height: 20
                                            , resizeMode: 'contain',
                                            width: 30
                                        }}
                                    />
                                    <Text style={{ color: '#3498db', fontWeight: 'bold' }}>Facebook</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={[styles.btnLink, { borderColor: 'red' }]}
                                    onPress={() => this.props.onLoginOrRegisterGoogle()}
                                >
                                    <Image
                                        source={require('../../images/google.png')}
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
                                onPress={() => Actions.login()}
                            >
                                <Text style={{ color: 'gray' }}>Already have an account? LOGIN</Text>

                            </TouchableOpacity>




                        </View>
                        <View>
                            {this.props.isLoading ? <Loading /> : null}

                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback >

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
        height: 30,
        borderColor: "#3498db",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
})
const mapStateTOProps = state => {
    console.log(state)
    return {
        email: state.auth.email,
        pass: state.auth.pass,
        isLoading: state.auth.isLoading,
        name: state.auth.name,
        number: state.auth.number
    }
}

export default connect(mapStateTOProps, {
    emailChanged,
    passwordChanged,
    logInUser,
    signUpUser,
    nameChanged,
    numberChanged,
    onLoginOrRegisterGoogle,
    onLoginOrRegisterFacebook
})(signUp)