import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SocketIOClient from 'socket.io-client'
import {SocketIoURL,URL} from '../../URL'

class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            chatMessage:'',
            chatMessages:[]
        }
        this.socket = SocketIOClient(SocketIoURL)
    }
    static navigationOptions = ({navigation}) =>{
        const {you,other} = navigation.state.params
        return{
            headerStyle: {
                backgroundColor : '#00B6FF'
            },
            headerLeft: (
                <TouchableOpacity style={{marginLeft:15}} onPress={()=>{
                    navigation.goBack()
                }}>
                    <FontAwesome style={{fontSize:25, color:'white'}} name="arrow-left" />
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>{other}</Text>
            )
        }
    }
    componentDidMount(){
        const {you,other} = this.props.navigation.state.params
        axios.get(`${URL}/api/chat/${you}/${other}`).then((response)=>{
            console.warn(response.data.data)
            this.setState({chatMessages:response.data.data})
        })
        this.socket.on('ChatAdded', messages=>{
            console.log(messages)
            this.setState({chatMessages:[...this.state.chatMessages, messages]})
            console.log(this.state.chatMessages)
        })
    }
    sendChat = () =>{
        const {you,other} = this.props.navigation.state.params
        if(this.state.chatMessage!==''){
            const Chat = {
                msgFrom:you,
                msgTo:other,
                msg:this.state.chatMessage
            }
            this.socket.emit('addChat', Chat)
            this.setState({chatMessage:''})
        }
    }
    render(){
        const {you,other} = this.props.navigation.state.params
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['cyan', 'blue']} style={{flex:1}}>
            <View style={{flex:1}}>
                <ScrollView 
                    ref={ref => this.scrollView = ref} 
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                    style={{flex:7, padding:20, marginBottom:'20%'}}
                >
                {this.state.chatMessages.length>0 && this.state.chatMessages.map(message=>(
                    <View key={message.no} style={{padding:5, borderRadius:30, marginBottom:20, alignItems:message.msgFrom==you?'flex-end':'flex-start'}}>
                        <View style={{padding:10, borderRadius:20, backgroundColor:message.msgFrom==you?'#DCF8C6':'white'}}>
                        <Text style={{color:'blue', fontSize:20}}>{message.msgFrom}</Text>
                        <Text style={{}}>{message.msg}</Text>
                        </View>
                    </View>
                ))}
                </ScrollView>
                <View style={{position:'absolute', flexDirection:'row', padding:10, bottom:0, width:'100%'}}>
                    <View style={{flex:1, padding:5, borderRadius:30, backgroundColor:'white', elevation:5, flexDirection:'row'}}>
                        <TextInput style={{flex:4}} value={this.state.chatMessage} onChangeText={(text)=>this.setState({chatMessage:text})}/>
                        <TouchableOpacity style={{flex:1,padding:10, margin:5, backgroundColor:'#4EC9B0', borderRadius:50, alignItems:'center', justifyContent:'center'}} onPress={this.sendChat}>
                            <FontAwesome name="paper-plane" style={{fontSize:20, color:'white'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </LinearGradient>
        )
    }
}

export default Chat