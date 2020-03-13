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
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../../images/moreOption.png");


class Deshboard extends Component {
    logOutUser = () => {
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
    signOutUser = async () => {
        try {
            this.setState({ ModalVisible: true })
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
    render() {
        return (

            <View style={{ flex: 1 }}>
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
                        style={{ alignSelf: 'center', fontSize: 30 }}
                    >
                        Deshboard
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
                            onPress={() => this.props.navigation.navigate('NotesPage')}
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
                            >24</Text>
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
export default Deshboard