import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const UpdateComponent = ({ songDetails, updateSong, goBack }) => {
    const [updatedSong, setUpdatedSong] = useState(songDetails.song);
    const [updatedArtist, setUpdatedArtist] = useState(songDetails.artist);
    const [updatedRating, setUpdatedRating] = useState(songDetails.rating);
    const [isRatingValid, setIsRatingValid] = useState(true);

    const validateRating = (rating) => {
        const numRating = parseInt(rating);
        return numRating >= 1 && numRating <= 5;
    }
    const handleRatingChange = (text) => {
        setUpdatedRating(text);
        setIsRatingValid(validateRating(text));
    }

    const handleUpdate = () => {
        if (validateRating(updatedRating)) {
            updateSong(songDetails.id, { song: updatedSong, artist: updatedArtist, rating: parseInt(updatedRating) });
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={updatedSong}
                onChangeText={setUpdatedSong}
                placeholder="Song Name"
            />
            <TextInput
                style={styles.input}
                value={updatedArtist}
                onChangeText={setUpdatedArtist}
                placeholder="Artist Name"
            />
            <TextInput
                style={styles.input}
                value={updatedRating}
                onChangeText={handleRatingChange}
                placeholder="Rating (1-5)"
                keyboardType="numeric"
            />
            {!isRatingValid && <Text style={styles.errorText}>Rating must be between 1 and 5</Text>}

            <View style={styles.buttonContainer}>
                <Button title="Update" onPress={handleUpdate} disabled={!isRatingValid} />
                <Button title="Go back" onPress={goBack} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
   
    },
    input: {
    
    },
    buttonContainer: {
      
    },

    errorText: {
      
    },
});

export default UpdateComponent;
