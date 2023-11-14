import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext'; // Make sure UserContext is adapted for React Native
import UpdateComponent from './UpdateComponent'; // Adapt this for React Native
import DeleteComponent from './DeleteComponent'; // Adapt this for React Native
import Icon from 'react-native-vector-icons/FontAwesome5';

const DataDisplay = ({ songs, setSongs }) => {
    const { user } = useUser();
    const [mode, setMode] = useState('display');
    const [selectedSong, setSelectedSong] = useState(null);
    const [likedSongs, setLikedSongs] = useState(new Set());


    const updateSong = async (songId, songUpdate) => {
        await axios.post(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/update.php`, {
            id: songId,
            username: user,
            artist: songUpdate.artist,
            song: songUpdate.song,
            rating: songUpdate.rating,
        });
        // After the update, fetch the data again to refresh the list
        const res = await axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list
        setMode('display');
    }

    const deleteSong = async (song) => {
        await axios.delete(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/delete.php?song=${song}`);
        // After the delete, fetch the data again to refresh the list
        const res = await axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
        setSongs(res.data.body || []) // update songs list
        setMode('display');
    }

    const handleUpdate = (song) => {
        setSelectedSong(song);
        setMode('update');
    }

    const handleDelete = (song) => {
        setSelectedSong(song);
        setMode('delete');
    }

    const goBack = () => {
        setSelectedSong(null);
        setMode('display');
    }


    const handleLike = async (song) => {
        try {
            const response = await axios.post(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/update-likes.php`, {
                id: song.id,
                username: user
            });

            if (response.data.action === "liked") {
                setLikedSongs(new Set([...likedSongs, song.id]));
            } else if (response.data.action === "unliked") {
                const newLikedSongs = new Set(likedSongs);
                newLikedSongs.delete(song.id);
                setLikedSongs(newLikedSongs);
            }

            // Refresh the list to show updated likes
            const res = await axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`);
            setSongs(res.data.body || []);
        } catch (error) {
            console.error("Error updating likes: ", error);
        }
    };





    const renderItem = ({ item }) => (
        // console.log(`Song ID: ${item.id}, Liked: ${likedSongs.has(item.id)}`),
        < View style={styles.row} >
            <View style={styles.cellIcons}>
                <Text style={styles.cell}>{item.likes}</Text>
                <TouchableOpacity onPress={() => handleLike(item)}>
                    <Icon
                        name={likedSongs.has(item.id) ? "thumbs-up" : "thumbs-up"} // Change icon name based on like status
                        solid={likedSongs.has(item.id)} // When solid is true, the solid version of the icon is used
                        size={18}
                        color="#fff"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.cell}>Posted by {item.username}</Text>
            <Text style={styles.cell}>{item.song} by {item.artist}</Text>
            <Text style={styles.cell}>
                {Array.from({ length: item.rating }).map((_, i) => '⭐️').join('')}
            </Text>
            {
                user === item.username && (
                    <View style={styles.cellIcons}>
                        <TouchableOpacity onPress={() => handleUpdate(item)}>
                            {/* <Text>Update</Text> */}
                            <Icon
                                name="pen"
                                size={18}
                                color="#fff"
                                style={styles.updateIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                            {/* <Text>Delete</Text> */}
                            <Icon
                                name="trash"
                                size={18}
                                color="#fff"
                                style={styles.trashIcon}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View >
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>You are logged in as user: <Text style={styles.bold}>{user}</Text></Text>
            <Text style={styles.title}>Song Ratings</Text>
            {mode === 'display' ? (
                <FlatList
                    data={songs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    style={styles.flatList}
                />
            ) : mode === 'update' ? (
                <UpdateComponent songDetails={selectedSong} updateSong={updateSong} goBack={goBack} />
            ) : (
                <DeleteComponent songDetails={selectedSong} deleteSong={deleteSong} goBack={goBack} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {


    },
    flatList: {

    },
    header: {

    },
    bold: {
    },
    title: {

    },
    row: {

    },
    cell: {

    },
    cellIcons: {

    },

    trashIcon: {

    },

    icon: {

    },
});



export default DataDisplay;
