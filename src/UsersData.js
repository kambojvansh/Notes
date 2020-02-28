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
    ActivityIndicator
} from 'react-native';
// import { Comment } from './NotesList';
import firebase from 'react-native-firebase'

export default class UsersData extends React.Component {

    constructor(props) {
        this.ref = firebase.firestore().collection(firebase.auth().currentUser.uid)
        super(props)
        this.state = {
            isLoading: true,
            dataSource: []
            // data: [1, 1, 1, 1, 1, 1, 1, 1,],
            // arr: ['3', '1', '2']
        }
    }
    // async getData() {
    //     try {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    //         const data = await response.json()
    //         this.setState({
    //             isLoading: false,
    //             dataSource: data,
    //         });
    //     } catch (err) {
    //         if (err == "TypeError: Network request failed") {
    //             this.setState({
    //                 isLoading: false,
    //             });
    //             alert("Please open Internet")
    //         }
    //         console.log("Error Found: " + err)

    //     }

    // }

    async getData() {
        try {
            const response = await this.ref.get()
            let data = []
            data = await response._docs
            alert(data)
            console.log(data)
            this.setState({
                isLoading: false,
                dataSource: data,
            });
            // this.setState({
            //     isLoading: false,
            //     dataSource: data,
            // });
        } catch (err) {
            // if (err == "TypeError: Network request failed") {
            //     // this.setState({
            //     //     isLoading: false,
            //     // });
            //     alert("Please open Internet")
            // }
            console.log("Error Found: " + err)

        }

    }
    componentDidMount() {
        this.getData()
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large'
                        color="#3498db" />
                </View>
            )
        }
        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => <Users
                    userdetails={item.Notes}
                    userId={"1"}
                    showDetails={() => { }}
                // showDetails={() => this.props.navigation.navigate("details",
                //     {
                //         userId: item.userId,
                //         id: item.id,
                //         title: item.title,
                //         completed: item.completed
                //     }
                // )}
                />}
                keyExtractor={(item, index) => item.id + index}
            />

        )
    }
}

export class Users extends Component {
    render() {
        return (
            <View style={{ backgroundColor: 'white', marginTop: 10, marginHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => this.props.showDetails()}
                >
                    <Text style={{ fontSize: 25, paddingHorizontal: 10 }}>
                        {this.props.userdetails}
                    </Text>
                    {/* <Text style={{ fontSize: 25, paddingHorizontal: 10 }}>
                        {this.props.userId}{" "}{this.props.userdetails}
                    </Text> */}

                </TouchableOpacity>
            </View>
        )
    }
}