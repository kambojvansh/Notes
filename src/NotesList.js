import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Modal
} from 'react-native';

export default class NotesList extends Component {

    // static navigationOptions =
    //     {
    //         title: 'MainActivity',

    //         // headerRight: <hearderImage />,
    //         headerStyle: {

    //             backgroundColor: '#FF9800'

    //         },

    //         headerTintColor: '0000000',

    //     };

    constructor() {
        super()
        this.state = {
            textInput: "",
            modalVisible: false,
            arr: [
                {
                    comment: "komal",
                    likes: 25
                },
                {
                    comment: "vansh",
                    likes: 2
                },
                {
                    comment: "shivam",
                    likes: 252
                },
                {
                    comment: "suraj",
                    likes: 854
                },
                {
                    comment: "mohit",
                    likes: 425
                },
            ],

        }
    }


    addcomment = (text) => {

        if (text == "") {
            return
        }
        let newarray = this.state.arr
        newarray.push({ comment: text, likes: 422 })
        return {
            arr: newarray,
            textInput: "",
            modalVisible: false,
        }

    }
    DeleteElement = (index) => {
        let newarray = this.state.arr
        newarray.splice(index, 1)
        return {
            arr: newarray
        }
    }
    // textInput = (value) => {
    //     return {
    //         text: "bxjs"
    //     }

    // }


    // textInput = ""

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.arr}
                        renderItem={({ item, index }) =>
                            <Comment
                                comment={item.comment}
                                likes={item.likes}
                                delete={() => this.setState(this.DeleteElement(index))}
                                next={(likes) => this.props.navigation.navigate("Display", { commentPass: item.comment })}
                            />}
                        keyExtractor={(index, item) => index + item}
                    >
                    </FlatList>

                </View>

                {/*for add new comment  */}

                <View >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    // onRequestClose={() => {
                    //     Alert.alert('Modal has been closed.');
                    // }}
                    >


                        <View style={{ alignSelf: 'center', position: 'absolute', bottom: 15 }}>
                            <View style={[styles.commentContainer
                            ]}>
                                <View style={{ width: 250 }}>
                                    <TextInput
                                        style={styles.inputtext}
                                        onChangeText={text => this.setState({ textInput: text })}
                                        placeholder={"Enter comment Here"}
                                        value={this.state.textInput}
                                    />
                                    {/* style={styles.inputtext} */}
                                </View>
                                <View style={[styles.commentContainer]}>

                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => {
                                            this.setState(state => this.addcomment(this.state.textInput)
                                            )
                                        }}
                                    >
                                        <Image
                                            style={[styles.img, {}]}
                                            source={require('../images/add.png')}
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

                                </View>



                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={[styles.btn, { marginBottom: 20 }]}
                        onPress={() => {
                            // alert("skdnskn")
                            this.setState({ modalVisible: true })
                        }}
                    >
                        <Image
                            style={[styles.img, { height: 50, width: 50 }]}
                            source={require('../images/add.png')}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View >

        )
    }
}

export class Comment extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        IconImg: require("../images/like.png"),
        islike: 1,
        likeCount: 0
    }



    handelLike = (state) => {
        // const ee = like()
        if (this.state.islike) {
            return {
                IconImg: require("../images/likeRed.png"),
                islike: 0,
                likeCount: this.state.likeCount + 1
            }
        }
        else {
            return {
                IconImg: require("../images/like.png"),
                islike: 1,
                likeCount: this.state.likeCount - 1
            }

        }
    }
    render() {
        const likeCount = parseInt(this.props.likes) + parseInt(this.state.likeCount)
        return (
            <TouchableOpacity

                // onPress={() => this.props.navigation.navigate("NotesPage")}
                onPress={() => this.props.next(this.state.likeCount)}
            >
                <View style={{ margin: 10 }}>
                    <View style={styles.commentContainer}>
                        <View style={{ flex: 4 }}>
                            <Text
                                numberOfLines={1}
                                style={styles.text}>{this.props.comment}</Text>

                        </View>
                        <View style={[styles.commentContainer, { flex: 1 }]}>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => {
                                    this.setState(stateForLike => this.handelLike(stateForLike))
                                    // this.props.Change()
                                    // this.props.setImage()
                                }
                                }
                            >
                                <Image
                                    style={styles.img}
                                    source={this.state.IconImg}
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
                    <View>
                        <Text>Tota Likes <Text style={{ fontWeight: 'bold' }}>

                            {likeCount}
                        </Text></Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
}

// export class hearderImage extends React.Component {
//     render() {
//         return (
//             <View style={{ flexDirection: 'row', }}>
//                 <Image
//                     source={require('../images/add.png')}
//                 >
//                     style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 40 / 2,
//                         marginLeft: 15,
//                     }}

//                 </Image>

//             </View>

//         )

//     }


// }

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
        borderWidth: 1,
        borderBottomColor: '#3498db',
        borderColor: "white",
        margin: 10
    },

})

