import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
    BackHandler,
} from 'react-native'
import OptionsMenu from "react-native-options-menu"
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import {
    signOut,
    getNotes,
    countOfNotes,
    countOfNotesCompleted,
    countOfNotesNotCompleted
} from "../redux/actions"
import Loading from "../redux/components/loading"
import { Actions } from 'react-native-router-flux'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../../images/moreOption.png");


class Deshboard extends Component {

    constructor() {
        super()
        // this.id = firebase.auth().currentUser.uid !== "" ? firebase.currentUser.uid : this.props.userArr.id
        this.getref = firebase.firestore().collection(firebase.auth().currentUser.uid).orderBy("notesdate", "desc")
    }
    componentDidMount() {
        this.unsubscribe = this.getref.onSnapshot(this.props.getNotes)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        this.unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    logOutUser = () => {
        Alert.alert(
            'Logout User',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => this.props.signOut() },
                { text: 'No', onPress: () => console.log('User not signout'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    // getCount() {
    //     // let key, count = 0
    //     let Complete, completeNote = 0
    //     for (Complete == true in this.props.userArr) {
    //         if (this.props.userArr.hasOwnProperty(isLikes)) {
    //             completeNote++
    //         }
    //     }
    //     return count
    // }
    onBackPress = () => {
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
    render() {
        let { userArr } = this.props
        this.props.countOfNotes(userArr)
        this.props.countOfNotesCompleted(userArr)
        this.props.countOfNotesNotCompleted(userArr)
        return (

            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                {/* for top option bar */}



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
                        style={{ alignSelf: 'center', fontSize: 25 }}
                    >
                        Deshboard
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
                                resizeMode: "contain",
                                // position: 'absolute',
                                // alignSelf: 'center',
                                // left: 70
                            }}
                            destructiveIndex={1}
                            options={["Logout"]}
                            actions={[this.logOutUser]}
                        />

                    </View>
                </View>



                <View style={{ flex: 3, backgroundColor: 'white', marginTop: 2 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={[styles.cards, { backgroundColor: '#45a0e6' }]}>
                            <Image
                                source={require("../../images/pending.png")}
                                style={styles.imageicon}
                            />
                            <Text style={styles.cardText}>Pending</Text>
                            <Text style={[styles.cardText, { fontSize: 10, marginBottom: 10 }]}>{this.props.notComplete} Notes</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cards}>
                            <Image
                                source={require("../../images/done.png")}
                                style={styles.imageicon}
                            />
                            <Text style={styles.cardText}>Completed</Text>
                            <Text style={[styles.cardText, { fontSize: 10, marginBottom: 10 }]}>{this.props.complete} Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cards, { backgroundColor: '#743fb5' }]}
                            onPress={() => Actions.notes()}
                        >
                            <Image
                                source={require("../../images/all.png")}
                                style={styles.imageicon}
                            />
                            <Text style={styles.cardText}>All Notes</Text>
                            <Text style={[styles.cardText, { fontSize: 10, marginBottom: 10 }]}>{this.props.count} Notes</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        margin: 10
                    }}>Notes Progress</Text>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: 2,
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        marginRight: 1,
                        justifyContent: 'center'
                    }}>
                        <View
                            style={{ marginLeft: 30, padding: 10, marginBottom: 10 }}
                        >
                            <TouchableOpacity
                                onPress={() => Actions.notes()}
                            >
                                <Text
                                    style={{ fontSize: 40 }}
                                >{this.props.count}</Text>
                                <Text
                                    style={{ color: 'gray' }}
                                >TOTAL NOTES</Text>

                            </TouchableOpacity>


                        </View>


                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        marginLeft: 1,
                        justifyContent: 'center',
                    }}>
                        <View
                            style={{ marginLeft: 30, padding: 10, marginBottom: 10 }}
                        >
                            <Text
                                style={{ fontSize: 40 }}
                            >{this.props.complete}</Text>
                            <Text
                                style={{ color: 'gray' }}
                            >COMPLETED NOTES</Text>

                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 5,
                    backgroundColor: 'white',
                    marginTop: 2,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        <Text
                            style={{
                                color: '#45a0e6',
                                marginLeft: 20,
                                marginBottom: 5
                            }}
                        >Pending Notes</Text>
                        <View style={styles.progressBorder}>
                            <View style={[styles.progressBar, {
                                backgroundColor: '#45a0e6',
                                width: `${parseInt(this.props.notComplete / this.props.count * 100)}%`
                            }]}>
                            </View>
                            <Text style={[styles.progressCount, { color: '#45a0e6' }]}>
                                {this.props.count !== 0 ?
                                    parseInt(this.props.notComplete / this.props.count * 100) :
                                    0
                                }%

                            </Text>

                        </View>

                    </View>
                    <View>
                        <Text
                            style={{
                                color: '#b52c09',
                                marginLeft: 20,
                                marginTop: 30,
                                marginBottom: 5
                            }}
                        >Completed Notes</Text>
                        <View style={styles.progressBorder}>
                            <View style={[styles.progressBar, , {
                                backgroundColor: '#b52c09',
                                width: `${parseInt(this.props.complete / this.props.count * 100)}%`
                            }]}>
                            </View>
                            <Text style={[styles.progressCount, { color: '#b52c09' }]}>
                                {/* {parseInt(this.props.complete / this.props.count * 100)}% */}
                                {this.props.count !== 0 ?
                                    parseInt(this.props.complete / this.props.count * 100) :
                                    0
                                }%
                                </Text>

                        </View>
                    </View>
                    {/* <View>
                        <Text
                            style={{
                                color: '#743fb5',
                                marginLeft: 20,
                                marginTop: 30,
                                marginBottom: 5
                            }}
                        >All Notes</Text>
                        <View style={styles.progressBorder}>
                            <View style={[styles.progressBar, { backgroundColor: '#743fb5', width: '90%' }]}>
                            </View>
                            <Text style={[styles.progressCount, { color: '#743fb5' }]}>90%</Text>

                        </View>
                    </View> */}

                </View>
                <View>
                    {this.props.isLoading ? <Loading /> : null}

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    cards: {
        backgroundColor: '#b52c09',
        height: screenHeight / 7,
        width: screenWidth / 3.5,
        margin: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10

    },
    imageicon: {
        height: 50
        , resizeMode: 'contain',
        width: 60,
    },
    cardText: {
        color: 'white'
    },
    progressBar: {
        width: screenWidth / 2,
        height: screenHeight / 70,
        backgroundColor: '#b52c09',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    progressBorder: {
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressCount: {
        fontSize: 10,
        position: 'absolute',
        right: 15,
        fontWeight: 'bold'
    }
})
const mapStateTOProps = state => {
    // console.log(state)
    return {
        isLoading: state.auth.isLoading,
        name: state.auth.name,
        number: state.auth.number,
        user: state.auth.user,
        userArr: state.auth.userArr,
        count: state.auth.count,
        complete: state.auth.completeNote,
        notComplete: state.auth.NotCompleteNote,
        // notComplete: state.auth.completeNote
    }
}

export default connect(mapStateTOProps, {
    signOut,
    getNotes,
    countOfNotes,
    countOfNotesCompleted,
    countOfNotesNotCompleted
})(Deshboard)
// export default