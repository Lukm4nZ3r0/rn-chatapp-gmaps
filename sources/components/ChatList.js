import React, {Component} from 'react'
import {View,Text, Image, Dimensions, TouchableOpacity, FlatList, AsyncStorage} from 'react-native'
import axios from 'axios'
import {URL} from '../../URL'

const {width,height} = Dimensions.get('window')

class ChatList extends Component{
    constructor(props){
        super(props)
        this.state = {
            chatList:[],
            you:''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('username').then((username)=>{
            this.setState({you:username})
            axios.get(`${URL}/api/user`).then((response)=>{
                this.setState({chatList:response.data.data})
                console.warn(this.state.chatList)
            })
        })
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <Image style={{flex:1,width:width, height:height}} source={require('../../assets/images/home_background-01.png')}/>
                <View style={{position:'absolute', flex:1, height:height, width:'100%'}}>
                    <FlatList 
                        data={this.state.chatList}
                        style={{flex:1, width:'100%', padding:5,}}
                        keyExtractor={(item, index) => index}
                        renderItem={({item})=>{
                            if(this.state.you !== item.username){
                            return(
                                <TouchableOpacity style={{flex:1, margin:5, flexDirection: 'row', backgroundColor:'white', borderRadius:15, padding:15, elevation:5, alignItems: 'center',}} onPress={()=>this.props.navigation.navigate('Chat',{you:this.state.you, other:item.username})}>
                                    <Image style={{borderRadius:40, width:50, height:50, borderWidth:1, borderColor:'white'}} source={{uri:item.image_link}}/>
                                    <View style={{marginLeft:15}}>
                                    <Text numberOfLines={1} style={{color:'purple', fontSize:17, fontWeight: 'bold',}}>{item.name} ({item.username})</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                            }
                        }
                        }
                    />
                </View>
            </View>
        )
    }
}

export default ChatList