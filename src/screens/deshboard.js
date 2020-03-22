import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Alert
} from 'react-native'
import OptionsMenu from "react-native-options-menu"
import firebase from 'react-native-firebase'
import { connect } from 'react-redux';
import { signOut, getNotes, countOfNotes } from "../redux/actions"
import Loading from "../redux/components/loading"
import { Actions } from 'react-native-router-flux'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../../images/moreOption.png");


class Deshboard extends Component {

    constructor() {
        super()
        this.getref = firebase.firestore().collection(firebase.auth().currentUser.uid).orderBy("notesdate", "desc")
    }
    componentDidMount() {
        // this.props.navigation.setParams({
        //     title='vansh',
        // });
        // console.log(this.props.user.user.uid)
        this.unsubscribe = this.getref.onSnapshot(this.props.getNotes)
    }
    componentWillUnmount() {
        this.unsubscribe();
        // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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
    getCount() {
        // let key, count = 0
        let isLikes, count = 0
        for (isLikes in this.props.userArr) {
            if (this.props.userArr.hasOwnProperty(isLikes)) {
                count++
            }
        }
        return count
    }
    render() {
        this.props.countOfNotes(this.props.userArr)
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
                            <Text style={[styles.cardText, { fontSize: 10 }]}>12 Notes</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cards}>
                            <Image
                                source={require("../../images/done.png")}
                                style={styles.imageicon}
                            />
                            <Text style={styles.cardText}>Completed</Text>
                            <Text style={[styles.cardText, { fontSize: 10 }]}>12 Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cards, { backgroundColor: '#743fb5' }]}
                            onPress={() => Actions.notes()}
                        >
                            <Image
                                source={require("../../images/all.png")}
                                style={styles.imageicon}
                            />
                            <Text style={styles.cardText}>Add Notes</Text>
                            <Text style={[styles.cardText, { fontSize: 10 }]}>24 Notes</Text>

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
                            style={{ marginLeft: 30 }}
                        >
                            <Text
                                style={{ fontSize: 40 }}
                            >{this.props.count}</Text>
                            <Text
                                style={{ color: 'gray', marginTop: 10 }}
                            >TOTAL NOTES</Text>

                        </View>


                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        marginLeft: 1,
                        justifyContent: 'center'
                    }}>
                        <View
                            style={{ marginLeft: 30 }}
                        >
                            <Text
                                style={{ fontSize: 40 }}
                            >12</Text>
                            <Text
                                style={{ color: 'gray', marginTop: 10 }}
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
                            <View style={[styles.progressBar, { backgroundColor: '#45a0e6', width: "60%" }]}>
                            </View>
                            <Text style={[styles.progressCount, { color: '#45a0e6' }]}>60%</Text>

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
                            <View style={[styles.progressBar, , { backgroundColor: '#b52c09', width: "80%" }]}>
                            </View>
                            <Text style={[styles.progressCount, { color: '#b52c09' }]}>80%</Text>

                        </View>
                    </View>
                    <View>
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
                    </View>

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
        alignItems: 'center'

    },
    imageicon: {
        height: 70
        , resizeMode: 'contain',
        width: 60
    },
    cardText: {
        color: 'white'
    },
    progressBar: {
        width: screenWidth / 2,
        height: screenHeight / 90,
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
        fontSize: 12,
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
        count: state.auth.count
    }
}

export default connect(mapStateTOProps, {
    signOut,
    getNotes,
    countOfNotes
})(Deshboard)
// export default