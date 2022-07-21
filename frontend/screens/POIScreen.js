import { connect } from 'react-redux';
import { StyleSheet, Text, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ListItem, Button } from 'react-native-elements'


function POIScreen(props) {
    if (props.listPOI.length === 0) {
        return (
            <SafeAreaView style={[styles.container, styles.containerCenter]}>
                <Text>No POI</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {
                        props.listPOI.map((poi, i) => (
                            <ListItem.Swipeable
                                key={`${i}-${poi.coordinate.latitude}-${poi.coordinate.longitude}`}
                                bottomDivider
                                rightContent={
                                    <Button
                                        title="Delete"
                                        onPress={() => props.deletePOI(poi)}
                                        icon={{ name: 'delete', color: 'white' }}
                                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                    />
                                }
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{poi.title}</ListItem.Title>
                                    <ListItem.Subtitle>{poi.description}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        pseudo: state.userPseudo,
        listPOI: state.listPOI,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePOI: (poi) => dispatch({ type: 'deletePOI', poi: poi }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(POIScreen);