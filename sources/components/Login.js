import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, AsyncStorage, StyleSheet, Image, ScrollView} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {URL} from '../../URL'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            errorMessage:false,
            disableButton:false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('username').then(val=>{
            if(val){
                this.setState({username:val})
            }
        })
        console.log(URL)
        console.log(this.props.navigation.state.params.login)
    }

    submitForm = () =>{
        this.setState({disableButton:true})
        axios.post(`${URL}/api/login`,{
            username: this.state.username,
            password: this.state.password
        }).then((response)=>{
            console.log(response.data.data)
            if(response.data.data.length>0){
                AsyncStorage.setItem('username', response.data.data[0].username).then(()=>{
                    AsyncStorage.setItem('password', response.data.data[0].password).then(()=>{
                        this.setState({
                            errorMessage:false
                        })
                        this.props.navigation.goBack()
                        this.props.navigation.state.params.login(response.data.data[0])
                    })
                })
            }
            else{
                this.setState({
                    errorMessage:true
                })
            }
        })
        // await AsyncStorage.setItem('username', this.state.username)
        // this.props.navigation.goBack()
    }
    _onFocus = () =>{
        this.setState({disableButton:false})
    }
    static navigationOptions = {
        header:null,
    }
    render(){
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['cyan', 'blue']} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView style={{flex:1, width:'100%', padding:20}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white', width:'100%', height:'100%', borderRadius:30, marginTop:100}}>
                    <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                        <Image style={{flex:1,width:150, height:150,resizeMode: 'contain',}} source={require('../../assets/images/undraw_arrived_f58d.png')}/>
                    </View>
                    <View style={{flex:1, width:'90%'}}>
                        {this.state.errorMessage && <Text style={{color:'red', textAlign:'center'}}>Incorrect Username or Password.</Text>}
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{fontSize:20}} name="user"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <TextInput 
                                    placeholder="Username"
                                    value={this.state.username} 
                                    onChangeText={(text)=>{this.setState({username:text})}}
                                    onFocus={this._onFocus}
                                    style={{}}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{fontSize:20}} name="key"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <TextInput 
                                    placeholder="Password" 
                                    value={this.state.password} 
                                    onChangeText={(text)=>{this.setState({password:text})}}
                                    onFocus={this._onFocus}
                                    style={{}}
                                    secureTextEntry={true}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.submitForm} disabled={this.state.disableButton}>
                            <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={this.state.disableButton?['black','black']:['cyan', 'blue']}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Join Chat</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                <View style={{position:'absolute', left:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.goBack()}>
                        <FontAwesome name="arrow-left" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    textInput:{
        backgroundColor:'white'
    }
})

export default Login