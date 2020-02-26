import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
export default class UserDetails extends Component {
    constructor(props) {
        super(props)
        // console.log(props.route.params, "props")
    }
    userId = this.props.route.params.userId
    id = this.props.route.params.id
    title = this.props.route.params.title
    completed = this.props.route.params.completed
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.text}>UserId:- <Text style={styles.textDecorate}>{this.userId}</Text></Text>
                    <Text style={styles.text}>Id:- <Text style={styles.textDecorate}>{this.id}</Text></Text>
                    <Text style={styles.text}>
                        Title:-
                        <Text style={[styles.textDecorate, { fontSize: 20, color: 'gray' }]}>
                            {this.title}
                        </Text>
                    </Text>
                    <Image
                        style={{
                            height: 40,
                            width: 40,
                            alignSelf: 'center'
                        }}
                        source={!this.completed ? require('../images/comp.png') : require('../images/notcomp.png')}
                    ></Image>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 50,
        flex: 0.3,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 100,
        paddingHorizontal: 10,
        width: screenWidth,
        // shadowColor: "red",
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.39,
        // shadowRadius: 8.30,
        elevation: 20,

    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    textDecorate: {
        color: 'blue'
    }
})