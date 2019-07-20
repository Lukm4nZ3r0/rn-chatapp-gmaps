import React, {Component} from 'react'
import {View,Text,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {URL} from '../../URL'

class ProfileScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userData:[]
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
    }
    componentDidMount(){
        const {no} = this.props.navigation.state.params
        console.warn(no)
        axios.get(`${URL}/api/user/${no}`).then((response)=>{
            console.warn(response.data.data[0])
            this.setState({userData:response.data.data[0]})
        })
    }
    render(){
        const {created} = this.state.userData
        let newDate = new Date(created).toString().split(' ')
        newDate = newDate[2]+' '+newDate[1]+' '+newDate[3]
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['cyan', 'blue']} style={{ alignItems:'center', justifyContent:'center', padding:'5%', height:'100%'}}>
                <View style={{backgroundColor:'white', borderRadius:30, width:'100%', height:'60%', padding:25, elevation:5, alignItems:'center', justifyContent:'center'}}>
                    <Image style={{resizeMode:'contain', width:100, height:100, borderRadius:30}} source={{uri:this.state.userData.image_link}}/>
                    <View style={{ borderColor: '#dedfe0', borderWidth:0.3, width:'100%', marginTop:15, marginBottom:15 }} />
                    <View style={{width:'100%',flex:1}}>
                        <View style={{flexDirection:'row', flex:1, alignItems: 'center'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}><FontAwesome style={{fontSize:20}} name="tags"/></View>
                            <View style={{flex:5, justifyContent:'center'}}><Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.userData.username}</Text></View>
                        </View>
                    </View>
                    <View style={{width:'100%',flex:1}}>
                        <View style={{flexDirection:'row', flex:1, alignItems: 'center'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}><FontAwesome style={{fontSize:20}} name="user"/></View>
                            <View style={{flex:5, justifyContent:'center'}}><Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.userData.name}</Text></View>
                        </View>
                    </View>
                    <View style={{width:'100%',flex:1}}>
                        <View style={{flexDirection:'row', flex:1, alignItems: 'center'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}><FontAwesome style={{fontSize:20}} name="map-marker"/></View>
                            <View style={{flex:5, justifyContent:'center'}}><Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.userData.city}</Text></View>
                        </View>
                    </View>
                    <View style={{width:'100%',flex:1}}>
                        <View style={{flexDirection:'row', flex:1, alignItems: 'center'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}><FontAwesome style={{fontSize:20}} name="calendar"/></View>
                            <View style={{flex:5, justifyContent:'center'}}><Text style={{fontSize:20, fontWeight:'bold'}}>{newDate}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={{position:'absolute', left:'5%', top:'3%'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.goBack()}>
                        <FontAwesome name="arrow-left" style={{color:'white', fontSize:25, fontWeight:'bold'}}/>
                    </TouchableOpacity>
                </View>
                <ActivityIndicator style={{position:'absolute', bottom:0, top:0, left:0, right:0}} size="large" color="#0000ff" />
            </LinearGradient>
        )
    }
}

export default ProfileScreen