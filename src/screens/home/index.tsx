import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Post from '../../components/post';
import { AntDesign } from '@expo/vector-icons';

type RootStackParamList = {
  Home: { id: number; username: string; name: string };
};

const Home = ({ route }: any) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    init();
    
  }, []);

  async function init() {
    const { id, username, name } = route.params.user;
    setLoggedInUser(id)
    setLoggedInUsername(username)
    await fetch('http://sdmobile-back-production.up.railway.app/api/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      });
  }

  const handlePost = async () => {
    try {
       const res = await fetch('http://sdmobile-back-production.up.railway.app/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newPostText,
          publicationDate: new Date(),
          likedBy: [],
          likes: 0,
          username: loggedInUsername
        })
      })
      if (res.status != 201) {
        window.alert('Erro ao criar post.')
      } 
      init();
      setNewPostText('');
    } catch (e) {
      console.log('error: ', e)
    }

    



  };

  const handleLike = async (postId: number) => {

    // await fetch(`http://sdmobile-back-production.up.railway.app/api/posts/${postId}/like`, {
    //   method: 'POST',
    // });
    // Após curtir o post, atualizar a lista de posts
    init();
  };

  return ( 
    <ScrollView style={styles.container}>

      <View style={styles.postInputContainer}>
        <TextInput
          placeholder="Digite seu post..."
          value={newPostText}
          onChangeText={text => setNewPostText(text)}
          style={styles.postInput}
        />
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Postar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        {posts.map((post: any) => (
          <Post
            key={post.id}
            post={post}
            onLikePress={() => handleLike(post.id)}
            currentUser={loggedInUser ? loggedInUser : '0'}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  postInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 8,
  },
  postButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default Home;
