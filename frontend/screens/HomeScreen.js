import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import imageBackground from '../assets/home.jpg';

import { connect } from 'react-redux';

function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
                <Input
                    placeholder='Antoine'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='red'
                        />
                    }
                    containerStyle={styles.inputContainerHome}
                    onChangeText={(value) => props.setPseudo(value)}
                    value={props.pseudo}
                />
                <Button
                    title='Go to Map'
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="red"
                        />
                    }
                    containerStyle={styles.btnContainerHome}
                    onPress={() => props.navigation.navigate('LocaPic')}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center"
    },
    inputContainerHome: {
        paddingLeft: '20%',
        width: '80%',
    },
    btnContainerHome: {
        paddingLeft: '30%',
        width: '70%',
    },
});

const mapStateToProps = (state) => {
    return {
        pseudo: state.userPseudo,
    };
} 

const mapDispatchToProps = (dispatch) => {
    return {
        setPseudo: (pseudo) => {
            dispatch({type: 'savePseudo', pseudo: pseudo});
        },
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);