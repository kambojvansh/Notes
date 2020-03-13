
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux';
import { changeCount } from './actions/counts';
import { bindActionCreators } from 'redux';


class App extends Component {
    decrementCount() {
        let { count, actions } = this.props;
        // count.count - 1;
        if (count.count == 0)
            return
        actions.changeCount(count.count - 1);
    }
    incrementCount() {
        let { count, actions } = this.props;
        // count.count + 1;
        actions.changeCount(count.count + 1);
    }
    render() {
        const { count } = this.props;
        // console.log(this.props)
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'row'
            }}>
                <CounterButton title={"-"} onPress={() => this.decrementCount()} />
                <CounterButton title={count.count} />
                <CounterButton title={"+"} onPress={() => this.incrementCount()} />
            </View>

        )
    }
}


const CounterButton = props => {
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
const mapStateToProps = state => ({
    count: state.count,
});

const ActionCreators = Object.assign(
    {},
    // changeCount

    {
        changeCount(count) {
            // console.log(count)
            return {
                type: 'COUNTER_CHANGE',
                payload: count

            }

        }
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)