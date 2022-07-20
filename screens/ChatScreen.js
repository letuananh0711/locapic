import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements'
import {connect} from 'react-redux';

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
        <View style={styles.container}>
            <Text>{props.pseudo}</Text>
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
            <Input placeholder='Your message...' />
            <Button
                title='Send'
                onPress={() => props.navigation.navigate('LocaPic')}
                icon={
                    <Icon
                        name="envelope"
                        size={15}
                        color="white"
                    />
                }
                buttonStyle={styles.btnContainerSend}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btnContainerSend: {
        backgroundColor: 'red',
    }
});

const mapStateToProps = (state) =>  {
    return {
      pseudo: state.userPseudo,
    }
}

export default connect(mapStateToProps, null)(ChatScreen);