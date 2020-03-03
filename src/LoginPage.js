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
} from 'react-native';
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class LoginPage extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'NotesPage' : 'LoginPage')
        })
    }

    state = {
        Email: '',
        Password: '',
        errorMessage: '',
        isLoading: false
    }
    handleLogin = () => {
        setTimeout(() => { this.setState({ isLoading: false }) }, 20000);
        this.setState({ isLoading: true })
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.Email, this.state.Password)
            .then(() => {
                this.setState({ isLoading: false })
                this.props.navigation.navigate('NotesPage')
            })
            .catch(error => {
                this.setState({ isLoading: false })
                this.setState({ errorMessage: error.message })
                alert(this.state.errorMessage)
            })
    }


    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size='large'
        //                 color="#3498db" />
        //         </View>
        //     )
        // }
        return (
            // <KeyboardAwareScrollView style={styles.main_container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView>
                    <View style={styles.main_container}>
                        <View style={styles.TopView}>
                            {/* <Text style={styles.textHading}>Notes</Text> */}
                        </View>
                        <View style={styles.bottumView}>
                            {/* <KeyboardAwareScrollView> */}
                            <Text style={styles.textHadinglogin}>Login</Text>
                            <View style={{}}>
                                <Text style={styles.text}>Email</Text>
                                <TextInput placeholder={"example@gmail.com"}
                                    style={styles.inputtext}
                                    onChangeText={(email) => this.setState({ Email: email })}
                                    value={this.state.Email}
                                    keyboardType="email-address"
                                ></TextInput>
                                <Text style={styles.text}>password</Text>
                                <TextInput placeholder={"*******"}
                                    style={styles.inputtext}
                                    onChangeText={(email) => this.setState({ Password: email })}
                                    value={this.state.Password}
                                    secureTextEntry={true}
                                ></TextInput>
                                <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate("user")}
                                >
                                    <Text style={{
                                        alignSelf: 'flex-end',
                                        fontWeight: 'bold',
                                        color: '#3498db',
                                        marginBottom: 30
                                    }}>
                                        Forget your password
                        </Text>


                                </TouchableOpacity>


                            </View>
                            <TouchableOpacity style={styles.button}
                                onPress={() => {
                                    if (this.state.Email == "" && this.state.Password == "")
                                        return
                                    this.handleLogin()
                                    // if (this.state.Email == "vansh" && this.state.Password == "123") {
                                    //     this.props.navigation.navigate("NotesPage")
                                    //     this.setState({ Email: "", Password: "" })
                                    // }
                                    // else {
                                    //     alert("Enter  User name and Password")
                                    //     this.setState({ Email: "", Password: "" })
                                    // }

                                }


                                }


                            >
                                <Text style={styles.btntext}>Login</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("signup")}
                            >
                                <Text style={[styles.text, { alignSelf: 'center', fontWeight: 'bold', marginBottom: 15 }]}>
                                    Don't have an account? Sign up
                        </Text>

                            </TouchableOpacity>
                            {/* </KeyboardAwareScrollView> */}

                        </View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isLoading}>

                            <View style={{ marginTop: 350, alignSelf: 'center' }}>
                                <View style={{ backgroundColor: "white" }}>
                                    <ActivityIndicator size='large'
                                        color="#3498db" />
                                </View>
                            </View>

                        </Modal>

                    </View>
                </KeyboardAwareScrollView>

            </TouchableWithoutFeedback>
            // </KeyboardAwareScrollView>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    TopView: {
        backgroundColor: '#3498db',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        position: 'absolute',
        height: 200,
        width: screenWidth
    },
    bottumView: {
        backgroundColor: 'white',
        flex: 0.9,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        // height: 550,
        // width: 380,
        // marginTop: 200,
        // alignSelf: 'center',
        justifyContent: 'center',
        margin: 20,
        marginTop: 150,
        paddingHorizontal: 30
    },
    textHading: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: "bold"
    },
    textHadinglogin: {
        color: '#3498db',
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: "bold",
        margin: 30
    },
    text: {
        color: '#3498db',
        marginTop: 30
    },
    button: {
        backgroundColor: "#3498db",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignSelf: 'center'

    },
    btntext: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',

    },
    inputtext: {
        borderWidth: 1,
        borderBottomColor: '#3498db',
        borderColor: "white",
        margin: 10
    }
})