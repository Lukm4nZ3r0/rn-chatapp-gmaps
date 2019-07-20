import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

import firebase from 'firebase';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.request();
    }

    request = async () => {

        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
            console.warn("You can use the ACCESS_FINE_LOCATION")
        }
        else {
            console.warn("ACCESS_FINE_LOCATION permission denied")
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {

            title: 'Homepage',
            headerRight: (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
                        <Text>Masuk ke chat</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    state = {
        latitude : '',
        longitude: '',
    };
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({ latitude : position.coords.latitude, longitude: position.coords.longitude });
                console.warn('initial : ',position.coords.latitude)

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    render() {
        console.warn('data ', this.state.longitude)
        if (this.state.longitude) {
            console.warn('ini berhasil ', this.state.latitude)
            return (
                <View style={styles.container}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                            title={"title"}
                            description={"description"}
                        />
                    </MapView>
                </View>
            )

        } else {
            console.warn('ini gagal ', this.state.latitude)
            return (
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: -7.75851919,
                            longitude: 110.37817291,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324
                            }}
                            title={"title"}
                            description={"description"}
                        />
                    </MapView>
                </View>
            )

        }
        // console.warn('initial position : ', this.state.initialPosition + ' lastposition ', this.state.lastPosition)
        // console.warn('latitude ', this.state.initialPosition.latitude, ' longitude ', this.state.initialPosition.longitude)
        // return (
        //     <View style={styles.container}>
        //         <MapView
        //             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        //             style={styles.map}
        //             region={{
        //                 latitude: -7.75851919,
        //                 longitude: 110.37817291,
        //                 latitudeDelta: 0.015,
        //                 longitudeDelta: 0.0121,
        //             }}
        //         >
        //         </MapView>
        //     </View>
        // )
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