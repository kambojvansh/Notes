import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class LoginPage extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.TopView}>
                    <Text style={styles.textHading}>Notes</Text>
                </View>
                <View style={styles.bottumView}>
                    <Text style={styles.textHadinglogin}>Login</Text>
                    <View style={{}}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput placeholder={"example@gmail.com"}
                            style={styles.inputtext}
                        ></TextInput>
                        <Text style={styles.text}>password</Text>
                        <TextInput placeholder={"*******"}
                            style={styles.inputtext}
                        ></TextInput>
                        <TouchableOpacity>
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
                        onPress={() => this.props.navigation.navigate("NotesPage")}

                    >
                        <Text style={styles.btntext}>Login</Text>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.text, { alignSelf: 'center', fontWeight: 'bold' }]}>
                            Don't have an account? Sign up
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    TopView: {
        backgroundColor: '#3498db',
        flex: 0.3,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center'
    },
    bottumView: {
        backgroundColor: 'white',
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        height: 550,
        width: 380,
        marginTop: 200,
        alignSelf: 'center',
        justifyContent: 'center',
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