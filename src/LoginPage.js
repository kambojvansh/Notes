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
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class LoginPage extends Component {

    state = {
        Email: '',
        Password: ''
    }

    render() {
        return (
            // <KeyboardAwareScrollView style={styles.main_container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.main_container}>
                    <View style={styles.TopView}>
                        {/* <Text style={styles.textHading}>Notes</Text> */}
                    </View>
                    <View style={styles.bottumView}>
                        <Text style={styles.textHadinglogin}>Login</Text>
                        <View style={{}}>
                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder={"example@gmail.com"}
                                style={styles.inputtext}
                                onChangeText={(email) => this.setState({ Email: email })}
                                value={this.state.Email}
                            ></TextInput>
                            <Text style={styles.text}>password</Text>
                            <TextInput placeholder={"*******"}
                                style={styles.inputtext}
                                onChangeText={(email) => this.setState({ Password: email })}
                                value={this.state.Password}
                                secureTextEntry={true}
                            ></TextInput>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("user")}
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
                                if (this.state.Email == "vansh" && this.state.Password == "123") {
                                    this.props.navigation.navigate("NotesPage")
                                    this.setState({ Email: "", Password: "" })
                                }
                                else {
                                    alert("Enter  User name and Password")
                                    this.setState({ Email: "", Password: "" })
                                }

                            }


                            }


                        >
                            <Text style={styles.btntext}>Login</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("signup")}
                        >
                            <Text style={[styles.text, { alignSelf: 'center', fontWeight: 'bold' }]}>
                                Don't have an account? Sign up
                        </Text>

                        </TouchableOpacity>

                    </View>

                </View>
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