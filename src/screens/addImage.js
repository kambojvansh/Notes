import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Alert,
    BackHandler,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
    onTitleChanged,
    colorModalShow,
    textColorChanged,
    addNewNoteWithImage,
    loading
} from "../redux/actions"
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import Loading from "../redux/components/loading"
import ImagePicker from 'react-native-image-crop-picker'
import OptionsMenu from "react-native-options-menu"
import uuid from 'uuid/v4'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../../images/attach.png");

class addImage extends Component {
    state = {
        isImage: true,
        imageSource: '',
        images: ''
    }
    onTitleChanged(text) {
        this.props.onTitleChanged(text)
    }
    onSaveButtonPressed() {
        if (this.props.title == "") {
            alert("Please Add Title")
            return
        }
        // this.props.addNewNote(this.props.title, this.props.note, this.props.textColor)
        this.uploadImage()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        this.props.loading(false)
        if (this.props.title != "") {
            Alert.alert(
                'Back',
                'Are you sure?',
                [
                    { text: 'Yes', onPress: () => Actions.notes() },
                    { text: 'No', onPress: () => console.log('User Back'), style: 'cancel' },
                ],
                {
                    cancelable: true
                }
            );
        }
        Actions.notes()
        return true;
    }

    picFromGallary = () => {
        ImagePicker.openPicker({
            width: screenWidth,
            height: 500,
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
            width: screenWidth,
            height: 500,
            cropping: true,
        }).then(image => {
            this.setState({ imageSource: image.path, isImage: false })
            // console.log(image);
        });
    }

    uploadImage = async () => {

        this.props.loading(true)
        // let progress
        const ext = this.state.imageSource.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        try {
            // await firebase.auth().signOut();
            await firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${filename}`).putFile(this.state.imageSource)

            // console.log("Image done")
            this.geturl(filename)

        }
        catch (error) {
            alert(error)
        }

    }
    geturl(filename) {
        // console.log(this.props)
        let { title, textColor, addNewNoteWithImage } = this.props
        // let = this.props.addNewNoteWithImage()
        firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${filename}`).getDownloadURL().then(function (url) {
            // updateurl(title, url, textColor)
            addNewNoteWithImage(title, url, textColor)
        }).catch((error) => {
            // console.log("Api call error");
            alert(error.message);
            this.props.loading(false)
        });
    }

    // saveNote = (title, url, textColor) => {
    //     this.props.addNewNoteWithImage(title, url, textColor)
    // }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                    <View style={{
                        backgroundColor: '#45a0e6',
                        padding: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                left: 10,
                                position: 'absolute',
                                alignSelf: 'center'
                            }}
                            onPress={() => {
                                if (this.props.title != "") {
                                    Alert.alert(
                                        'Back',
                                        'Are you sure?',
                                        [
                                            { text: 'Yes', onPress: () => Actions.notes() },
                                            { text: 'No', onPress: () => console.log('User Back'), style: 'cancel' },
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    );
                                }
                                Actions.notes()
                            }}
                        >
                            <Image
                                source={require("../../images/backLeft.png")}
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </TouchableOpacity>

                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>Add Notes
                        </Text>
                        <TouchableOpacity
                            style={{
                                right: 20,
                                position: 'absolute',
                                alignSelf: 'center'
                            }}
                            onPress={() => this.onSaveButtonPressed()}
                        >
                            <Image
                                source={require("../../images/save.png")}
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white' }}>
                        <TextInput
                            style={{
                                fontSize: 30,
                                padding: 20,
                                color: this.props.textColor
                            }}
                            placeholder={"Enter image's title"}
                            multiline={true}
                            onChangeText={this.onTitleChanged.bind(this)}
                            value={this.props.title}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10
                        }}
                        >
                            <OptionsMenu
                                button={MoreIcon}
                                buttonStyle={{
                                    width: 30,
                                    height: 30,
                                    // margin: 7.5,
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
                            <Text style={{ fontSize: 20, padding: 10 }}>Add image</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>

                        {this.state.imageSource !== '' && (
                            <View>
                                <Image source={{ uri: this.state.imageSource }} style={{
                                    width: screenWidth,
                                    height: 500
                                }} />
                                <TouchableOpacity
                                    style={{
                                        right: 20,
                                        top: 10,
                                        position: 'absolute',
                                        alignSelf: 'center',
                                        backgroundColor: 'white',
                                        borderRadius: 15
                                    }}
                                    onPress={() => this.setState({ imageSource: '' })}
                                >
                                    <Image
                                        source={require("../../images/colorClose.png")}
                                        style={{
                                            height: 30,
                                            width: 30,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Image
                            source={require("../../images/colorBox.png")}
                            style={{
                                height: 20,
                                width: 20
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                padding: 10
                            }}
                        >Choose color</Text>
                        <TouchableOpacity
                            style={{
                                right: 20,
                                position: 'absolute',
                                alignSelf: 'center'
                            }}
                            onPress={() => this.props.colorModalShow(true)}
                        >
                            <Image
                                source={require("../../images/colorUp.png")}
                                style={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.props.isLoading ? <Loading /> : null}

                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.props.colorModelVisible}>
                        {/* visible={true}> */}
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                            <View style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 10
                            }}>
                                <Image
                                    source={require("../../images/colorBox.png")}
                                    style={{
                                        height: 20,
                                        width: 20
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 20,
                                        padding: 10
                                    }}
                                >Choose color</Text>
                                <TouchableOpacity
                                    style={{
                                        right: 20,
                                        position: 'absolute',
                                        alignSelf: 'center'
                                    }}
                                    onPress={() => this.props.colorModalShow(false)}
                                >
                                    <Image
                                        source={require("../../images/colorClose.png")}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                backgroundColor: 'white',
                                marginTop: 5,
                                flexDirection: 'row'
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.textColorChanged("black")
                                        this.props.colorModalShow(false)
                                    }}
                                    style={[styles.colorButton,
                                    {
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }]}
                                >
                                    <Image
                                        source={require("../../images/save.png")}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff1ac6' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#ff1ac6")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#003cb3' }]}
                                    onPress={() => {
                                        this.props.colorModalShow(false)
                                        this.props.textColorChanged("#003cb3")
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff6600' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#ff6600")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#993399' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#993399")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#00ff99' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#00ff99")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                backgroundColor: 'white',
                                flexDirection: 'row'
                            }}>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ffcc00' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#ffcc00")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#00cc00' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#00cc00")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#66ff99' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#66ff99")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff0066' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#ff0066")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#33ccff' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#33ccff")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff99cc' }]}
                                    onPress={() => {
                                        this.props.textColorChanged("#ff99cc")
                                        this.props.colorModalShow(false)
                                    }}
                                >
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    colorButton: {
        backgroundColor: 'black',
        height: 50,
        width: 50,
        borderRadius: 25,
        margin: 10
    }
})

const mapStateTOProps = state => {
    return {
        isLoading: state.auth.isLoading,
        user: state.auth.user,
        note: state.auth.note,
        title: state.auth.title,
        colorModelVisible: state.auth.colorModelVisible,
        textColor: state.auth.textColor
    }
}

export default connect(mapStateTOProps, {
    addNewNoteWithImage,
    onTitleChanged,
    colorModalShow,
    textColorChanged,
    loading
})(addImage)