import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, AsyncStorage, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel'
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { PermissionsAndroid } from 'react-native';
import axios from 'axios'
import {URL,SocketIoURL} from '../../URL'
import SocketIOClient from 'socket.io-client'

const {width,height} = Dimensions.get('window')

class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            latitude : 0,
            longitude: 0,
            userData:[],
            activeIndex:0
        }
        this.request()
        this.socket = SocketIOClient(SocketIoURL)
    }

    request = async () => {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted) {
            console.warn("You can use the ACCESS_FINE_LOCATION")
        }
        else {
            console.warn("ACCESS_FINE_LOCATION permission denied")
        }
    }

    static navigationOptions = ({navigation}) =>{
        return{
            headerStyle: {
                backgroundColor : '#00B6FF'
            },
            headerLeft: (
                <TouchableOpacity style={{marginLeft:15}} onPress={()=>navigation.goBack()}>
                    <FontAwesome style={{fontSize:25, color:'white'}} name="arrow-left" />
                </TouchableOpacity>
            ),
        }
    }
    
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude : position.coords.latitude,
                    longitude: position.coords.longitude
                });

                AsyncStorage.getItem('username').then((response)=>{
                    this.setState({username:response})
                    axios.put(`${URL}/api/setposition/${response}`,{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                })

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        axios.get(`${URL}/api/coordinate`).then((response)=>{
            this.setState({userData:response.data.data})
        })
        this.socket.emit('getRealtimePersons')
        this.socket.on('getRealtimePerson', result=>{
            this.setState({
                userData:result
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,}}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.121,
                    }}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.15,
                        longitudeDelta: 0.121,
                    }}
                >
                {this.state.userData.map((item,i)=>{
                    let {coordinate} = item
                    let xy = coordinate.split(',')
                    let newCoordinate = {
                        latitude:xy[0],
                        longitude:xy[1]
                    }
                    
                        return(
                        <MapView.Marker
                            key={i}
                            coordinate={{
                                latitude: Number(newCoordinate.latitude),
                                longitude: Number(newCoordinate.longitude),
                            }}
                            title={item.username+"'s Found!"}
                            description={item.username !== this.state.username?item.name:"Its You"}
                            onPress={()=>{
                                this.carousel._snapToItem(i)
                                this.setState({
                                    latitude: Number(xy[0]),
                                    longitude: Number(xy[1])
                                })
                            }}
                        />
                        )
                })}
                </MapView>
                <View style={{position:'absolute', bottom:'2%'}}>
                <Carousel
                    ref={ref=>this.carousel = ref}
                    data={this.state.userData}
                    sliderWidth={width}
                    itemWidth={width-(width*20/100)}
                    renderItem={({item,index})=>{
                    return (
                        <View style={{backgroundColor:'white', height:'100%', padding:25, borderRadius:30, elevation:1, alignItems:'center', justifyContent:'center'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <View style={{flex:1, }}><Image source={{uri:item.image_link}} style={{width:100, height:100, resizeMode:'contain'}} /></View>
                                <View style={{flex:1}}>
                                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                                        <FontAwesome style={{flex:1,fontSize:20, color:item.fontColor, fontWeight:'bold'}} name="tags"/>
                                        <Text style={{flex:3,fontSize:20, color:item.fontColor, fontWeight:'bold'}}>{item.username}</Text>
                                    </View>
                                    <Text numberOfLines={2} style={{fontSize:13, color:'grey'}}>{item.name}</Text>
                                    
                                    {item.username !== this.state.username &&
                                    <View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                                        <View style={{alignItems: 'center', justifyContent:'center',flex:1}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chat',{you:this.state.username, other:item.username})} style={{alignItems: 'center', justifyContent:'center', padding:5, borderRadius:5, backgroundColor:'#09D261', width:50, height:50}}>
                                            <FontAwesome style={{color:'white', fontSize:30}} name="comments" />
                                        </TouchableOpacity>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent:'center',flex:1}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProfileScreen',{no:item.id})} style={{alignItems: 'center', justifyContent:'center', padding:5, borderRadius:5, backgroundColor:'tomato', width:50, height:50}}>
                                            <FontAwesome style={{color:'white', fontSize:30}} name="id-card"/>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                    }
                                </View>
                            </View>
                        </View>
                    )}}
                    onSnapToItem={index=>{
                        let item = this.state.userData[index].coordinate
                        let xy = item.split(',')
                        
                        this.setState({
                            activeIndex:index,
                            latitude:Number(xy[0]),
                            longitude:Number(xy[1])
                        })
                    }}
                />
                </View>
            </View>
        ) 
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

export default Maps