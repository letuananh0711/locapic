import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Button, Overlay, Input } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


function MapScreen(props) {

  const [currentLatitude, setCurrentLatitude] = useState(45.764043);
  const [currentLongitude, setCurrentLongitude] = useState(4.835659);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [poi, setPOI] = useState({});
  const [titlePOI, setTitlePOI] = useState('');
  const [descriptionPOI, setDescriptionPOI] = useState('');

  const [visibleOverlayPOI, setVisibleOverlayPOI] = useState(false);

  const toggleOverlayPOI = () => {
    setVisibleOverlayPOI(!visibleOverlayPOI);
  };

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        //let currrentLocation = await Location.getCurrentPositionAsync({});
        //console.log(currrentLocation);
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
        });
      }
    }
    askPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Overlay
        isVisible={visibleOverlayPOI}
        onBackdropPress={toggleOverlayPOI}
        overlayStyle={styles.overlayContainer}
      >
        <Input placeholder='Title'
          onChangeText={(value) => setTitlePOI(value)}
          value={titlePOI}
        />
        <Input placeholder='Description' 
          onChangeText={(value) => setDescriptionPOI(value)}
          value={descriptionPOI}
        />
        <Button
          title='Add POI'
          icon={
            <FontAwesomeIcon
              name="map-marker"
              size={15}
              color="white"
            />
          }
          buttonStyle={styles.btnContainerAddActive}
          onPress={() => {
            props.addPOI({coordinate: poi, title: titlePOI, description: descriptionPOI});
            setAddPOI(false);
            setTitlePOI('');
            setDescriptionPOI('');
            toggleOverlayPOI();
          }
          }
        />
      </Overlay>
      <MapView
        provider='google'
        style={styles.mapView}
        initialRegion={{
          //latitude: 48.866667, // Paris
          //longitude: 2.333333, // Paris
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onPress={(e) => {
          if (addPOI) {
            setPOI(e.nativeEvent.coordinate);
            toggleOverlayPOI();
          }
        }}
      >
        <Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude
          }}
          title="Hello"
          description="I am here"
          pinColor="red"
        />
        {props.listPOI.map((m) => (
          <Marker
            key={`${m.id}_${m.coordinate}_${m.description}`}
            coordinate={m.coordinate}
            title={m.title}
            description={m.description}
            pinColor="blue"
          />
        ))}
      </MapView>
      <Button
        title={addPOI ? 'Please touch the map ' : 'Add POI'}
        icon={
          <FontAwesomeIcon
            name="map-marker"
            size={15}
            color="white"
          />
        }
        buttonStyle={addPOI ? styles.btnContainerAddDisabled : styles.btnContainerAddActive}
        onPress={() => setAddPOI(!addPOI)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  mapView: {
    flex: 1,
  },
  btnContainerAddActive: {
    backgroundColor: '#eb4d4b',
  },
  btnContainerAddDisabled: {
    backgroundColor: '#cccccc',
  },
  overlayContainer: {
    width: '80%',
    height: '80%',
  }
});

const mapStateToProps = (state) => {
  return {
    pseudo: state.userPseudo,
    listPOI: state.listPOI,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addPOI: (poi) => dispatch({ type: 'addPOI', poi: poi }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);