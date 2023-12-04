// Post.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Certifique-se de instalar esse pacote

interface PostProps {
  post: {
    id: number;
    text: string;
    username: string;
    likes: number;
    likedBy: string[];
  };
  onLikePress: (postId: number, like: boolean) => void;
  currentUser: string;
}

const Post: React.FC<PostProps> = ({ post, onLikePress, currentUser }) => {
  const [liked, setLiked] = useState(post.likedBy.includes(currentUser));

  const handleLike = () => {
    if (liked) {
      onLikePress(post.id, false);
      setLiked(false);
    } else {
      onLikePress(post.id, true);
      setLiked(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{post.username}</Text>
        {/* Adicionar hora da publicação */}
        <Text style={styles.time}>Publicado às 12:00</Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <TouchableOpacity onPress={handleLike}>
        <Feather
          name={liked ? 'heart' : 'heart'}
          size={24}
          color={liked ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <Text style={styles.likes}>{post.likes} curtidas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    color: '#666',
  },
  postText: {
    marginBottom: 10,
  },
  likes: {
    marginTop: 5,
  },
});

export default Post;
