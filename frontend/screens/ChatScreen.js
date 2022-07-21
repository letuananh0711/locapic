import { StyleSheet, Text, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = socketIOClient("http://192.168.1.20:3000");

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
            let emojiMessage = newMessage.currentMessage.replace(emojiRegex, (m)=> emojiMap[m.toLowerCase()]);
            let fuckWordMessage = emojiMessage.replace(fuckWRegex, '\u2022\u2022\u2022');
            setListMessage([...listMessage, {...newMessage, currentMessage: fuckWordMessage}]);
        });
    }, [listMessage]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    listMessage.map((msg, i) => (
                        <ListItem key={i}>
                            <ListItem.Content>
                                <ListItem.Title>{msg.currentMessage}</ListItem.Title>
                                <ListItem.Subtitle>{msg.pseudo}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
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
                        socket.emit('sendMessage', {currentMessage: currentMessage, pseudo: props.pseudo});
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
    }
});

const mapStateToProps = (state) => {
    return {
        pseudo: state.userPseudo,
    }
}

export default connect(mapStateToProps, null)(ChatScreen);