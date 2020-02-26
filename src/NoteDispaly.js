import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class NoteDisplay extends Component {
    constructor(props) {
        super(props)
        // const value = this.props.route
        console.log(props.route.params, "props")
    }
    text = this.props.route.params.commentPass
    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={styles.commentContainer}>
                    <Text style={styles.text}>
                        {this.text}
                    </Text>

                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        flex: 0.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        margin: 20

    },
    text: {
        margin: 25,
        fontWeight: 'bold'
    }

})