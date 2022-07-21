import { StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = socketIOClient("http://192.168.0.169:3000");

function ChatScreen(props) {
    const [listMessage, setListMessage] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const emojiMap = {
        ":)": "\u263A",
        ":(": "\u2639",
        ":p": "\uD83D\uDE1B",
    }

    const emojiRegex = /:p|:\(|:\)/gi;
    const fuckWRegex = /\w*fuck\w*/gi;

    useEffect(() => {
        socket.on('sendMessageToAll', (newMessage) => {
            let emojiMessage = newMessage.currentMessage.replace(emojiRegex, (m) => emojiMap[m.toLowerCase()]);
            let fuckWordMessage = emojiMessage.replace(fuckWRegex, '\u2022\u2022\u2022');
            setListMessage([...listMessage, { ...newMessage, currentMessage: fuckWordMessage }]);
        });
        return () => socket.off();
    }, [listMessage]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    listMessage.map((message, i) => 
                        (
                            <View key={i} style={message.pseudo===props.pseudo ? styles.messageRight : styles.message}>
                                <Text style={message.pseudo===props.pseudo ? styles.titleRight : styles.title}>{message.currentMessage}</Text>
                                <Text style={message.pseudo===props.pseudo ? styles.subtitleRight : styles.subtitle}>{message.pseudo}</Text>
                            </View>
                        ))
                }
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Input placeholder='Your message...'
                    value={currentMessage}
                    onChangeText={(text) => setCurrentMessage(text)}
                />
                <Button
                    title='Send'
                    onPress={() => {
                        socket.emit('sendMessage', { currentMessage: currentMessage, pseudo: props.pseudo });
                        setCurrentMessage('')
                    }}
                    icon={
                        <FontAwesomeIcon
                            name="envelope"
                            size={15}
                            color="white"
                        />
                    }
                    buttonStyle={styles.btnContainerSend}
                />
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainerSend: {
        backgroundColor: '#eb4d4b',
    },
    message: {
        backgroundColor: '#8a8d91',
        padding: 20,
        marginVertical: 5,
        marginLeft: 16,
        marginRight: '50%',
        flex: 1,
        borderRadius: 20,
        maxWidth: '50%',
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
    },
    messageRight: {
        backgroundColor: 'rgb(0, 132, 255)',
        padding: 20,
        marginVertical: 5,
        marginRight: 16,
        marginLeft: '50%',
        flex: 1,
        borderRadius: 20,
        maxWidth: '50%',
    },
    titleRight: {
        fontSize: 16,
        textAlign: 'right',
    },
    subtitleRight: {
        fontSize: 12,
        textAlign: 'right',
    }
});

const mapStateToProps = (state) => {
    return {
        pseudo: state.userPseudo,
    }
}

export default connect(mapStateToProps, null)(ChatScreen);