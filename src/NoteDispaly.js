import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

export default class NoteDisplay extends Component {
    constructor(props) {
        super(props)
        this.getValueLocally()
        // const value = this.props.route
        // console.log(props.route.params, "props")
        this.state = {
            ModalVisible: false,
            error: '',
            getValue: '',
            lname: ''
        }
    }
    getValueLocally = async () => {
        try {
            let firstName = await AsyncStorage.getItem('firstName')
            let lastName = await AsyncStorage.getItem('lastName')
            this.setState({
                getValue: firstName,
                lname: lastName
            })
            // alert("Done")
        } catch (e) {
            alert(e)
            // saving error
        }
    }
    // getValueLocally = () => {
    //     AsyncStorage.getItem('UserName').then((value) => this.setState({ getValue: value }))
    // }
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.setState({ ModalVisible: false })
            this.props.navigation.navigate('LoginPage')
            // alert("Logout")
        } catch (e) {
            // console.log(e);
            this.setState({ error: e })
            alert(this.state.e)
        }
    }
    text = this.props.route.params.commentPass
    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                    <Text>Hello {this.state.getValue} </Text>
                    <Text>{this.state.lname}</Text>

                </View>

                <View style={styles.commentContainer}>
                    <Text style={styles.text}>
                        {this.text}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ ModalVisible: true })}
                        style={styles.btn}
                    >
                        <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>

                </View>
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.ModalVisible}>

                    <View style={{ marginHorizontal: 30, marginTop: 200, }}>
                        <View style={styles.model}>
                            <Text style={{ marginTop: 10, alignSelf: 'center', fontSize: 15, color: 'white', fontWeight: 'bold' }}>
                                Are You Wants To Logout
                        </Text>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 50, marginVertical: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.signOutUser()}
                                >
                                    <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', right: 30 }}

                                    onPress={() => this.setState({ ModalVisible: false })}
                                >
                                    <Text style={{ color: 'red', fontSize: 25, fontWeight: 'bold' }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal> */}
                {/* <View style={{ backgroundColor: 'red' }}> */}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.ModalVisible}>
                    <View style={{ marginHorizontal: 30, marginTop: 200 }}>
                        <View style={styles.model}>
                            <View style={styles.model}>
                                <Text style={styles.modelText}>Log out</Text>
                                <Text style={styles.modelText2}>You will be returned to the login screen</Text>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 50, marginVertical: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.signOutUser()}
                                    >
                                        <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>Log out</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ position: 'absolute', right: 30 }}

                                        onPress={() => this.setState({ ModalVisible: false })}
                                    >
                                        <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </View>

                </Modal>
                {/* </View> */}


            </View>
        )
    }
}
const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        flex: 0.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        margin: 20

    },
    text: {
        margin: 25,
        fontWeight: 'bold'
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


    },
    model: {
        backgroundColor: "#3498db",
        borderRadius: 20,
        paddingHorizontal: 10
    },
    modelText: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        color: 'white'
    },
    modelText2: {
        fontSize: 25,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        color: 'white'
    }

})