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
} from 'react-native';
import firebase from 'react-native-firebase'
// import CardView from 'react-native-cardview'
// import { Card } from 'react-native-shadow-cards';

export default class NotesList extends Component {

    constructor() {
        super()
        this.ref = firebase.firestore().collection(firebase.auth().currentUser.uid)
        this.del = firebase.firestore().collection(firebase.auth().currentUser.uid)
        this.unsubscribe = null;
        this.likestatus = true
        this.state = {
            textInput: "",
            modalVisible: false,
            DeleteModalVisible: false,
            islikeComment: false,
            comment: "",
            islike: false,
            userArr: [],
            arr: [],
            Notes: '',
            isLikes: '',
            key: '',

        }
    }


    addcomment = (text, like) => {

        if (text == "") {
            return
        }
        this.addPost(like)

    }
    DeleteElement = (index) => {

        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.state.key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            this.setState({ DeleteModalVisible: false })
        })
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    deleteUser(key) {

        const dbRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(this.state.key)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
        })
    }

    openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
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
    deletItem = ''
    addPost = (likeStatus) => {
        this.likestatus = likeStatus
        this.ref.add({
            Notes: this.state.textInput,
            isLikes: this.likestatus,
        });
        this.setState({ textInput: '', modalVisible: false })
    }

    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { Notes, isLikes } = res.data();
            userArr.push({
                key: res.id,
                res,
                Notes,
                isLikes,
            });
        });
        this.setState({
            userArr,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.getCollection);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        this.getCollection
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


                <View style={{ flex: 1 }}>
                    {/* <HearderImage style={{ position: "absolute" }} /> */}
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.userArr}
                            // numColumns={2}
                            renderItem={({ item, index }) =>
                                <Comment
                                    note={item.Notes}
                                    likes={item.likes}
                                    islikeComment={item.isLikes}
                                    handelLike={() => {
                                    }
                                    }
                                    delete={() => {


                                        this.setState({ DeleteModalVisible: true, key: item.key })
                                    }}
                                    next={(likes) => this.props.navigation.navigate("Display",
                                        {
                                            commentPass: item.Notes,
                                            userkey: item.key,
                                            like: item.isLikes
                                        })}
                                />}
                            keyExtractor={(index, item) => index + item}
                        >
                        </FlatList>


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
                                                onPress={() => this.setState(this.DeleteElement(this.deletItem))}
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



                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                        >
                            <View style={[{ alignSelf: 'center', position: 'absolute', bottom: 25 }]}>
                                <View style={[styles.commentContainer, styles.model
                                ]}>
                                    <View style={{ width: 250 }}>
                                        <TextInput
                                            style={styles.inputtext}
                                            onChangeText={text => this.setState({ textInput: text })}
                                            placeholder={"Enter comment Here"}
                                            placeholderTextColor="#fff"
                                            value={this.state.textInput}
                                        />
                                        {/* style={styles.inputtext} */}
                                    </View>
                                    {/* <View style={[styles.commentContainer]}> */}

                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => {

                                            this.addcomment(this.state.textInput, this.state.islikeComment)
                                        }}
                                    >
                                        <Image
                                            style={[styles.img, {}]}
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
                                            style={styles.img}
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
                                            style={[styles.img, {}]}
                                            source={require('../images/down.png')}
                                        ></Image>
                                    </TouchableOpacity>

                                    {/* </View> */}




                                </View>
                            </View>
                            {/* </TouchableWithoutFeedback> */}
                        </Modal>
                    </View>
                    <TouchableOpacity style={[styles.btn, { marginBottom: 20 }]}
                        onPress={() => {
                            // alert("skdnskn")
                            this.setState({ modalVisible: true })
                        }}
                    >
                        <Image
                            style={[styles.img, { height: 50, width: 50, }]}
                            source={require('../images/add.png')}
                        ></Image>
                    </TouchableOpacity>


                </View >
            </TouchableWithoutFeedback>


        )
    }
}

export class Comment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const likeCount = parseInt(this.props.likes) + parseInt(this.state.likeCount)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TouchableOpacity

                    // onPress={() => this.props.navigation.navigate("NotesPage")}
                    onPress={() => this.props.next()}
                >
                    <View style={{ margin: 10 }}>
                        <View style={styles.commentContainer}>
                            <View style={{ flex: 4 }}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.text}>{this.props.note}</Text>

                            </View>
                            <View style={[styles.commentContainer, { flex: 1 }]}>
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
                                <TouchableOpacity style={styles.btn}
                                    onPress={() => this.props.delete()}
                                >
                                    <Image
                                        style={styles.img}
                                        source={require('../images/deletBox.png')}
                                    ></Image>
                                </TouchableOpacity>

                            </View>



                        </View>

                    </View>
                </TouchableOpacity>
            </TouchableWithoutFeedback>
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
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 70
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10
    },
    img: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    btn: {
        marginHorizontal: 2

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
    }

})

