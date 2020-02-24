import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native';

export default class NotesList extends Component {

    constructor() {
        super()
        this.states = {
            text: "",
            arr: [
                { comment: "komal" },
                { comment: "vansh" },
                { comment: "shivam" },
                { comment: "mohit" }
            ],

        }
    }


    addcomment = (text) => {
        if (this.textInput == "") {
            return
        }
        this.textInput = ""
        return {
            arr: this.states.arr.push({ comment: text })
        }

    }
    DeleteElement = (index) => {
        return {
            arr: this.states.arr.splice(index, 1)
        }
    }

    // textHander = (text) => {
    //     // this.setState({ textInput: "vanshhhhh" })
    //     return {
    //         textInput: "snknkknn"
    //     }
    // }

    textInput = ""

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.states.arr}
                        renderItem={({ item, index }) =>
                            <Comment
                                comment={item.comment}
                                delete={() => this.setState(this.DeleteElement(index))}
                                next={() => this.props.navigation.navigate("Display", { commentPass: "vansh" })}
                            />}
                        keyExtractor={(index, item) => index + item}
                    >
                    </FlatList>

                </View>

                {/*for add new comment  */}

                <View>
                    <Text>{this.states.textInput}</Text>
                    <View style={{ margin: 10 }}>
                        <View style={styles.commentContainer}>
                            <View style={{ flex: 4 }}>
                                <TextInput
                                    onChangeText={(value) => { this.textInput = value }}
                                    placeholder={"Enter Your Comment Here"}
                                    style={styles.inputtext}
                                >

                                </TextInput>

                            </View>
                            <View style={[styles.commentContainer, { flex: 1 }]}>

                                <TouchableOpacity style={styles.btn}
                                    onPress={() => {
                                        this.setState(states => this.addcomment(this.textInput)
                                        )
                                    }}
                                >
                                    <Image
                                        style={styles.img}
                                        source={require('../images/add.png')}
                                    ></Image>
                                </TouchableOpacity>

                            </View>



                        </View>
                    </View>
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
        islike: 1
    }

    handelLike = (state) => {
        if (this.state.islike) {
            return {
                IconImg: require("../images/likeRed.png"),
                islike: 0,
            }
        }
        else {
            return {
                IconImg: require("../images/like.png"),
                islike: 1
            }

        }
    }
    render() {
        return (
            <TouchableOpacity

                // onPress={() => this.props.navigation.navigate("NotesPage")}
                onPress={() => this.props.next()}
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
                                    this.setState(state => this.handelLike(state))
                                    // this.props.Change()

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
                </View>
            </TouchableOpacity>
        )

    }
}
const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
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
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    btn: {
        marginHorizontal: 10

    },
    inputtext: {
        borderWidth: 1,
        borderBottomColor: '#3498db',
        borderColor: "white",
        margin: 10
    }

})

