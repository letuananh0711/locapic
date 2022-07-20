import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';

function MapScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.container}>{props.pseudo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 20,
    color: 'black',
  },
});

const mapStateToProps = (state) =>  {
  return {
    pseudo: state.userPseudo,
  }
}

export default connect(mapStateToProps, null)(MapScreen);