import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = ({ onFormSwitch, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://129.133.190.217/homework3/Controller/RestApi/Login/login.php`,
                { username, password, login: 'login' }
            );

            if (response.data.message === 'Login successful') {
                setUser(response.data.user);
                onLogin();
            } else {
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error sending login request:', error);
            setError('An error occurred');
        }
    };

    return (
        <View style={styles.app}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formGroup}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <Button title="Login" onPress={handleSubmit} />
            {error !== '' && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity onPress={() => onFormSwitch('register')} style={styles.button}>
                <Text style={styles.RegForm}>Don't have an account? Register here</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    app: {

    },
    title: {

    },
    formGroup: {

    },
    input: {

    },
    error: {

    },
    button: {

    },
    RegForm: {

    }
});

export default Login;
