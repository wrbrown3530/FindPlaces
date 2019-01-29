import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const UsersMap = props =>{

  let userLocationMarker = null;

 if (props.userLocation) {
   userLocationMarker = <MapView.Marker coordinate={props.userLocation} />;
 }
 const usersMarkers = props.usersPlaces.map(userPlace => (
   <MapView.Marker coordinate={userPlace} key={userPlace.id} />
 ));
 return (
   <View style={styles.mapContainer}>
     <MapView
       initialRegion={{
         latitude: 40.712,
         longitude: -74.0060,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421
       }}
       region={props.userLocation}
       style={styles.map}
     >
       {userLocationMarker}
       {usersMarkers}
     </MapView>
   </View>
 );
};

const styles = StyleSheet.create({
 mapContainer: {
   width: "100%",
   height: 200,
   marginTop: 20
 },
 map: {
   width: "100%",
   height: "100%"
 }
});

export default UsersMap
