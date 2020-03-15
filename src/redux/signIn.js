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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, logInUser } from "./actions"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export class SignIn extends Component {

    onEmailchanged(text) {
        this.props.emailChanged(text)

    }
    onPasswordChanged(text) {
        this.props.passwordChanged(text)
    }
    buttonPressed() {
        const { email, pass } = this.props
        // alert(email + pass)
        this.props.logInUser(email, pass)
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         // this.props.navigation.navigate(user ? 'Deshboard' : 'LoginPage')
    //     })
    // }
    // state = {
    //     Email: '',
    //     Password: '',
    //     errorMessage: '',
    //     isLoading: false
    // }
    // handleLogin = () => {
    //     setTimeout(() => { this.setState({ isLoading: false }) }, 20000);
    //     this.setState({ isLoading: true })
    //     firebase
    //         .auth()
    //         .signInWithEmailAndPassword(this.state.Email, this.state.Password)
    //         .then(() => {
    //             this.setState({
    //                 Email: "",
    //                 isLoading: false,
    //                 Password: ""
    //             }, () => this.props.navigation.navigate('Deshboard'))

    //         })
    //         .catch(error => {
    //             this.setState({ isLoading: false })
    //             this.setState({ errorMessage: error.message })
    //             alert(this.state.errorMessage)
    //         })
    // }
    render() {
        // console.log(this.props.email)
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
                                    label='example@gmail.com'
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
                                // formatText={this.formatText}
                                // onSubmitEditing={this.onSubmit}
                                // ref={this.fieldRef}
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
                                    // if (this.props.email == "" && this.props.pass == "")
                                    //     return
                                    this.buttonPressed()

                                }
                                }
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
                                        source={require('../../images/facebook.png')}
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
                                onPress={() => this.props.navigation.navigate('signup')}
                            >
                                <Text style={{ color: 'gray' }}>Don't have an account? REGISTER</Text>

                            </TouchableOpacity>




                        </View>
                        {/* <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isLoading}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                <View style={{ marginTop: 350, alignSelf: 'center' }}>
                                    <View>
                                        <ActivityIndicator size='large'
                                            color="#45a0e6'" />
                                    </View>
                                </View>
                            </View>

                        </Modal> */}
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

const mapStateTOProps = state => {
    // console.log(state)
    return {
        email: state.auth.email,
        pass: state.auth.pass
    }
}

export default connect(mapStateTOProps, { emailChanged, passwordChanged, logInUser })(SignIn)