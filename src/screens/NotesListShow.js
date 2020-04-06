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
const MoreIcon = require("../../images/moreOption.png")
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { modalShow, deleteNote, updateNotes } from "../redux/actions"

class NotesListShow extends Component {

    constructor() {
        super()
        this.state = {
            topButtoVisible: false,
            downButtoVisible: false
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
        Actions.deshboard()
        return true;
    }
    onDeleteNote = (key) => {
        this.props.deleteNote(key)
    }



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
        // this.unsubscribe = this.getref.onSnapshot(this.getCollection);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

    }
    componentWillUnmount() {
        // this.unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    render() {
        this.getCollection
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss
                // this.setState({ modalVisible: false })

            }
            } accessible={false}
                style={{}}>
                <View style={{
                    flex: 1,
                    width: screenWidth,
                    alignSelf: 'center',
                }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: screenWidth,
                            height: 50
                        }}
                    >
                        <Text
                            style={{ alignSelf: 'center', fontSize: 30 }}
                        >
                            All Notes
                        </Text>
                        <View
                            style={{ position: 'absolute', right: 10 }}
                        >
                            <OptionsMenu
                                button={MoreIcon}
                                buttonStyle={{
                                    width: 20,
                                    height: 30,
                                    margin: 7.5,
                                    resizeMode: "contain"
                                }}
                                destructiveIndex={1}
                                options={["Logout", "Cancel"]}
                                actions={[this.openTwoButtonAlert, null]}
                            />

                        </View>



                    </View>

                    {/* <HearderImage style={{ position: "absolute" }} /> */}
                    {/* <View style={{
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{ color: 'white', alignSelf: 'center' }}
                        >Add new Notes</Text>

                    </View> */}

                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'lightgray' }}>
                        <FlatList
                            // ItemSeparatorComponent={this.ListViewItemSeparator}
                            ref={(ref) => {
                                this.ListView_Ref = ref;
                            }}
                            onEndReached={() => { this.handeldowntab() }}
                            onEndReachedThreshold={0.5}
                            data={this.props.userArr}
                            numColumns={2}
                            renderItem={({ item, index }) =>
                                <Comment
                                    note={item.Notes}


                                    heading={item.notesHeading}
                                    islikeComment={item.isLikes}
                                    // image={item.image !== "" ? "" : "notDone"}
                                    image={item.image}
                                    textColor={item.textColor}
                                    date={

                                        // today = new Date(),
                                        new Date().toDateString() > new Date(item.notesdate).toDateString() ?
                                            new Date(item.notesdate).toDateString() :
                                            this.formatAMPM(new Date(item.notesdate))

                                    }
                                    markNoteAsComplete={() => {
                                        if (item.image !== "") {
                                            return
                                        }
                                        this.props.updateNotes(
                                            item.notesHeading,
                                            item.Notes,
                                            item.textColor,
                                            item.notesdate,
                                            item.key
                                        )
                                    }
                                    }



                                    handelLike={() => {
                                        // console.log(item.date._type.timestamp)
                                        // alert(item.img)
                                    }
                                    }
                                    delete={() => {
                                        this.onDeleteNote(item.key)
                                    }}
                                    next={() => { }}
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
                            visible={this.props.modelVisible}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View>
                                    <TouchableOpacity style={[styles.btn, {
                                        marginBottom: 20,
                                        position: 'absolute',
                                        right: 15,
                                        top: screenHeight / 1.8,
                                    }]}
                                        onPress={() => {
                                            Actions.addLocation()
                                            this.props.modalShow(false)
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={styles.modalText}>Add Loaction</Text>
                                            <View style={styles.imageModel}>
                                                <Image
                                                    style={styles.modalImg}
                                                    source={require('../../images/loaction.png')}
                                                ></Image>

                                            </View>

                                        </View>


                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btn, {
                                        marginBottom: 20,
                                        position: 'absolute',
                                        right: 15,
                                        top: screenHeight / 1.6,
                                    }]}
                                        onPress={() => {
                                            this.props.modalShow(false)
                                            Actions.addImage()
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={styles.modalText}>Add Image</Text>
                                            <View style={styles.imageModel}>
                                                <Image
                                                    style={styles.modalImg}
                                                    source={require('../../images/image.png')}
                                                ></Image>

                                            </View>

                                        </View>


                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btn, {
                                        marginBottom: 20,
                                        position: 'absolute',
                                        right: 15,
                                        top: screenHeight / 1.4,
                                    }]}
                                        onPress={() => {
                                            this.props.modalShow(false)
                                            Actions.addNotes()
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={styles.modalText}>Add Note</Text>
                                            <View style={styles.imageModel}>
                                                <Image
                                                    style={styles.modalImg}
                                                    source={require('../../images/note.png')}
                                                ></Image>

                                            </View>

                                        </View>


                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btn, {
                                        marginBottom: 20,
                                        position: 'absolute',
                                        right: 10,
                                        top: screenHeight / 1.2
                                    }]}
                                        onPress={() => {
                                            this.props.modalShow(false)
                                        }}
                                    >
                                        <Image
                                            style={[styles.img, { height: 60, width: 60, }]}
                                            source={require('../../images/add.png')}
                                        ></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>

                    </View>
                    <TouchableOpacity style={[styles.btn, {
                        marginBottom: 20,
                        position: 'absolute',
                        right: 10,
                        top: screenHeight / 1.2
                    }]}
                        onPress={() => {
                            this.props.modalShow(true)
                            // this.setState({ modalVisible: true })
                            // this.props.navigation.navigate("addNotes",
                            //     {
                            //         userkey: this.state.userArr.key,
                            //     })
                        }}
                    >
                        <Image
                            style={[styles.img, { height: 60, width: 60, }]}
                            source={require('../../images/add.png')}
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
    }

    render() {
        // const likeCount = parseInt(this.props.likes) + parseInt(this.state.likeCount)
        // console.log(this.props.image)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TouchableOpacity

                    // onPress={() => this.props.navigation.navigate("NotesPage")}
                    onPress={() => this.props.next()}
                >
                    <View style={{ margin: 5 }}>
                        {/* <View style={{ backgroundColor: 'red', width: 5 }}></View> */}
                        <View style={styles.commentContainer}>

                            <View
                                style={{ position: 'absolute', right: 5 }}
                            >
                                <OptionsMenu
                                    button={MoreIcon}
                                    buttonStyle={{
                                        width: 15,
                                        height: 20,
                                        margin: 7.5,
                                        resizeMode: "contain"
                                    }}
                                    destructiveIndex={1}
                                    options={["Delete", "Complete"]}
                                    actions={[this.props.delete, this.props.markNoteAsComplete]}
                                />

                            </View>

                            <View style={{
                                backgroundColor: this.props.textColor,
                                width: 8,
                                borderBottomLeftRadius: 10,
                                borderTopLeftRadius: 10,
                            }}></View>
                            <View style={{ paddingRight: 5 }}>
                                <Text
                                    // numberOfLines={2}
                                    style={[styles.text, {
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        color: this.props.textColor
                                    }]}>{this.props.heading}</Text>
                                {this.props.image !== "" && (
                                    <View style={{ alignSelf: 'center', paddingHorizontal: 10 }}>
                                        <Image source={{ uri: this.props.image }} style={{
                                            width: 150,
                                            height: 200,
                                        }} />
                                    </View>
                                )}
                                <Text
                                    // numberOfLines={3}
                                    style={styles.text}>{this.props.note}</Text>
                                {/* <Text
                                    // numberOfLines={3}
                                    style={styles.text}>{this.props.image}</Text> */}
                                <Text
                                    // numberOfLines={1}
                                    style={[styles.text, { color: 'gray' }]}>{this.props.date}</Text>

                            </View>
                            {/* <View style={{ position: 'absolute', bottom: 10, left: screenWidth / 20 }}> */}
                            {/* <View style={styles.text}>

                                <Text
                                    // numberOfLines={1}
                                    style={{ color: 'gray' }}>{this.props.date}</Text>

                            </View> */}




                        </View>

                    </View>
                </TouchableOpacity>
            </TouchableWithoutFeedback >
        )

    }
}



const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        // alignSelf: 'center',
        // paddingHorizontal: 5,
        // height: screenHeight / 4,
        width: screenWidth / 2.1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 5,
        // borderColor: 'gray',
        // borderWidth: 0.5,
        flexDirection: 'row'
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
        marginVertical: 10,
        alignSelf: 'flex-start',
        marginLeft: screenWidth / 30,
        marginRight: 2
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
    modalText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 10
    },
    modalImg: {
        height: 20,
        width: 20,
        // resizeMode: 'contain',
    },
    imageModel: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    }

})
const mapStateTOProps = state => {
    // console.log(state)
    return {
        isLoading: state.auth.isLoading,
        user: state.auth.user,
        userArr: state.auth.userArr,
        modelVisible: state.auth.ModelVisible
    }
}

export default connect(mapStateTOProps, {
    modalShow,
    deleteNote,
    updateNotes
})(NotesListShow)

