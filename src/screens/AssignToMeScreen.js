import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList, TextInput } from 'react-native'
import { Actions } from "react-native-router-flux";
import Modal from 'react-native-modal';

export default class AssignToMeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      AssignToMeArray: [],
      AssignToMeArrayTemp: [],
      searchTvShowString: '',
      isFilterVisible: false,
      itemClickId:0

    }

  }
  _openDetailScreen = (item) => {
   
   if(this.state.itemClickId==0){
    this.setState({itemClickId:item.id})

   }else{
    this.setState({itemClickId:0})

   }


  }
  _onSearchButtonClick = () => {
    if (this.state.searchTvShowString) {
      this._searchTvShow(this.state.searchTvShowString)
    } else {
      alert("Please enter valid text")
    }

  }

  _reloadData = () => {
    // this._getValues()
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
        this.setState({ AssignToMeArrayTemp: result })

      })
      .catch(error => {
        console.log('error', error)
      });


  }

  _onRerfreshClcik = async () => {
    this.setState({ AssignToMeArray: [] })
    this._getValues()
  }
  _onMapClick = async () => {
    Actions.push("MapScreen")
  }

  _onFilterBtnClick = async () => {
    this.setState({ isFilterVisible: true })
    this._getValues()

  }
  _onFilterFirst = async () => {
    const newData = this.state.AssignToMeArray.filter((item) => {
      return item.status == 'Red';
    })
    this.setState({
      AssignToMeArray: newData
    });
    this.setState({ isFilterVisible: false })
  }
  _onFilterSec = async () => {
    const newData = this.state.AssignToMeArray.filter((item) => {
      return item.status == 'Crimson';
    })
    this.setState({
      AssignToMeArray: newData
    });
    this.setState({ isFilterVisible: false })
  }
  _onFilterThird = async () => {
    const newData = this.state.AssignToMeArray.filter((item) => {
      return item.status == 'Teal';
    })
    this.setState({
      AssignToMeArray: newData
    });
    this.setState({ isFilterVisible: false })
  }
  _onFilterFour = async () => {
    const newData = this.state.AssignToMeArray.filter((item) => {
      return item.status == 'Yellow';
    })
    this.setState({
      AssignToMeArray: newData
    });
    this.setState({ isFilterVisible: false })
  }
  _renderMiddle = () => {
    return (

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.loginTitleStyle}>
          <Text style={{
            fontSize: 18,
            padding: 5,
            margin: 10,
            fontStyle: "bold",
            alignSelf: "flex-start",
            color: "white",
          }}>{"Assigned to Me"}</Text>
        </View>
      </View>
    )
  }
  _renderToolbar = () => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#FF8F0F" }}>
        {this._renderMiddle()}
        {this._renderRefresh()}
        {this._renderLocation()}
      </View>
    )
  }
  _renderRefresh() {
    return (
      <TouchableOpacity onPress={() => this._onRerfreshClcik()} style={{ padding: 16 }}>
        <Image
          style={{
            width: 24,
            height: 24,
            marginTop: 0,
            alignSelf: 'center',
            tintColor: "white"
          }}
          resizeMode='contain'
          source={require('../assets/images/icon_refresh.png')}
        />
      </TouchableOpacity>
    )
  }
  _renderLocation() {
    return (
      <TouchableOpacity onPress={() => this._onMapClick()} style={{ padding: 16 }}>
        <Image
          style={{
            width: 24,
            height: 24,
            marginTop: 0,
            alignSelf: 'center',
            tintColor: "white"
          }}
          resizeMode='contain'
          source={require('../assets/images/icon_location.png')}
        />

      </TouchableOpacity>
    )
  }
  _renderMessageItem = (item) => {
    console.log("" + item)
    return (
        <View
          style={{
            margin: 0,
            marginTop: 20,
            borderRadius: 5,
            backgroundColor: "white",
            elevation: 2,
            flexDirection: "column"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", padding: 15 }}>

            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#FD8000',
              borderStyle: 'solid',
              backgroundColor: item.status.toLowerCase(),
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: "white" }}>{item.title.charAt(0).toUpperCase()}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "column", marginStart: 8, justifyContent: "center" }}>

              <Text style={{
                fontSize: 20,
                alignSelf: "flex-start",
                color: "#141312",
                fontStyle: "bold"
              }}>{item.title}</Text>

              <Text style={{
                fontSize: 16,
                alignSelf: "flex-start",
                color: "#5B5A5A",
              }}>{item.subtitle}</Text>

            </View>

            <Text style={{
              fontSize: 16,
              alignSelf: "flex-start",
              color: "#141312",
              fontStyle: "bold",
              borderRadius: 10,
              paddingStart: 8,
              paddingEnd: 8,
              color: "white",
              fontStyle: "bold",
              fontSize: 14,
              backgroundColor: item.status.toLowerCase()
            }}>{item.status.toLowerCase()}</Text>

          </View>

          <View style={{
            height: .1,
            width: '100%',
            borderRadius: 0,
            borderTopWidth: 1,
            borderColor: 'gray',
            borderStyle: 'dotted'
          }} />

          <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
            <Image
              style={{
                width: 30,
                height: 24,
                marginTop: 0,
                alignSelf: 'center',
                tintColor: "#969089",
                marginStart: 20
              }}
              resizeMode='contain'
              source={require('../assets/images/icon_date.png')}
            />
            <Text style={{
              fontSize: 16,
              marginStart: 10,
              alignSelf: "flex-start",
              color: "#969089",
              fontStyle: "bold",
              flex: 1, flexWrap: 'wrap'
            }}>{"Created : " + item.created}</Text>
            <Image
              style={{
                width: 30,
                height: 24,
                alignItems: "flex-end",
                alignContent: "flex-end",
                alignContent: "flex-end",
                marginTop: 0,
                alignSelf: 'center',
                tintColor: "red"
              }}
              resizeMode='contain'
              source={require('../assets/images/icon_error.png')}
            />

          </View>

          <View style={{
            height: .1,
            width: '100%',
            borderRadius: 0,
            borderTopWidth: 1,
            borderColor: 'gray',
            borderStyle: 'dotted'
          }} />

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              style={{
                width: 30,
                height: 24,
                marginTop: 0,
                alignSelf: 'center',
                tintColor: "#969089",
                marginStart: 20
              }}
              resizeMode='contain'
              source={require('../assets/images/icon_menu.png')}
            />
            <Text style={{
              fontSize: 16,
              alignSelf: "flex-start",
              color: "black",
              flexShrink: 1,
              fontStyle: "bold",
              marginStart: 10,
              flexWrap: 'wrap'
            }}>{item.short_desc}</Text>

          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              style={{
                width: 30,
                height: 24,
                marginTop: 0,
                alignSelf: 'center',
                tintColor: "#969089",
                marginStart: 20
              }}
              resizeMode='contain'
              source={require('../assets/images/icon_task.png')}
            />
            <Text style={{
              fontSize: 16,
              flexShrink: 1,
              marginStart: 10,
              alignSelf: "flex-start",
              color: "black",
              fontStyle: "bold",
              marginEnd: 5,
              flexWrap: 'wrap'
            }}>{item.long_desc}</Text>

          </View>

          <TouchableOpacity onPress={() => this._openDetailScreen(item)} style={{ padding: 0 }}>
          <Image
            style={{
              width: 20,
              height: 20,
              marginTop: 0,
              alignSelf: 'center',
              tintColor: "#969089",
              marginTop: 10,
              marginBottom: 10
            }}
            resizeMode='contain'
            source={require('../assets/images/icon_down.png')}
          />
          {this.state.itemClickId===item.id ?
           <Text style={{
              fontSize: 16,
              flexShrink: 1,
              marginStart: 10,
              alignSelf: "center",
              color: "green",
              fontStyle: "bold",
              marginEnd: 5,
              flexWrap: 'wrap'
            }}>{"Location :"+"("+item.latitude+" "+item.longitude+")"}</Text>
          :null}
          </TouchableOpacity>
        </View>
    
    )
  }
  handleSearchInput = (searchText) => {
    this.setState({ searchTvShowString: searchText })
    let filteredData = this.state.AssignToMeArray.filter(function (item) {
      return item.title.includes(searchText);
    });

    if (!searchText || searchText === '') {
      this.setState({ AssignToMeArray: this.state.AssignToMeArrayTemp });
    } else {
      this.setState({ AssignToMeArray: filteredData });
    }

  };
  _onBack = () => {
    this.setState({ isFilterVisible: false })
  }
  _onBackDrop = () => {
    this.setState({ isFilterVisible: false })

  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderToolbar()}
        <View style={{ flex: 1, margin: 15, borderRadius: 10, flexDirection: "column" }}>

          <View style={{ flexDirection: "row" }}>

            <View style={{ alignContent: "center" }}>

              <View style={{
                width: 250,
                flexDirection: "row", color: "black",
                backgroundColor: 'white', fontSize: 20, marginBottom: 10,
                borderRadius: 5, borderColor: "black", borderWidth: 1, alignItems: "center",
                alignContent: "center"
              }}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginStart: 10,
                    resizeMode: "cover",
                  }}
                  resizeMode='contain'
                  source={require('../assets/images/icon_search.png')}
                />
                <TextInput
                  style={{
                    padding: 15, marginStart: 5, marginEnd: 15,
                    height: 5, width: "72%", height: 50, fontSize: 18,
                    alignItems: "center"
                  }}
                  placeholder="Search Task"
                  onChangeText={(searchTvShowString) => { this.handleSearchInput(searchTvShowString) }}
                />
              </View>

            </View>

            <View style={{
              flexDirection: "row", flex: 1, padding: 12,
              borderRadius: 10,
              marginStart: 5,
              alignItems: "center",
              marginTop: 5,
              backgroundColor: "#FF8000", height: 40, width: 40
            }}>
              <TouchableOpacity style={{ flexDirection: "row", flex: 1 }}
                onPress={() => this._onFilterBtnClick()}>
                <Text style={{
                  fontSize: 18,
                  color: "white",
                  fontStyle: "bold",
                }}>{"Filter"}</Text>
                <Image
                  style={{
                    width: 20,
                    height: 25,
                    tintColor: "white",
                    resizeMode: "cover",
                  }}
                  resizeMode='contain'
                  source={require('../assets/images/icon_filter.png')}
                />
              </TouchableOpacity>
            </View>

          </View>

          <FlatList
            style={{ marginBottom: 10 }}
            data={this.state.AssignToMeArray}
            extraData={this.state}
            renderItem={({ item }) => this._renderMessageItem(item)}
            keyExtractor={item => item.key}
          />
          <Modal
            isVisible={this.state.isFilterVisible}
            backdropOpacity={0.80}
            onBackButtonPress={() => this._onBack()}
            onBackdropPress={() => this._onBackDrop()}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
              <View style={{
                flexDirection: 'column',
                borderRadius: 16,
                justifyContent: 'center',
                shadowRadius: 16,
                backgroundColor: 'white',
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                height: '25%',
              }}>
                <View style={{ flexDirection: 'row', margin: 16 }}>
                  <View style={styles.innerViewStyle}>
                    <Text style={{
                      fontSize: 20, fontWeight: 'bold',
                      color: "black", textAlign: "center"
                    }}>{"CHOOSE OPTION FROM BELOW"}</Text>
                    <TouchableOpacity onPress={() => this._onFilterFirst()}>
                      <View>
                        <Text style={{ marginStart: 5, fontSize: 18, marginBottom: 5, marginTop: 5 }}>Red</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._onFilterSec()}>
                      <View>
                        <Text style={{ marginStart: 5, fontSize: 18, marginBottom: 5 }}>{"Crimson"}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._onFilterThird()}>
                      <View>
                        <Text style={{ marginStart: 5, fontSize: 18, marginBottom: 5 }}>{"Teal"}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._onFilterFour()}>
                      <View >
                        <Text style={{ marginStart: 5, fontSize: 18, marginBottom: 5 }}>{"Yellow"}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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
    backgroundColor: "#F4F4F3"
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