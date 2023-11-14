import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import DataDisplay from './DataDisplay';
import SongRatingForm from './SongRatingForm';
import { UserProvider } from './UserContext';
import Login from './Login'; // Update this for React Native
import Register from './Register'; // Update this for React Native


export default function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [songs, setSongs] = useState([]);
  const [showSongRatingForm, setShowSongRatingForm] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegister = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  }

  // Function to toggle the SongRatingForm
  const toggleSongRatingForm = () => {
    setShowSongRatingForm(!showSongRatingForm);
  };

  // Initial data fetching when component mounts
  useEffect(() => {
    axios.get(`http://129.133.190.217/homework3/Controller/RestApi/Ratings/Read_ratings.php`)
      .then(({ data }) => setSongs(data.body || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <UserProvider>
      {loggedIn ? (
        <View style={styles.container}>
          <Text style={styles.title}>Hardcore Music App</Text>
          <DataDisplay songs={songs} setSongs={setSongs} />
          {/* Other components for logged-in state */}
          {/* Button to toggle SongRatingForm */}
          <TouchableOpacity onPress={toggleSongRatingForm} style={styles.button}>
            <Text>{showSongRatingForm ? 'Hide Rating Form' : 'Create Rating'}</Text>
          </TouchableOpacity>

          {/* Conditional rendering of SongRatingForm */}
          {showSongRatingForm && (
            <SongRatingForm setSongs={setSongs} songs={songs} />
          )}

          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Hardcore Music App</Text>
            {/* Components for non-logged-in state */}
            {currentForm === "login" ? (
              <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
            ) : (
              <Register onFormSwitch={toggleForm} onRegister={handleRegister} />
            )}
          </View>
        </ScrollView>
      )}
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 60,
    paddingBottom: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  dataAndForm: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d69f09',
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
  },
});


