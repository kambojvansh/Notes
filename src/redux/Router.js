import React from "react"
import { Scene, Router } from 'react-native-router-flux'
// import { Scene, Router } from 'react-router-flux'
import Signin from './signIn'
import Deshboard from '../screens/deshboard'
import SignUp from './signUp'
import { StyleSheet } from "react-native"


const RouerComponent = () => {
    return (
        <Router
            titleStyle={styles.titleStyle}
            sceneStyle={styles.sceneStyle}
            navigationBarStyle={styles.navBarStyle}
        >
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={Signin}
                        hideNavBar={true}
                    />
                    <Scene key="signUp" component={SignUp}
                        hideNavBar={true}
                    />
                </Scene>
                <Scene key='main'>
                    <Scene key='deshboard' component={Deshboard}
                        title='Deshboard'
                        rightTitle="add"
                        onRight={() => console.log("kcnskkns")}
                        headerLayoutPreset={'center'}
                    />
                </Scene>
            </Scene>
        </Router>

    )
}
const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
    }
})

export default RouerComponent