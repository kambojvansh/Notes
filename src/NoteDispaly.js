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
    ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker'
import OptionsMenu from "react-native-options-menu"
import uuid from 'uuid/v4'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../images/attach.png");

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
            notesHeading: "",
            isLoading: false,
            isSave: false,
            imageSource: '',
            imgSource: '',
            uploading: false,
            progress: 0,
            images: "",
            img: '',
            imageSource2: ''
        }
    }
    getValueLocally = async () => {
        try {
            this.props.route.params.image
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
    heading = this.props.route.params.heading

    getImage = async () => {
        // alert(this.state.imageSource2)
        if (this.props.route.params.image === "")
            return
        const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${this.props.route.params.image}`);
        try {
            let url = await imgRef.getDownloadURL()
            this.setState({ imageSource2: url })

        }
        catch (arr) {
            // alert(arr)
            console.log(arr)

        }

    }
    deletImage = async () => {
        this.setState({ isLoading: true, isSave: false })
        // alert(this.state.imageSource2)
        if (this.props.route.params.image === "") {
            this.deleteUser()
            return
        }

        const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${this.props.route.params.image}`);
        try {
            await imgRef.delete()
            this.deleteUser()
        }
        catch (arr) {
            // alert(arr)
            console.error(arr)

        }

    }

    componentDidMount() {
        this.setState({
            note: this.text,
            islike: this.props.route.params.like,
            notesHeading: this.props.route.params.heading,
            img: this.props.route.params.image
        })

        this.getImage()

    }

    updateUser() {
        if (this.text == this.state.note.trim() && this.heading == this.state.notesHeading && this.like == this.state.islike) {
            this.setState({ isSave: false })

            // { Keyboard.dismiss }
            return
        }

        this.setState({ isLoading: true, isSave: false })
        const updateDBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.props.route.params.userkey);
        updateDBRef.set({
            Notes: this.state.note,
            isLikes: this.state.islike,
            notesHeading: this.state.notesHeading,
            notesdate: new Date().getTime(),
            img: this.props.route.params.image,

        })
            .then(() => {
                this.setState({ isLoading: false })
                alert("Data Updated")
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
                { text: 'Yes', onPress: () => this.deletImage() },
                { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    picFromGallary = () => {
        this.setState({ imageSource2: "" })
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // console.log(image);
            this.setState({ imageSource: image.path })
            // alert(image.path)
        });
        // )
    }
    fromCamera = () => {
        this.setState({ imageSource2: "" })
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ imageSource: image.path })
            // console.log(image);
        });
    }
    uploadImage = () => {
        const ext = this.state.imageSource.split('.').pop(); // Extract image extension
        const filename = `${this.props.route.params.image}`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`Notes/Images/${firebase.auth().currentUser.uid}/${filename}`)
            .putFile(this.state.imageSource)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    // alert((snapshot.bytesTransferred / snapshot.totalBytes))
                    let state = {};
                    state = {
                        ...this.state,
                        progress: 20
                        // progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100// Calculate progress percentage
                    };
                    // this.setState({ progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 })
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        // const allImages = this.state.images;
                        // allImages.push(snapshot.downloadURL);
                        let loaclUrl = filename
                        state = {
                            ...this.state,
                            uploading: false,
                            imgSource: '',
                            imgSource2: '',
                            imageUri: '',
                            progress: 0,
                            images: loaclUrl
                        };
                        // AsyncStorage.setItem('images', JSON.stringify(allImages));
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    };


    render() {
        const { uploading, imageSource, progress, img, imageSource2 } = this.state;
        const disabledStyle = uploading ? styles.disabledBtn : {};
        const actionBtnStyles = [styles.imgBtn, disabledStyle];
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {/* style={this.state.ModalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 } : { flex: 1 }}> */}
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1 }}>


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
                            {/* <Text>{this.state.progress}</Text> */}
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
                        {/* <View style={styles.TopView}>
                       
                    </View> */}


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

                                {/** Display selected image */}

                                {imageSource !== '' && (

                                    <View>

                                        <Image source={{ uri: imageSource }} style={styles.image} />
                                        {uploading && (
                                            <View
                                            // style={[styles.progressBar, { width: `${progress}%`, marginTop: 10 }]}
                                            >
                                                <Image
                                                    style={{ alignSelf: 'center', height: 100, width: screenWidth / 2.5 }}
                                                    source={require('../images/progress.gif')}
                                                >

                                                </Image>
                                            </View>
                                        )}
                                        <TouchableOpacity
                                            style={actionBtnStyles}
                                            onPress={this.uploadImage}
                                            disabled={uploading}
                                        >
                                            <View>
                                                {uploading ? (
                                                    <Text style={styles.btnTxt}>Uploading ...</Text>
                                                ) : (
                                                        <Text style={styles.btnTxt}>Upload image</Text>
                                                    )}
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                )}
                                {imageSource2 !== '' && (
                                    <View>
                                        <Image source={{ uri: imageSource2 }} style={styles.image} />
                                        {uploading && (
                                            <View
                                                style={[styles.progressBar, { width: `${2}${progress}%`, marginTop: 10 }]}
                                            />
                                        )}

                                    </View>
                                )}

                            </View>



                        </View>
                        {this.state.isSave ?
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                position: 'absolute',
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
                                                { text: 'No', onPress: () => this.setState({ isSave: false }) },
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


                            : null}



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
    },
    disabledBtn: {
        backgroundColor: 'rgba(3,155,229,0.5)'
    },
    image: {
        marginTop: 20,
        minWidth: 300,
        height: 300,
        resizeMode: 'contain',
        backgroundColor: '#ccc',
    },
    progressBar: {
        // backgroundColor: 'rgb(3, 154, 229)',
        backgroundColor: 'blue',
        height: 5,
        shadowColor: '#000',
    },
    imgBtn: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(3, 154, 229)',
        marginTop: 20,
        alignItems: 'center'
    },

})