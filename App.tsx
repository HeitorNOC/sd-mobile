import { StatusBar, View } from 'react-native';
import { styles } from './style';
import Navigation from './navigation';
import Login from './src/screens/auth';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}