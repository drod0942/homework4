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

  },
  title: {

  },
  dataAndForm: {

  },
  button: {

  },
});


