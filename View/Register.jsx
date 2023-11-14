import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';

const Register = ({ onFormSwitch, onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async () => {
        if (username === '' || password === '' || rePassword === '') {
            setError("All fields are required");
            return;
        }

        if (password.length < 10) {
            setError("Password must be at least 10 characters long");
            return;
        }

        if (password !== rePassword) {
            setError("Password doesn't match");
            return;
        }

        try {
            const response = await axios.post(
                `http://129.133.190.217/homework3/Controller/RestApi/Register/register.php`,
                { username, password, register: 'register' }
            );

            if (response.data.message === 'Register successful') {
                setUser(username);
                onRegister();
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            console.error('Error sending registration request:', err);
            setError('An error occurred');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                value={rePassword}
                onChangeText={setRePassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleSubmit} />
            {error !== '' && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={() => onFormSwitch('login')} style={styles.button}>
                <Text style={styles.LogForm}>Already have an account? Login here</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    input: {

    },
    title: {

    },
    button: {

    },
    error: {

    },
    LogForm: {

    },
});

export default Register;
