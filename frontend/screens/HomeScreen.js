import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import imageBackground from '../assets/home.jpg';

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

function HomeScreen(props) {

    const [isPseudoStorage, setIsPseudoStorage] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('pseudo', (error, data) => {
            console.log(data);
            if (data) {
                setIsPseudoStorage(true);
                props.setPseudo(data);
            }
        })
    }, [])

    if (props.pseudo && isPseudoStorage) {
        return (
            <View style={styles.container}>
                <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
                    <View style={{ marginHorizontal: '15%', marginVertical: '10%' }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', }}>Welcome back {props.pseudo}</Text>
                    </View>
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
                    <Button
                        title='Logout'
                        icon={
                            <Icon
                                name="sign-out"
                                size={15}
                                color="red"
                            />
                        }
                        containerStyle={styles.btnContainerHome}
                        onPress={() => {
                            AsyncStorage.removeItem('pseudo');
                            setIsPseudoStorage(false);
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
                    <Input
                        placeholder='Antoine'
                        leftIcon={<Icon name='user' size={24} color='red' />}
                        containerStyle={styles.inputContainerHome}
                        value={props.pseudo}
                        onChangeText={(value) => {
                            props.setPseudo(value);
                        }}
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
                        onPress={() => {
                            // save to local storage the pseudo
                            AsyncStorage.setItem('pseudo', props.pseudo);
                            props.navigation.navigate('LocaPic');
                        }}
                    />
                </ImageBackground>
            </View>
        );
    }
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
        marginVertical: 10,
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
            dispatch({ type: 'savePseudo', pseudo: pseudo });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);