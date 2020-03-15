

import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'


const Count = (props) => {

    let [count, setCount] = useState(0)

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row'
        }}>
            <ButtonSuraj title={"-"} onPress={() => { setCount(count - 1) }} />
            <ButtonSuraj title={count} />
            <ButtonSuraj title={"+"} onPress={() => { setCount(count + 1) }} />
        </View>
    )
}


const ButtonSuraj = props => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (props.onPress)
                    props.onPress()
            }}
            style={{ borderWidth: 2, padding: 10 }} >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}
export default Count