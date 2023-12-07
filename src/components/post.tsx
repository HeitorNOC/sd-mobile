import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

interface PostsFetch {
  id: number
  text: string
  postDate: Date
  user: {
      id: number
      name: string
      username: string
  }
}

const Post: React.FC<any> = ({ post, onLikePress, currentUser, id }) => {
  const [liked, setLiked] = useState(post.likedBy.includes(currentUser))
  const [posts, setPosts] = useState<PostsFetch[]>()
  
  const handleLike = () => {
    if (liked) {
      onLikePress(post.id, false);
      setLiked(false);
    } else {
      onLikePress(post.id, true);
      setLiked(true);
    }
  };

  async function handleDeletePost(postID: number) {
    try {
        const res = await fetch('http://sdmobile-back-production.up.railway.app/api/posts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: currentUser,
                postId: postID
            })
        })
        if (res.status != 204) {
            window.alert('Erro ao apagar a postagem.')
        } else {
            window.alert('Postagem apagada com sucesso.')
          
        }

    } catch (e) {
        console.log('error: ', e)
    }

}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/avatar.jpg')} style={{ borderRadius: 999, width: 50, height: 50}} />
        <View style={styles.usernameContainer}>
          <Text style={styles.name}>{post.user.name}</Text>
          <Text style={styles.username}>{'@'+post.user.username}</Text>
        </View>
      {
          post.user.id == currentUser ? (
            <View style={styles.trash}>
              <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                  <Feather name="trash-2" size={20} color="black" />
              </TouchableOpacity>
            </View>
            ) : (
            <></>
          )
      }     
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <Feather
            name={liked ? 'heart' : 'heart'}
            size={20}
            color={liked ? 'red' : '#333'}
          />
          <Text style={styles.likeButtonText}>{post.likes}</Text>
          {<Text style={styles.time}>Publicado em {new Date(post.publicationDate).toLocaleString()}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    paddingBottom: 6,
    paddingTop: 5,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 8,
  },
  trash: {
    marginTop: 10,
    marginLeft: 10
  },
  usernameContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  likeContainer: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  username: {
    fontSize: 10
  },
  time: {
    color: '#666',
    fontSize: 12,
    marginTop: 15,
    margin: 10,
    marginLeft: 10
  },
  postText: {
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 17,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  likeButtonText: {
    marginLeft: 5,
    marginRight: 100,
    fontSize: 14,
    color: '#333',
  },
});

export default Post;
