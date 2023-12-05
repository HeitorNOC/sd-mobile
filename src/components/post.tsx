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
    publicationDate: Date;
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
        <Text style={styles.time}>Publicado às {new Date(post.publicationDate).toLocaleString()}</Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
        <Feather
          name={liked ? 'heart' : 'heart'}
          size={20}
          color={liked ? 'red' : '#333'}
        />
        <Text style={styles.likeButtonText}>{post.likes}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  postText: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default Post;
