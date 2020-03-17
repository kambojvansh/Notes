import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';
export default class Loading extends Component {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

                    <View style={{ marginTop: 350, alignSelf: 'center' }}>
                        <View>
                            <ActivityIndicator size='large'
                                color="#45a0e6'" />
                        </View>
                    </View>
                </View>

            </Modal>

        )
    }
}
