
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import FetchLocation from './Components/FetchLocation'
import UsersMap from './Components/UsersMap'


type Props = {};
export default class App extends Component<Props> {

  state = {
      userLocation: null,
      usersPlaces: []
    };

    getUserLocationHandler = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            userLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }
          });
          fetch("https://findplaces-d9c94.firebaseio.com/places.json", {
            method: "POST",
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        },
        err => console.log(err)
      );
    };

    getUserPlacesHandler = () => {
      fetch("https://findplaces-d9c94.firebaseio.com/places.json")
        .then(res => res.json())
        .then(parsedRes => {
          const placesArray = [];
          for (const key in parsedRes) {
            placesArray.push({
              latitude: parsedRes[key].latitude,
              longitude: parsedRes[key].longitude,
              id: key
            });
          }
          this.setState({
            usersPlaces: placesArray
          });
        })
        .catch(err => console.log(err));
    };

    render() {
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <Button title="Get User Places" onPress={this.getUserPlacesHandler} />
          </View>
          <FetchLocation onGetLocation={this.getUserLocationHandler} />
          <UsersMap
            userLocation={this.state.userLocation}
            usersPlaces={this.state.usersPlaces}
          />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
