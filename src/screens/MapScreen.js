import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList } from 'react-native'
import { Actions } from "react-native-router-flux";
import { ScrollView } from 'react-native-gesture-handler';
import MapView from "react-native-maps";

export default class MapScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: 18.516726,
                longitude: 73.856255,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                latitude: 37.78825,
                longitude: 37.78825,
            }],
            AssignToMeArray:[]
        }

    }
    onRegionChange(region) {
        // this.setState({
        //     region})
            // this.setState({region:region})
       
    }
           

    componentWillUnmount() {
        if (this.props.reloadScreenData) this.props.reloadScreenData()
    }

    async componentDidMount() {
        this._getValues()
    }

    _getValues = async () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
    
        fetch("https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            this.setState({ AssignToMeArray: result })
    
          })
          .catch(error => {
            console.log('error', error)
          });
    
    
      }
    
    _renderMiddle = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.loginTitleStyle}>
                    <Text style={{
                        fontSize: 18,
                        padding: 5,
                        margin: 10,
                        alignSelf: "flex-start",
                        color: "black",
                    }}>{"Assign To Me"}</Text>
                </View>
            </View>
        )
    }

    _renderBack() {
        return (
            <TouchableOpacity onPress={Actions.pop} style={{ padding: 16 }}>
                <Image
                    style={{
                        width: 30,
                        height: 24,
                        marginTop: 0,
                        alignSelf: 'center',
                        tintColor: "black"
                    }}
                    resizeMode='contain'
                    source={require('../assets/images/ic_back_btn.png')}
                />

            </TouchableOpacity>
        )
    }

    _renderToolbar = () => {
        return (
            <View style={{ flexDirection: "row", backgroundColor: "orange" }}>
                {this._renderBack()}
                {this._renderMiddle()}
            </View>
        )
    }
    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderToolbar()}
                <ScrollView>
                    <View style={{ flex: 1, }}>
                        <MapView
                            style={styles.map}
                            setCamera={10}
                            // initialRegion={this.state.region}
                            showsUserLocation={true}
                            onMapReady={this.onMapReady}
                            onRegionChangeComplete={this.onRegionChange}>
                                {this.state.AssignToMeArray.map(marker => (
                            <MapView.Marker
                                coordinate={{ "latitude": marker.latitude, "longitude": marker.longitude }}
                                title={marker.title}
                                draggable
                            />
                            ))}
                        </MapView>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: "white"
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#EFEFEF"
    },
    map: {
        height:700,
        marginTop: 0
    },
    backButtonImage: {
        width: 30,
        height: 24,
        marginTop: 0,
        alignSelf: 'center',
        tintColor: "gray"
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18, //half radius will make it cirlce,
        backgroundColor: 'red'
    },
    count: { color: '#FFF' }

})