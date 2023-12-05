import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function Welcome({ navigation }: any) {
    return (
     <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Fazer Login</Text>
      </TouchableOpacity>
      {/* <Text style={styles.loginMessage}>{loginMessage}</Text> */}
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