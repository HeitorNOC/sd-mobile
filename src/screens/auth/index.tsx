// Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://sdmobile-back-production.up.railway.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (res.status === 200) {
        setLoginMessage('Login bem sucedido.');
        navigation.navigate('Home', { user: json });
        setLoginMessage('');
        setUsername('');
        setPassword('');
      } else {
        setLoginMessage('Credenciais incorretas.');
      }
    } catch (error) {
      setLoginMessage('Erro ao fazer login. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Fazer Login</Text>
      </TouchableOpacity>
      <Text style={styles.loginMessage}>{loginMessage}</Text>

      {/* Linha de separação e botão "Criar Conta" */}
      <View style={styles.separator} />
      <Text style={styles.createAccountText}>Ainda não possui uma conta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginMessage: {
    marginTop: 10,
    color: 'red',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 20,
  },
  createAccountText: {
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
