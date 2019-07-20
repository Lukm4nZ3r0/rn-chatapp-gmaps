import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, AsyncStorage, StyleSheet, Image, ScrollView, Dimensions, Alert, ActivityIndicator} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import axios from 'axios'
import {URL} from '../../URL'

const {width, height} = Dimensions.get('window')

class Home extends Component{
    constructor(){
        super()
        this.state = {
            carouselData:[
                {key:0, title:'Cari Teman Terdekat', description:'Mencari teman disekeliling anda dapat menambahkan sebuah ikatan kekeluargaan.', linkImage:'https://i.pinimg.com/originals/e5/ce/1f/e5ce1f6d77c72c5c2dd203876d5803f2.png',fontColor:'orange',navigate:'Maps'},
                {key:1, title:'Chatting Yuk', description:'Daripada gabut kan?', linkImage:'https://i.pinimg.com/originals/93/0e/d1/930ed1b6289d2ca24dd3b5d02c93bfeb.png',fontColor:'purple',navigate:'ChatList'},
                {key:2, title:'Coming Soon', description:'Coming Soon', linkImage:'https://i.pinimg.com/originals/06/3a/96/063a96b623c851408361d5c42b0da0db.png',fontColor:'red',navigate:''},
            ],
            activeIndex:0,
            quotes:['Selalu Dekat,','Dimana Saja,','dan, Kapan Saja.'],
            quotesCounter:0,
            isLogged:false,
            userData:[]
        }
    }
    componentDidMount(){
        console.log(this.state.quotes.length)
        this.setQuotes = setInterval(()=>{
            let {quotesCounter} = this.state
            if(quotesCounter<this.state.quotes.length-1){
                this.setState({quotesCounter:quotesCounter+1})
            }else{
                this.setState({quotesCounter:0})
            }
        },1500)
        this.getUsername = AsyncStorage.getItem('username').then((username)=>{
            console.log(username)
            if(username!==null){
                AsyncStorage.getItem('password').then((password)=>{
                    if(username!==null){
                        axios.post(`${URL}/api/login`,{
                            username: username,
                            password: password
                        }).then((response)=>{
                            console.log(response.data.data[0])
                            this.setState({
                                isLogged:true,
                                userData:response.data.data[0]
                            })
                            console.warn('ini userData home',this.state.userData)
                        })
                    }
                })
            }
            else{
                this.setState({
                    isLogged:false
                })
            }
        })
    }
    componentWillUnmount(){
        this.getUsername
        this.setQuotes
    }
    static navigationOptions = ({navigation}) => {
        return {
            
        }
    }
    loginEvent = (userData) =>{
        this.setState({
            isLogged:true,
            userData:userData
        })
    }
    logoutEvent = () =>{
        AsyncStorage.removeItem('username').then(()=>{
            this.setState({
                isLogged:false
            })
        })
    }
    editEvent = (userData) =>{
        const {id,username,name,city,image_link} = userData
        const {password,coordinate,created,is_login} = this.state
        const newUserData = {
            id:id,
            username:username,
            password:password,
            name:name,
            city:city,
            coordinate:coordinate,
            is_login:is_login,
            image_link:image_link,
            created:new Date()
        }
        this.setState({userData:newUserData})
    }
    navigateFeature = (navigate) =>{
        if(this.state.isLogged){
            if(navigate!==''){
                this.props.navigation.navigate(navigate)
            }
            else{
                Alert.alert('Coming Soon')
            }
        }
        else{
            this.props.navigation.navigate('Login', {login:this.loginEvent})
        }
    }
    profileBox = (createDate) =>{
        if(this.state.isLogged){
            return(
            <View style={{flex:1, backgroundColor:'white', borderRadius:30, width:'100%', padding:15, flexDirection:'row'}}>
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                <Image style={{borderRadius:80, width:100, height:100, borderWidth:5, borderColor:'white'}} source={{uri:this.state.userData.image_link !==''?this.state.userData.image_link:'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png'}}/>
                </View>
                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfile',{id:this.state.userData.id, editEvent:this.editEvent})} style={{flexDirection:'row', padding:5}}>
                        <View style={{flex:4,justifyContent:'center'}}><Text style={{fontSize:25}}>{this.state.userData.username}</Text></View>
                        <View style={{flex:1}}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', padding:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><FontAwesome name="user" style={{fontSize:25}} /></View>
                        <View style={{flex:4, justifyContent:'center'}}><Text>{this.state.userData.name}</Text></View>
                    </View>
                    <View style={{flexDirection:'row', padding:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><FontAwesome name="map-marker" style={{fontSize:25}} /></View>
                        <View style={{flex:4, justifyContent:'center'}}><Text>{this.state.userData.city}</Text></View>
                    </View>
                    <View style={{flexDirection:'row', padding:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><FontAwesome name="calendar" style={{fontSize:25}} /></View>
                        <View style={{flex:4, justifyContent:'center'}}><Text>{createDate}</Text></View>
                    </View>
                </View>
            </View>
            )
        }
        else{
            return(
                <View style={{flex:1, backgroundColor:'white', borderRadius:30, width:'100%', padding:15, }}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>Anda Belum Login</Text>
                    </View>
                    <View style={{flex:2,flexDirection:'row'}}>
                        <View style={{flex:1, padding:5}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login', {login:this.loginEvent})}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['orange', 'white']} style={{borderRadius:20, padding:25, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{color:'white', fontSize:40}} name="sign-in"/>
                                <Text style={{color:'white', fontWeight:'bold'}}>Login</Text>
                            </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, padding:5}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['green', 'white']} style={{borderRadius:20, padding:25, alignItems:'center', justifyContent:'center'}}>
                                <FontAwesome style={{color:'white', fontSize:40}} name="plus-square"/>
                                <Text style={{color:'white', fontWeight:'bold'}}>Register</Text>
                            </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
    render(){
        const {userData} = this.state
        let createDate = new Date(userData.created).toString().split(' ')
        createDate = createDate[2]+' '+createDate[1]+' '+createDate[3]
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 2, y: 2}} colors={['white', '#c5c6c7']} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Image style={{width:width, height:height}} source={require('../../assets/images/home_background-01.png')}/>
                <View style={{position:'absolute', flex:1, height:'100%'}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Image style={{width:'100%', height:'100%'}} source={require('../../assets/images/Whatsapp-Backgrounds-SM.jpg')}/>
                    {this.state.isLogged &&
                    <View style={{position:'absolute', right:'3%',top:'10%'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfile',{id:this.state.userData.id, editEvent:this.editEvent})} style={{margin:4,width:50, height:50, borderRadius:30, backgroundColor:'#abd5ff', alignItems: 'center', justifyContent:'center'}}>
                        <FontAwesome name="pencil" style={{fontSize:30, color:'white'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.logoutEvent} style={{margin:4,width:50, height:50, borderRadius:30, backgroundColor:'#abd5ff', alignItems: 'center', justifyContent:'center'}}>
                        <FontAwesome name="sign-out" style={{fontSize:30, color:'white'}}/>
                    </TouchableOpacity>
                    </View>
                    }
                    <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row', width:'100%', position:'absolute'}}>
                        <View style={{alignItems: 'center', justifyContent:'center', margin:10, borderRadius:40, padding:15, backgroundColor:'#abd5ff', width:70, height:70, elevation:5}}><FontAwesome name="map-marker" style={{fontSize:40, color:'white'}} /></View>
                        <View style={{flex:3}}>
                            <View style={{backgroundColor:'#abd5ff', padding:5, borderRadius:20, width:'60%', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>{this.state.quotes[this.state.quotesCounter]}</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                    <View style={{flex:4, alignItems:'center', justifyContent:'center', width:'100%'}}>
                        <View style={{flex:2, alignItems:'center', justifyContent:'center', width:'100%', padding:25}}>
                            {this.profileBox(createDate)}
                        </View>
                        <View style={{flex:2}}>
                        <Carousel
                            ref={ref=>this.carousel = ref}
                            data={this.state.carouselData}
                            sliderWidth={width}
                            itemWidth={width-(width*10/100)}
                            renderItem={({item,index})=>(
                                <TouchableOpacity onPress={()=>this.navigateFeature(item.navigate)} style={{backgroundColor:'white', height:'100%', padding:25, borderRadius:30, elevation:1, alignItems:'center', justifyContent:'center'}}>
                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1, }}><Image source={{uri:item.linkImage}} style={{width:110, height:110, resizeMode:'contain'}} /></View>
                                        <View style={{flex:1}}>
                                            <Text style={{fontSize:20, color:item.fontColor, fontWeight:'bold'}}>{item.title}</Text>
                                            <Text numberOfLines={2} style={{fontSize:13, color:'grey'}}>{item.description}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            onSnapToItem={
                                index=>this.setState({activeIndex:index})
                            }
                        />
                        <View style={{ marginTop:10, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            {this.state.carouselData.map((item,i)=>
                                <View key={i} style={{margin:5, width:20, height:20, borderRadius:15, backgroundColor:'white', opacity: i == this.state.activeIndex? 1: 0.5}}/>
                            )}
                        </View>
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}


export default Home