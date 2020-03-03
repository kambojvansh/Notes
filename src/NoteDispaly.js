import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Alert
} from 'react-native';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class NoteDisplay extends Component {
    constructor(props) {
        super(props)
        this.getValueLocally()

        this.state = {
            ModalVisible: false,
            error: '',
            getValue: '',
            lname: '',
            note: '',
            islike: false,
            key: '',
            notesHeading: ""
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

        } catch (e) {
            alert(e)

        }
    }

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
    like = this.props.route.params.like

    componentDidMount() {
        this.setState({
            note: this.text,
            islike: this.props.route.params.like,
            notesHeading: this.props.route.params.heading
        })
        // alert(this.state.islike)
        // alert(this.state.note)
        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey)
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    name: user.name,
                    email: user.email,
                });
            } else {
                console.log("Document does not exist!");
            }
        });
    }

    updateUser() {
        // this.setState({
        //     isLoading: true,
        // });
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey);
        updateDBRef.set({
            Notes: this.state.note,
            isLikes: this.state.islike,
            notesHeading: this.state.notesHeading,
            notesdate: new Date()
        })
            .then(() => { alert("Data Updated") })

            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    // isLoading: false,
                });
            });
    }
    deleteUser(key) {

        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            // this.props.navigation.navigate('UserScreen');
        })
            .then(() => this.props.navigation.navigate("NotesPage"))
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => this.deleteUser() },
                { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={{ flex: 1, }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity style={[styles.btns, { position: 'absolute', left: 10 }]}
                            onPress={() => {
                                // this.updateUser()
                                // )
                                this.props.navigation.navigate("NotesPage")
                            }}
                        >
                            <Image
                                style={[styles.img, {}]}
                                source={require('../images/back.png')}
                            ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns}
                            onPress={() => {
                                this.updateUser()
                                // )
                            }}
                        >
                            <Image
                                style={[styles.img, {}]}
                                source={require('../images/update.png')}
                            ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns}
                            onPress={() => {
                                this.openTwoButtonAlert()
                                // )
                            }}
                        >
                            <Image
                                style={[styles.img, {}]}
                                source={require('../images/delete.png')}
                            ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns}
                            onPress={() => {
                                if (this.state.islike) {
                                    this.setState({ islike: false })
                                }
                                else {
                                    this.setState({ islike: true })
                                }
                            }}
                        >
                            <Image
                                style={[styles.img, {}]}
                                source={this.state.islike ? require('../images/isstar.png') : require('../images/star.png')}
                            ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns}
                            onPress={() => this.setState({ ModalVisible: true })}
                        >
                            <Image
                                style={[styles.img, {}]}
                                source={require('../images/logout.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.commentContainer}>
                        <TextInput style={{
                            // height: screenHeight / 2,
                            width: screenWidth - 50,
                            // // textAlign: 'center'
                            // textAlignVertical: 'top',
                            fontWeight: 'bold',
                            fontSize: 25,
                            alignSelf: 'center',
                            textAlign: 'center',
                            backgroundColor: 'lightgray',
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                        }}
                            multiline={true}
                            placeholder={"Add heading"}
                            value={this.state.notesHeading}
                            onChangeText={(text) => this.setState({ notesHeading: text })}
                        >

                        </TextInput>
                        <TextInput style={{
                            height: screenHeight / 2,
                            width: screenWidth - 50,
                            // textAlign: 'center'
                            textAlignVertical: 'top',
                            fontWeight: 'bold',
                            backgroundColor: 'white'
                        }}
                            multiline={true}
                            value={this.state.note}
                            onChangeText={(text) => this.setState({ note: text })}
                        >

                        </TextInput>


                    </View>


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
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        flex: 0.7,
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        margin: 20

    },
    text: {
        // margin: 25,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: 'skyblue',
        // marginTop: 20,
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
    },
    btns: {
    },
    img: {
        height: 30,
        width: 30,
        margin: 10
    }

})