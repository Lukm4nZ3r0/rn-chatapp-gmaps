import React, {Component} from 'react'
import Home from './Home'

class Auth extends Component{
    static navigationOptions = {
        header:null
    }
    render(){
        return(
            <Home navigation={this.props.navigation} />
            // <Maps />
        )
    }
}

export default Auth