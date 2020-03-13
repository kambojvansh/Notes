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
import firebase from 'react-native-firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class signUp extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        number: '',
        errorMessage: null,
        isLoading: false
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
                this.props.navigation.navigate('Deshboard')
                // alert("sucsess")

            })
            .catch(error => {
                this.setState({ isLoading: false })
                this.setState({ errorMessage: error.message })
                alert(this.state.errorMessage)
            })
    }
    // fieldRef = React.createRef();

    // onSubmit = () => {
    //     let { current: field } = this.fieldRef;

    //     console.log(field.value());
    // };

    // formatText = (text) => {
    //     return text.replace(/[^+\d]/g, '');
    // };
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
                            <View style={{
                                width: screenWidth / 1.5
                            }}>
                                <TextField
                                    label='First and Last name'
                                    keyboardType='name-phone-pad'
                                    lineType='none'
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={this.state.name}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                // formatText={this.formatText}
                                // onSubmitEditing={this.onSubmit}
                                // ref={this.fieldRef}
                                >
                                </TextField>
                                <TextField
                                    label='Phone Number'
                                    keyboardType='number-pad'
                                    lineType='none'
                                    onChangeText={(text) => this.setState({ number: text })}
                                    value={this.state.number}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                >
                                </TextField>
                                <TextField
                                    label='example@example.com'
                                    keyboardType='email-address'
                                    lineType='none'
                                    onChangeText={(email) => this.setState({ email: email })}
                                    value={this.state.email}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                >
                                </TextField>
                                <TextField
                                    label='Password'
                                    keyboardType='name-phone-pad'
                                    lineType='none'
                                    onChangeText={(email) => this.setState({ password: email })}
                                    value={this.state.password}
                                    inputContainerStyle={{
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "lightgray",
                                    }}
                                    labelTextStyle={{ textAlign: 'center', }}
                                    secureTextEntry={true}
                                    title="Minimum 6 characters"
                                >
                                </TextField>

                            </View>



                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {
                                    if (this.state.email == "" && this.state.password == "" && this.state.name == "" && this.state.number == "")
                                        return
                                    this.handleSignUp()
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
                                onPress={() => this.props.navigation.navigate('LoginPage')}
                            >
                                <Text style={{ color: 'gray' }}>Already have an account? LOGIN</Text>

                            </TouchableOpacity>




                        </View>
                        <Modal
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

                        </Modal>
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

// <TextInput
//                                 placeholder={"First and Last name"}
//                                 style={styles.inputtext}
//                                 // onChangeText={(email) => this.setState({ Email: email })}
//                                 // value={this.state.Email}
//                                 keyboardType='name-phone-pad'
//                             ></TextInput>
//                             <TextInput
//                                 placeholder={"Phone number"}
//                                 style={styles.inputtext}
//                                 // onChangeText={(email) => this.setState({ Email: email })}
//                                 // value={this.state.Email}
//                                 keyboardType='number-pad'
//                             ></TextInput>
//                             <TextInput
//                                 placeholder={"example@gmail.com"}
//                                 style={styles.inputtext}
//                                 // onChangeText={(email) => this.setState({ Email: email })}
//                                 // value={this.state.Email}
//                                 keyboardType="email-address"
//                             ></TextInput>
//                             <TextInput
//                                 placeholder={"*******"}
//                                 style={styles.inputtext}
//                                 // onChangeText={(email) => this.setState({ Password: email })}
//                                 // value={this.state.Password}
//                                 secureTextEntry={true}
//                             ></TextInput>