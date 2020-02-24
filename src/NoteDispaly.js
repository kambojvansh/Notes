import React, { Component } from 'react';
import {
    View,
    Text,
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
            <View>
                <Text>
                    {this.text}
                </Text>
            </View>
        )
    }
}