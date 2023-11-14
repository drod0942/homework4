import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeleteComponent = ({ songDetails, deleteSong, goBack }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Are you sure you want to delete this?</Text>
            <View style={styles.buttonContainer}>
                <Button title="Delete" onPress={() => deleteSong(songDetails.song)} />
                <Button title="Go back" onPress={goBack} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 20,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default DeleteComponent;
