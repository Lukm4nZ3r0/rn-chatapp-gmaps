import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-navigation'

class DrawerCustom extends Component{
    render(){
        return(
            <SafeAreaView
                style={{backgroundColor:'white', flex:1}}
                forceInset={{ top: 'always', horizontal: 'never' }}
            >
                <View style={{flex:1}}>
                    <Text>Hi</Text>
                </View>
                <View style={{flex:2,}}>
                <ScrollView style={{backgroundColor:'#EEEEEE'}}>
                
                </ScrollView>
                </View>

            </SafeAreaView>
        )
    }
}

export default DrawerCustom