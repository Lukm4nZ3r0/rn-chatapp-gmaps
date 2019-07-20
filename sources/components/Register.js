import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, AsyncStorage, StyleSheet, Image, ScrollView, Picker, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import City from '../data/City'
import axios from 'axios'
import {URL} from '../../URL'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            name:'',
            password:'',
            confirmPassword:'',
            city:City,
            citySelected:'',
            passwordNotMatch:false,
            emptyForm:false,
            usernameAlreadyExist:false,
            disableButton:false
        }
    }
    static navigationOptions = {
        header:null
    }
    cityList = () =>{
        let cityArrayData = []
        for(let i = 0 ; i<this.state.city.length ; i++){
            cityArrayData.push(
                <Picker.Item key={i} label={this.state.city[i]} value={this.state.city[i]} />
            )
        }
        return cityArrayData
    }
    registerEvent = () =>{
        this.setState({disableButton:true})
        const {username, name, password, confirmPassword, citySelected} = this.state
        if(username!=='', name!=='', password!=='', confirmPassword!=='', citySelected!==''){
            if(password == confirmPassword){
                let registerData = {
                    username: this.state.username,
                    name: this.state.name,
                    password: this.state.password,
                    city: this.state.citySelected
                }

                axios.post(`${URL}/api/register`,{
                    username: registerData.username,
                    name: registerData.name,
                    password: registerData.password,
                    city: registerData.city
                }).then((response)=>{
                    console.log(response.data.success)
                    if(response.data.success){
                        Alert.alert('Account created succesfully, please Login')
                        this.setState({usernameAlreadyExist:false, passwordNotMatch:false, emptyForm:false})
                        this.props.navigation.goBack()
                    }
                    else{
                        this.setState({usernameAlreadyExist:true, passwordNotMatch:false, emptyForm:false})
                    }
                })
            }
            else{
                this.setState({passwordNotMatch:true, usernameAlreadyExist:false, emptyForm:false})
            }
        }
        else{
            this.setState({emptyForm:true, passwordNotMatch:false, usernameAlreadyExist:false})
        }
    }
    _onFocus = () =>{
        this.setState({disableButton:false})
    }
    render(){
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['cyan', 'blue']} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView style={{flex:1, width:'100%', padding:20}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white', width:'100%', height:'100%', borderRadius:30, marginTop:100, marginBottom:100}}>
                    <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                        <Image style={{flex:1,width:150, height:150,resizeMode: 'contain',}} source={require('../../assets/images/undraw_arrived_f58d.png')}/>
                    </View>
                    {this.state.passwordNotMatch&&<Text style={{marginBottom:20, color:'red'}}>Password not match.</Text>}
                    {this.state.emptyForm&&<Text style={{marginBottom:20, color:'red'}}>Please fill in the form correctly.</Text>}
                    {this.state.usernameAlreadyExist&&<Text style={{marginBottom:20, color:'red'}}>Username is already exist.</Text>}
                    <View style={{flex:1, width:'90%'}}>
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
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20, borderColor:'red',borderWidth:this.state.passwordNotMatch?1:0}}>
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
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20, borderColor:'red',borderWidth:this.state.passwordNotMatch?1:0}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{fontSize:20}} name="key"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <TextInput 
                                    placeholder="Confirm Password" 
                                    value={this.state.confirmPassword} 
                                    onChangeText={(text)=>this.setState({confirmPassword:text})}
                                    onFocus={this._onFocus}
                                    style={{}}
                                    secureTextEntry={true}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{fontSize:20}} name="tags"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <TextInput 
                                    placeholder="Your Name" 
                                    value={this.state.name} 
                                    onChangeText={(text)=>{this.setState({name:text})}}
                                    onFocus={this._onFocus}
                                    style={{}}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row', elevation:5, borderRadius:30, backgroundColor:'white', padding:5, marginBottom:20}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{fontSize:20}} name="map-marker"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <Picker
                                    selectedValue={this.state.citySelected}
                                    onValueChange={(itemValue,itemIndex)=>this.setState({citySelected:itemValue})}
                                    style={{height: 50, width: '100%', padding:15}}
                                >
                                    <Picker.Item label="Pilih Lokasi Anda" value="" />
                                    {this.cityList()}
                                </Picker>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.registerEvent} disabled={this.state.disableButton}>
                            <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={this.state.disableButton?['black','black']:['cyan', 'blue']}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Register</Text>
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

export default Register