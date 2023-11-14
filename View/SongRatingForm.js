import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';
import { Rating } from 'react-native-ratings'; // You may need to install this package

const SongRatingForm = ({ setSongs }) => {
    const { user } = useUser();

    // Default state
    const defaultNewSong = { username: user, artist: '', song: '', rating: 0 };
    const [newSong, setNewSong] = useState(defaultNewSong);

    const ratingChanged = (newRating) => {
        setNewSong({ ...newSong, rating: newRating });
    };

    const handleCreate = async () => {

        if (newSong.artist === '' || newSong.song === '' || newSong.rating === 0) {
            Alert.alert("Error", "All fields must be filled");
            return;
        }

        // Check for duplicate song on the server side.
        const songsRes = await axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        const existingRating = songsRes.data.body.find((s) => s.artist === newSong.artist && s.song === newSong.song);
        if (existingRating) {
            Alert.alert('This song has already been rated!');
            return;
        }

        const response = await axios.post(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/create-rating.php`, newSong);
        // fetching the new Song List
        const res = await axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list

        // Reset the form
        setNewSong(defaultNewSong);
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Song Rating</Text>
            <TextInput
                style={styles.input}
                placeholder="Artist"
                value={newSong.artist}
                onChangeText={text => setNewSong({ ...newSong, artist: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Song"
                value={newSong.song}
                onChangeText={text => setNewSong({ ...newSong, song: text })}
            />
            <Rating
                type='custom'
                ratingCount={5}
                tintColor="#000"
                startingValue={newSong.rating}
                imageSize={24}
                onFinishRating={ratingChanged}
                style={{ paddingVertical: 10 }}
            />
            <Button title="Create" onPress={handleCreate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    title: {

    },
    input: {

    },

});

export default SongRatingForm;
