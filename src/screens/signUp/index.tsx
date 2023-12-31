import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUp = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isOver18, setIsOver18] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');

  const handleAgeConfirmation = () => {
    setIsOver18(!isOver18); 
  };

  async function handleSignUp  ()  {
    if (!isOver18) {
      setSignUpMessage('É necessário ter mais de 18 anos para criar uma conta.');
      return;
    }
    try {
      const res = await fetch('http://sdmobile-back-production.up.railway.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          name,
          password
        })
      }) 
      if(res.status !== 201) {
        window.alert('Erro ao criar o usuário.')
      } else {
        window.alert('Usuário Criado com sucesso, faça o login.')
        navigation.navigate('Login')
      }
    } catch(e) {
      console.log('error: ', e)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
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
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAgeConfirmation} style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>{isOver18 ? '✓' : '○'}</Text>
        <Text style={styles.checkboxText}>Tenho mais de 18 anos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Criar Conta</Text>
      </TouchableOpacity>
      <Text style={styles.signUpMessage}>{signUpMessage}</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginRight: 8,
    fontSize: 20,
  },
  checkboxText: {
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpMessage: {
    marginTop: 10,
    color: 'red',
  },
});

export default SignUp;
