import React, { Component } from 'react'
import { View } from 'react-native'

class navigationScreens extends Component {
    // loginSuccess() {
    //     this.props.navigation.navigate('Deshboard')

    // }
    render() {
        return (
            <loginSuccess
                login={() => this.props.navigation.navigate('Deshboard')}
            />
            // <View></View>
        )

    }
}

export const loginSuccess = (props) => {
    console.log(props)


}
const objNevigation = new navigationScreens()
export default navigationScreens

