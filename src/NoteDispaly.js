import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

export default class NoteDisplay extends Component {
    constructor(props) {
        super(props)
        // const value = this.props.route
    }
    text = this.props.route.Params.comment
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