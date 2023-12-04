import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (username == 'adm' && password == '123' || username == 'user' && password == '456') {
        setLoginMessage('Login bem sucedido.')
        const loggedUser = {
          username, 
          password,
          name: username == 'adm' ? 'administrador' : 'usuario'
        }
        navigation.navigate('Home', { user: loggedUser })
        setLoginMessage('')
        setUsername('')
        setPassword('')
      } 
      else {
        setLoginMessage('Credenciais incorretas.')
        //limpaar campos do formulario
      }
    } catch (error) {
      setLoginMessage('Erro ao fazer login. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tela de Login</Text>
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
      <TouchableOpacity onPress={handleLogin}>
        <Text>Fazer Login</Text>
      </TouchableOpacity>
      <Text>{loginMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 8,
    marginVertical: 8,
  },
});

export default Login;
