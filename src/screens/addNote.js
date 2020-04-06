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
    onNoteChanged,
    onTitleChanged,
    addNewNote,
    colorModalShow,
    textColorChanged
} from "../redux/actions"
import { connect } from 'react-redux'
import Loading from "../redux/components/loading"
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class addNote extends Component {
    onNoteChanged(text) {
        this.props.onNoteChanged(text)
    }
    onTitleChanged(text) {
        this.props.onTitleChanged(text)
    }
    onSaveButtonPressed() {
        if (this.props.title == "" && this.props.note == "")
            return
        else if (this.props.title == "") {
            alert("Please Add Title")
            return
        }
        else if (this.props.note == "") {
            alert("Please Add Note")
            return
        }
        this.props.addNewNote(this.props.title, this.props.note, this.props.textColor)
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    onBackPress = () => {
        if (this.props.title != "" && this.props.note != "") {
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
                                if (this.props.title != "" && this.props.note != "") {
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
                            placeholder={"Enter note's title"}
                            multiline={true}
                            onChangeText={this.onTitleChanged.bind(this)}
                            value={this.props.title}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TextInput
                            style={{
                                width: screenWidth,
                                fontSize: 18,
                                padding: 20,
                                alignSelf: 'flex-start'
                            }}
                            placeholder={"Enter description...."}
                            multiline={true}
                            onChangeText={this.onNoteChanged.bind(this)}
                            value={this.props.note}
                        />
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
    // console.log(state)
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
    onNoteChanged,
    onTitleChanged,
    addNewNote,
    colorModalShow,
    textColorChanged
})(addNote)