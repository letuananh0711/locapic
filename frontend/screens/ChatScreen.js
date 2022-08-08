import { StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements'
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
import { useEffect, useState, useRef } from 'react';

// import the environment variables from env file
import { SERVER_URL } from '@env';

//const socket = socketIOClient(SERVER_URL);

function ChatScreen(props) {
    const [listMessage, setListMessage] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    // create a ref for scroller
    const scrollRef = useRef();
    // create a ref for socket
    const socket = useRef();

    const emojiMap = {
        ":)": "\u263A",
        ":(": "\u2639",
        ":p": "\uD83D\uDE1B",
    }

    const emojiRegex = /:p|:\(|:\)/gi;
    const fuckWRegex = /\w*fuck\w*/gi;

    useEffect(() => {
        // Initialize socket when ChatScreen is mounted
        socket.current = socketIOClient(SERVER_URL);
    }, []);

    useEffect(() => {
        socket.current.on('sendMessageToAll', (newMessage) => {
            let emojiMessage = newMessage.currentMessage.replace(emojiRegex, (m) => emojiMap[m.toLowerCase()]);
            let fuckWordMessage = emojiMessage.replace(fuckWRegex, '\u2022\u2022\u2022');
            setListMessage([...listMessage, { ...newMessage, currentMessage: fuckWordMessage }]);
        });

        // Fire the scroller to scroll to the end of ScrollView
        scrollRef.current.scrollToEnd({
            animated: true,
        });

        return () => socket.current.off();
    }, [listMessage]);


    return (
        <SafeAreaView style={styles.container}>
            {/* Create a ref for the ScrollView */}
            <ScrollView ref={scrollRef}>
                {
                    listMessage.map((message, i) =>
                    (

                        <View key={i} style={[{ flex: 1 }, message.pseudo === props.pseudo ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }]}>
                            <View style={styles.message}>
                                <Text style={[styles.title, message.pseudo === props.pseudo ? styles.textRight : styles.textLeft]}>{message.currentMessage}</Text>
                                <Text style={[styles.subtitle, message.pseudo === props.pseudo ? styles.textRight : styles.textLeft]}>{message.pseudo}</Text>
                            </View>
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
                        socket.current.emit('sendMessage', { currentMessage: currentMessage, pseudo: props.pseudo });
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
        marginHorizontal: 5,
        flex: 1,
        borderRadius: 20,
        maxWidth: '65%'
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
    },
    textRight: {
        textAlign: 'right',
    },
    textLeft: {
        textAlign: 'left',
    },
});

const mapStateToProps = (state) => {
    return {
        pseudo: state.userPseudo,
    }
}

export default connect(mapStateToProps, null)(ChatScreen);