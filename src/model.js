import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Model extends Component {
    render() {
        return (
            <KeyboardAwareScrollView
            // keyboardShouldPersistTaps='handled'
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <Text>cknddvvvndvn</Text>
                        <Text>cknddvvvndvn</Text>
                        <Text>cknddvvvndvn</Text>
                        <Text>cknddvvvndvn</Text>
                        <Text>cknddvvvndvn</Text>
                        <Text>cknddvvvndvn</Text>
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />

                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />

                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />

                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />
                        <TextInput
                            placeholder={"Enter Text"}
                            style={{ borderWidth: 1 }}
                        />



                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView >
        )
    }
}