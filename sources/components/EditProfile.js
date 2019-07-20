import React, {Component} from 'react'
import {View,Text,TouchableOpacity,ScrollView,Image,TextInput,Picker} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import City from '../data/City'
import axios from 'axios'
import {URL} from '../../URL'

class EditProfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            name:'',
            city:City,
            citySelected:'',
            imageLink:''
        }
    }
    static navigationOptions = ({navigation}) =>{
        return{
            header:null
        }
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
    componentDidMount(){
        const {id} = this.props.navigation.state.params
        axios.get(`${URL}/api/user/${id}`).then((response)=>{
            const {username,name,city,image_link} = response.data.data[0]
            this.setState({
                username:username,
                name:name,
                citySelected:city,
                imageLink:image_link
            })
        })
    }
    editThisEvent = () =>{
        const {id,editEvent} = this.props.navigation.state.params
        axios.put(`${URL}/api/user/${id}`,{
            name:this.state.name,
            imageLink:this.state.imageLink,
            city:this.state.citySelected,
        }).then(()=>{
            const userData = {
                id:id,
                username:this.state.username,
                name:this.state.name,
                city:this.state.citySelected,
                image_link:this.state.imageLink
            }
            editEvent(userData)
            this.props.navigation.goBack()
        })
    }
    render(){
        return(
            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={['cyan', 'blue']} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ScrollView style={{flex:1, width:'100%', padding:20}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white', width:'100%', height:'100%', borderRadius:30, marginTop:100, marginBottom:100}}>
                    <View style={{flex:1, marginBottom:25, marginTop:25, flexDirection:'row'}}>
                        <Image style={{flex:1,width:150, height:150,resizeMode: 'contain',}} source={require('../../assets/images/undraw_arrived_f58d.png')}/>
                    </View>
                    <View style={{flex:1, width:'90%'}}>
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
                                <FontAwesome style={{fontSize:20}} name="image"/>
                            </View>
                            <View style={{flex:8, justifyContent:'center'}}>
                                <TextInput 
                                    placeholder="Your Image URL Link.." 
                                    value={this.state.imageLink} 
                                    onChangeText={(text)=>{this.setState({imageLink:text})}}
                                    onFocus={this._onFocus}
                                    style={{}}
                                    placeholderTextColor="grey"
                                />
                            </View>
                        </View>
                        <Text>Profile Image Preview:</Text>
                        <Image style={{flex:1,width:150, height:150,resizeMode: 'contain',}} source={{uri:this.state.imageLink !==''?this.state.imageLink:'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png'}}/>
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
                        <TouchableOpacity onPress={this.editThisEvent} disabled={this.state.disableButton}>
                            <LinearGradient style={{borderRadius:30, alignItems:'center', justifyContent:'center', padding:15, marginBottom:20}} start={{x: 0, y: 0}} end={{x: 3, y: 3}} colors={this.state.disableButton?['black','black']:['cyan', 'blue']}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Edit Profile</Text>
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

export default EditProfile