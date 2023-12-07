import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Post from '../../components/post';


type RootStackParamList = {
  Home: { id: number; username: string; name: string };
};

const Home = ({ route, navigation }: any) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [loggedInName, setLoggedName] = useState('');
  const [posts, setPosts] = useState<any>();
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    init();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      init()
    }, [])
  );

  async function init() {
    const { id, username, name } = route.params.user;
    setLoggedInUser(id)
    setLoggedInUsername(username)
    setLoggedName(name)
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
          userId: loggedInUser
        })
      })
      if (res.status != 201) {
        
        window.alert('Erro ao criar postagem.')
      } else {
        window.alert('Postagem criada com sucesso.')
      }
      init();
      setNewPostText('');
    } catch (e) {
      console.log('error: ', e)
    }

  };

  async function handleNaviteToPost(postID: number) {
    navigation.navigate('Post', { postID, loggedInUser });
  }

  const handleLike = async (postId: number) => {
    try {

      const res = await fetch(`http://sdmobile-back-production.up.railway.app/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: loggedInUser,
          postId
        })
      })
      if(res.status != 500) {
        init();
      }
    } catch(e) {
      console.log('error: ', e)
    }
  };
  
  return posts ? (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { loggedInUser })}>
        <View style={styles.containerProfile}>
          <Image source={require('../../../assets/avatar.jpg')} style={{ borderRadius: 999, width: 50, height: 50 }} />
          <Text>{loggedInUsername}</Text>
        </View>
      </TouchableOpacity>
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
          <>
            <TouchableOpacity key={post.id} onPress={() => handleNaviteToPost(post.id)}>
              <Post
                key={post.id}
                post={post}
                onLikePress={() => handleLike(post.id)}
                currentUser={loggedInUser}
                id={post.id}
              />
            </TouchableOpacity>
          </>
        ))}
      </View>
    </ScrollView>
  ) : (
    <></>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerProfile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    gap: 5
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
