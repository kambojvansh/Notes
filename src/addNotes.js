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
    Alert,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker'
import OptionsMenu from "react-native-options-menu"


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../images/attach.png");

export default class addNotes extends Component {
    constructor(props) {
        super(props)
        this.getValueLocally()

        this.state = {
            ModalVisible: false,
            getValue: '',
            note: '',
            islike: false,
            key: '',
            notesHeading: "",
            isLoading: false,
            isSave: false,
            imageSource: '',
            isImage: true


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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        // alert("ksksnckn")
        if (this.state.note == "" && this.state.notesHeading == "" && this.state.isImage) {
            this.props.navigation.navigate('NotesPage')
            return
        }
        Alert.alert(
            'Save Your chnages or',
            'discard them?',
            [
                { text: 'Yes', onPress: () => this.updateUser() },
                { text: 'No', onPress: () => this.props.navigation.navigate('NotesPage') },
                { text: 'cencel', onPress: () => { }, style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
        return true;
    }

    updateUser() {
        // let islike = this.state.islike
        if (this.state.note == "" && this.state.notesHeading == "") {
            // this.setState({ isSave: false })

            // { Keyboard.dismiss }
            return
        }

        this.setState({ isLoading: true, isSave: false })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey);
        updateDBRef.set({
            Notes: this.state.note,
            isLikes: this.state.islike,
            notesHeading: this.state.notesHeading,
            notesdate: new Date().getTime()
        })
            .then(() => {
                this.setState({ isLoading: false, isImage: false })
                // alert("Data Saved")
                this.props.navigation.navigate('NotesPage')
            })

            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    // isLoading: false,
                });
            });
    }
    deleteUser(key) {

        this.setState({ isLoading: true })
        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            // this.props.navigation.navigate('UserScreen');
        })
            .then(() => {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("NotesPage")
            })
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
    picFromGallary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // console.log(image);
            this.setState({ imageSource: image.path, isImage: false })
            // alert(image.path)
        });
        // )
    }
    fromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ imageSource: image.path, isImage: false })
            // console.log(image);
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {/* style={this.state.ModalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 } : { flex: 1 }}> */}
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            // position: 'absolute',
                            width: screenWidth,
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={[styles.btns, { position: 'absolute', left: 10 }]}
                                onPress={() => {
                                    // this.updateUser()
                                    // )
                                    if (this.state.note == "" && this.state.notesHeading == "" && this.state.isImage) {
                                        this.props.navigation.navigate('NotesPage')
                                        return
                                    }
                                    Alert.alert(
                                        'Save Your chnages or',
                                        'discard them?',
                                        [
                                            { text: 'Yes', onPress: () => this.updateUser() },
                                            { text: 'No', onPress: () => this.props.navigation.navigate('NotesPage') },
                                            { text: 'cencel', onPress: () => { }, style: 'cancel' },
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    );

                                    // this.props.navigation.navigate("NotesPage")
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
                                {/* <Image
                                style={[styles.img, {}]}
                                source={require('../images/update.png')}
                            ></Image> */}
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >Save</Text>
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
                            >
                                <OptionsMenu
                                    button={MoreIcon}
                                    buttonStyle={{
                                        width: 32,
                                        height: 40,
                                        margin: 7.5,
                                        resizeMode: "contain",
                                        // position: 'absolute',
                                        // left: 70
                                    }}
                                    destructiveIndex={1}
                                    options={["Gallary", "Camera"]}
                                    actions={[
                                        this.picFromGallary,
                                        this.fromCamera]}
                                />

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
                                // backgroundColor: 'lightgray',
                                borderBottomLeftRadius: 30,
                                borderBottomRightRadius: 30,
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                            }}
                                multiline={true}
                                placeholder={"Title"}
                                value={this.state.notesHeading}
                                onChangeText={(text) => {
                                    this.setState({ isSave: true })
                                    // alert("scskckn")
                                    this.setState({ notesHeading: text })
                                }}
                            >

                            </TextInput>
                            <TextInput style={{
                                height: screenHeight / 5,
                                width: screenWidth - 50,
                                // textAlign: 'center'
                                textAlignVertical: 'top',
                                fontWeight: 'bold',
                                backgroundColor: 'white'

                            }}
                                multiline={true}
                                placeholder={"Notes"}
                                value={this.state.note}

                                onChangeText={(text) => {
                                    this.setState({ isSave: true })
                                    this.setState({ note: text })
                                }}
                            >

                            </TextInput>
                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    style={{
                                        width: 300,
                                        height: 400,
                                    }}
                                    source={{ uri: this.state.imageSource }}
                                // source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' }}
                                ></Image>

                            </View>


                        </View>
                        {/* {this.state.isSave ? */}


                        {/* : null} */}



                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.ModalVisible}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
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

                            </View>


                        </Modal>
                        {/* </View> */}

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.isLoading}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

                                <View style={{ marginTop: 350, alignSelf: 'center' }}>
                                    <View style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                        <ActivityIndicator size='large'
                                            color="#3498db"
                                            style={{ height: 100 }} />
                                    </View>
                                </View>
                            </View>

                        </Modal>


                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        flex: 1,
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
    },
    TopView: {
        backgroundColor: '#3498db',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        position: 'absolute',
        height: 500,
        width: screenWidth,
        bottom: 10,
    }

})