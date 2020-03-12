import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Alert,
    BackHandler,
} from 'react-native';
import firebase from 'react-native-firebase'
import OptionsMenu from "react-native-options-menu"
// import CardView from 'react-native-cardview'
// import { Card } from 'react-native-shadow-cards';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../images/options.png");

export default class NotesList extends Component {

    constructor() {
        super()
        // this.time = firebase.firestore.FieldPath('time')
        this.ref = firebase.firestore().collection(firebase.auth().currentUser.uid)
        this.getref = firebase.firestore().collection(firebase.auth().currentUser.uid).orderBy("notesdate", "desc")
        // this.del = firebase.firestore().collection(firebase.auth().currentUser.uid)
        this.unsubscribe = null;
        this.likestatus = true
        this.state = {
            textInput: "",
            modalVisible: false,
            DeleteModalVisible: false,
            downModalVisible: false,
            topButtoVisible: false,
            islikeComment: false,
            comment: "",
            islike: false,
            userArr: [],
            arr: [],
            Notes: '',
            isLikes: '',
            key: '',
            imageSource: '',
            image: '',
            images: [],
            downButtoVisible: false

        }
    }


    addComment = (text, like) => {

        if (text == "") {
            return
        }
        this.addPost(like)

    }

    // deleteElement = (index) => {

    //     const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.state.key)
    //     dbRef.delete().then((res) => {
    //         console.log('Item removed from database')
    //         this.setState({ DeleteModalVisible: false })
    //     })
    // }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    // deleteUser() {
    //     const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.state.key)
    //     dbRef.delete().then((res) => {
    //         console.log('Item removed from database')
    //     })
    // }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            this.setState({ ModalVisible: false }, () => {
                this.props.navigation.navigate('LoginPage')
            })
            // alert("Logout")
        } catch (e) {
            // console.log(e);
            this.setState({ error: e })
            alert(this.state.e)
        }
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Logout User',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => this.signOutUser() },
                { text: 'No', onPress: () => console.log('User not signout'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    deletItem = ''
    addPost = (likeStatus) => {
        this.likestatus = likeStatus
        this.ref.add({
            Notes: this.state.textInput,
            isLikes: this.likestatus,
            notesdate: new Date().getTime()
        });
        this.setState({ textInput: '', modalVisible: false })
    }

    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { Notes, isLikes, notesHeading, notesdate, img } = res.data();
            // const date = res.data().notesdate.Timestamp.toDate()
            userArr.push({
                key: res.id,
                res,
                Notes,
                isLikes,
                notesHeading,
                notesdate,
                img
            });
            // console.log(userArr)
        });
        this.setState({
            userArr,
            isLoading: false,
            // image: this.state.userArr.img
        });
    }

    //for flat list
    handeldowntab = () => {
        this.setState({ topButtoVisible: false, downButtoVisible: true })
    }
    upButtonHandler = () => {
        this.ListView_Ref.scrollToOffset({ offset: 0, animated: true });
        this.setState({ topButtoVisible: true, downButtoVisible: false })
    };

    downButtonHandler = () => {
        this.ListView_Ref.scrollToEnd({ animated: true });
        this.setState({ topButtoVisible: false, downButtoVisible: true })
    };
    onBackPress = () => {
        // alert("ksksnckn")
        Alert.alert(
            'Exit',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
                { text: 'No', onPress: () => console.log('User not exit'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
        return true;
    }
    // handelDate() {
    //     return new Date(item.notesdate).toDateString()

    // }
    // getImage = async (img) => {
    //     // console.log(img)
    //     // alert(this.state.image)
    //     if (img === "")
    //         return
    //     const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${img}`);
    //     try {
    //         // console.log("nkcnckn")
    //         let url = await imgRef.getDownloadURL()

    //         this.setState({ imageSource: url })

    //     }
    //     catch (arr) {
    //         // alert(arr)
    //         console.log(arr)

    //     }

    // }

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    componentDidMount() {
        this.unsubscribe = this.getref.onSnapshot(this.getCollection);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    }
    componentWillUnmount() {
        this.unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    image = []
    render() {
        this.getCollection
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss
                this.setState({ modalVisible: false })

            }
            } accessible={false}
                style={{}}>
                <View style={{
                    flex: 1,
                    width: screenWidth,
                    alignSelf: 'center',
                    backgroundColor: 'black',
                }}>
                    <View
                        style={{
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: screenWidth
                        }}
                    >
                        <Text
                            style={{ color: 'white', alignSelf: 'center', fontSize: 40 }}
                        >
                            All Notes
                        </Text>
                        <View
                            style={{ position: 'absolute', right: 10 }}
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
                                options={["Logout", "Cancel"]}
                                actions={[this.openTwoButtonAlert, null]}
                            />

                        </View>



                    </View>

                    {/* <HearderImage style={{ position: "absolute" }} /> */}
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{ color: 'white', alignSelf: 'center' }}
                        >Add new Notes</Text>

                    </View>

                    <View style={{ flex: 1 }}>
                        <FlatList
                            // ItemSeparatorComponent={this.ListViewItemSeparator}
                            ref={(ref) => {
                                this.ListView_Ref = ref;
                            }}
                            onEndReached={() => { this.handeldowntab() }}
                            onEndReachedThreshold={0.5}
                            data={this.state.userArr}
                            // numColumns={2}
                            renderItem={({ item, index }) =>
                                <Comment
                                    note={item.Notes}
                                    // getImage={
                                    // // () => {

                                    // async () => {
                                    //     // console.log(img)
                                    //     // alert(this.state.image)
                                    //     if (item.img === "")
                                    //         return
                                    //     const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${item.img}`);
                                    //     try {
                                    //         // console.log("nkcnckn")
                                    //         let url = await imgRef.getDownloadURL()


                                    //         this.setState({ imageSource: url })
                                    //         // return url
                                    //         this.image.push(url)
                                    //         this.setState({ images: this.image })

                                    //     }
                                    //     catch (arr) {
                                    //         // alert(arr)
                                    //         console.log(arr)

                                    //     }
                                    //     // return image
                                    // }
                                    // alert(item.Notes)
                                    // this.setState({ image: item.img })
                                    // this.getImage(item.img)
                                    // alert(this.state.image)
                                    // }
                                    // }
                                    // likes={item.likes}
                                    heading={item.notesHeading}
                                    islikeComment={item.isLikes}
                                    date={

                                        // today = new Date(),
                                        new Date().toDateString() > new Date(item.notesdate).toDateString() ?
                                            new Date(item.notesdate).toDateString() :
                                            this.formatAMPM(new Date(item.notesdate))
                                        // new Date(item.notesdate).toTimeString()
                                        // new Date(item.notesdate).getHours() + ":" + new Date(item.notesdate).getMinutes() + ":" + new Date(item.notesdate).getSeconds()
                                        // if(){
                                        //     new Date(item.notesdate).toDateString()

                                        // }

                                    }
                                    // imageSource={item.img}
                                    // url={this.state.images[index]}
                                    // url={async () => {
                                    //     // console.log(img)
                                    //     // alert(this.state.image)
                                    //     if (item.img === "")
                                    //         return
                                    //     const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${item.img}`);
                                    //     try {
                                    //         // console.log("nkcnckn")
                                    //         let url = await imgRef.getDownloadURL()

                                    //         // this.setState({ imageSource: url })
                                    //         return url
                                    //         // this.image = url

                                    //     }
                                    //     catch (arr) {
                                    //         // alert(arr)
                                    //         console.log(arr)

                                    //     }
                                    //     return image
                                    // }}
                                    // url={"https://firebasestorage.googleapis.com/" +
                                    //     "v0/b/notesapp-88de4.appspot.com/o/" +
                                    //     "Notes%2FImages%2" +
                                    //     "FNptMWtxMKbMDWwU5F01PSB3WSkg1" +
                                    //     "%2" + item.img +
                                    //     "?alt=media&token=0cb27bcd-b206-49d6-9a7b-3298edd90c8d"}

                                    handelLike={() => {
                                        // console.log(item.date._type.timestamp)
                                        // alert(item.img)
                                    }
                                    }
                                    delete={() => {


                                        this.setState({ DeleteModalVisible: true, key: item.key })
                                    }}
                                    next={(likes) => this.props.navigation.navigate("Display",
                                        {
                                            commentPass: item.Notes,
                                            userkey: item.key,
                                            like: item.isLikes,
                                            heading: item.notesHeading,
                                            image: item.img
                                        })}
                                />}
                            keyExtractor={(index, item) => index + item}
                        >
                        </FlatList>
                        {/* <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.downModalVisible}> */}
                        {/* {this.state.downModalVisible ? */}
                        {this.state.topButtoVisible && (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.downButtonHandler}
                                style={styles.downButton}>
                                <Image
                                    source={{
                                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png',
                                    }}
                                    style={styles.downButtonImage}

                                />
                            </TouchableOpacity>
                        )}

                        {/* : null} */}
                        {/* {this.state.topModalVisible ? */}
                        {this.state.downButtoVisible && (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={this.upButtonHandler}
                                style={styles.upButton}>
                                <Image
                                    source={{
                                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_up.png',
                                    }}
                                    style={styles.upButtonImage}
                                />
                            </TouchableOpacity>)}

                        {/* </Modal> */}

                        {/*  */}


                    </View>



                    {/*for add new comment  */}

                    <View>


                        {/* model for delete comment */}

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.DeleteModalVisible}>

                            <View style={{ marginHorizontal: 30, marginTop: 200, }}>
                                <View style={styles.model}>
                                    <View style={styles.model}>
                                        <Text style={styles.modelText}>Delete</Text>
                                        <Text style={styles.modelText2}>
                                            Are You Wants to Delete This Comment
                                            </Text>
                                        <View style={
                                            { flexDirection: 'row', paddingHorizontal: 50, marginVertical: 10 }
                                        }>
                                            <TouchableOpacity

                                                onPress={() => this.setState({ DeleteModalVisible: false })}
                                            >
                                                <Text style={{ color: 'gray', fontSize: 25, fontWeight: 'bold' }}>
                                                    Cancel
                                                    </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ position: 'absolute', right: 30 }}
                                                onPress={() => this.setState(this.deleteElement(this.deletItem))}
                                            >
                                                <Text style={{ color: 'lightgreen', fontSize: 25, fontWeight: 'bold' }}>
                                                    Delete
                                                    </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>

                            </View>

                        </Modal>

                        <TouchableWithoutFeedback onPress={() => {
                            Keyboard.dismiss
                            this.setState({ modalVisible: false })

                        }
                        } accessible={false}
                            style={{}}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                            >
                                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                    <View style={[{ alignSelf: 'center', position: 'absolute', bottom: 25 }]}>
                                        <View style={[styles.modal, styles.model
                                        ]}>
                                            <View style={{ width: 250 }}>
                                                <TextInput
                                                    style={styles.inputtext}
                                                    onChangeText={text => this.setState({ textInput: text })}
                                                    placeholder={"Enter Your Notes Here"}
                                                    placeholderTextColor="#fff"
                                                    value={this.state.textInput}
                                                />
                                                {/* style={styles.inputtext} */}
                                            </View>
                                            {/* <View style={[styles.commentContainer]}> */}

                                            <TouchableOpacity style={styles.btn}
                                                onPress={() => {

                                                    this.addComment(this.state.textInput, this.state.islikeComment)
                                                }}
                                            >
                                                <Image
                                                    style={[styles.imgModel, {}]}
                                                    source={require('../images/add.png')}
                                                ></Image>
                                            </TouchableOpacity>
                                            {/* For Like Button*/}
                                            <TouchableOpacity style={styles.btn}
                                                onPress={() => {
                                                    if (this.state.islikeComment) {
                                                        this.setState({ islikeComment: false })
                                                    }
                                                    else {
                                                        this.setState({ islikeComment: true })
                                                    }
                                                }
                                                }
                                            >
                                                <Image
                                                    style={styles.imgModel}
                                                    source={this.state.islikeComment ? require('../images/isstar.png') : require('../images/star.png')}
                                                ></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btn}
                                                onPress={() => {
                                                    this.setState({ modalVisible: false })
                                                    // )
                                                }}
                                            >
                                                <Image
                                                    style={[styles.imgModel, {}]}
                                                    source={require('../images/down.png')}
                                                ></Image>
                                            </TouchableOpacity>

                                            {/* </View> */}
                                        </View>
                                    </View>
                                </View>

                                {/* </TouchableWithoutFeedback> */}
                            </Modal>
                        </TouchableWithoutFeedback>

                    </View>
                    <TouchableOpacity style={[styles.btn, {
                        marginBottom: 20,
                        position: 'absolute',
                        right: 10,
                        bottom: 10
                    }]}
                        onPress={() => {
                            // alert("skdnskn")
                            // this.setState({ modalVisible: true })
                            this.props.navigation.navigate("addNotes",
                                {
                                    userkey: this.state.userArr.key,
                                })
                        }}
                    >
                        <Image
                            style={[styles.img, { height: 60, width: 60, }]}
                            source={require('../images/add.png')}
                        ></Image>
                    </TouchableOpacity>


                </View >
            </TouchableWithoutFeedback >


        )
    }
}

export class Comment extends Component {
    constructor(props) {
        super(props)
        // this.props.getImage()
        // async () => {
        //     // console.log(img)
        //     // alert(this.state.image)
        //     if (item.img === "")
        //         return
        //     const imgRef = firebase.storage().ref(`Notes/Images/${firebase.auth().currentUser.uid}/${this.props.imageSource}`);
        //     try {
        //         // console.log("nkcnckn")
        //         let url = await imgRef.getDownloadURL()

        //         this.setState({ imageSource: url })
        //         // return url
        //         this.image = url
        //     }
        //     catch (arr) {
        //         // alert(arr)
        //         console.log(arr)

        //     }
        //     // return image
        // }
    }

    render() {
        // const likeCount = parseInt(this.props.likes) + parseInt(this.state.likeCount)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TouchableOpacity

                    // onPress={() => this.props.navigation.navigate("NotesPage")}
                    onPress={() => this.props.next()}
                >
                    <View style={{ margin: 5 }}>
                        <View style={styles.commentContainer}>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity style={styles.btn}
                                    onPress={() => {

                                        this.props.handelLike()
                                    }
                                    }
                                >
                                    <Image
                                        style={styles.img}
                                        source={this.props.islikeComment ? require('../images/isstar.png') : require('../images/star.png')}
                                    ></Image>
                                </TouchableOpacity>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text
                                    // numberOfLines={1}
                                    style={[styles.text, { fontWeight: 'bold', fontSize: 18 }]}>{this.props.heading}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={styles.text}>{this.props.note}</Text>


                            </View>
                            <View style={{ position: 'absolute', bottom: 10, left: screenWidth / 10 }}>
                                <Text
                                    // numberOfLines={1}
                                    style={{ color: 'gray' }}>{this.props.date}</Text>

                            </View>
                            {/* {this.props.imageSource !== '' && (
                                // () => {
                                // },
                                <View
                                    style={{
                                        position: 'absolute',
                                        height: screenHeight / 7,
                                        right: 20,
                                        justifyContent: 'center'
                                    }}

                                > */}
                            {/* {alert(this.props.imageSource)} */}
                            {/* <Image source={{ uri: this.props.url }}
                                        style={{
                                            backgroundColor: 'lightgray',
                                            height: 90,
                                            width: 90,
                                            resizeMode: 'contain',
                                        }} />
                                    {uploading && (
                                        <View
                                            style={[styles.progressBar, { width: `${2}${progress}%`, marginTop: 10 }]}
                                        />
                                    )}

                                </View>
                            )} */}



                        </View>

                    </View>
                </TouchableOpacity>
            </TouchableWithoutFeedback >
        )

    }
}


const HearderImage = () => {
    return (
        <View style={{ flexDirection: 'row', }}>
            <Image
                source={require('../images/add.png')}

                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    marginLeft: 15,
                }}>

            </Image>

        </View>

    )


}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingHorizontal: 5,
        height: screenHeight / 6,
        width: screenWidth,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 10
    },
    modal: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 70
    },
    text: {
        // marginHorizontal: 10,
        alignSelf: 'flex-start',
        marginLeft: screenWidth / 10
    },
    img: {
        height: 20,
        width: 20,
        alignSelf: 'flex-start'
    },
    imgModel: {
        height: 40,
        width: 40,
        alignSelf: 'flex-start'
    },
    btn: {
        marginHorizontal: 2,
        // height: 10,
        // width: 10

    },
    inputtext: {
        borderBottomColor: 'white',
        borderWidth: 0.5,
        borderColor: '#3498db',
        margin: 10,
        color: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // textAlign: 'center'
        fontSize: 20,
        paddingHorizontal: 10
    },
    model: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#3498db'
    },
    deleteModel: {
        backgroundColor: "#3498db",
        borderRadius: 50
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
    upButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 20,
    },
    upButtonImage: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
    },
    downButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: 20,
    },
    downButtonImage: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
    },

})

