import { StyleSheet, Text, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

const chats = [
    {
        name: 'Antoine',
        content: 'Coucou, ça va ?',
    },
    {
        name: 'Alice',
        content: 'Oui, ça va et toi ?',
    },
    {
        name: 'Antoine',
        content: 'Je vais bien, merci !',
    },
    {
        name: 'Antoine',
        content: 'Coucou, ça va ?',
    },
    {
        name: 'Alice',
        content: 'Oui, ça va et toi ?',
    },
    {
        name: 'Antoine',
        content: 'Je vais bien, merci !',
    },
    {
        name: 'Antoine',
        content: 'Coucou, ça va ?',
    },
    {
        name: 'Alice',
        content: 'Oui, ça va et toi ?',
    },
    {
        name: 'Antoine',
        content: 'Je vais bien, merci !',
    },
    {
        name: 'Antoine',
        content: 'Coucou, ça va ?',
    },
    {
        name: 'Alice',
        content: 'Oui, ça va et toi ?',
    },
    {
        name: 'Antoine',
        content: 'Je vais bien, merci !',
    },
]

function ChatScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    chats.map((c, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{c.content}</ListItem.Title>
                                <ListItem.Subtitle>{c.name}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Input placeholder='Your message...' />
                <Button
                    title='Send'
                    onPress={() => props.navigation.navigate('LocaPic')}
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