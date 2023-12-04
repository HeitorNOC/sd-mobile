// Home.tsx

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Post from '../../components/post';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { userId: string; username: string; fullName: string };
};

// Definindo tipos para route e navigation props


const Home = ({ route }: any) => {
  const { userId, username, fullName } = route.params;

  const [loggedInUser, setLoggedInUser] = useState(userId);

  const [posts, setPosts] = useState([
    { id: 1, text: 'Post 1', username: 'user', likes: 1, likedBy: ['adm'] },
    { id: 2, text: 'Post 2', username: 'adm', likes: 0, likedBy: [] },
    // ... Outros posts
  ]);

  const handleLikePost = (postId: number, like: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const likedBy = post.likedBy.slice();

          if (like) {
            if (!likedBy.includes(loggedInUser)) {
              likedBy.push(loggedInUser);
              return { ...post, likes: post.likes + 1, likedBy };
            }
          } else {
            const index = likedBy.indexOf(loggedInUser);
            if (index > -1) {
              likedBy.splice(index, 1);
              return { ...post, likes: post.likes - 1, likedBy };
            }
          }
        }
        return post;
      })
    );
  };

  return (
    <ScrollView>
      <View>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLikePress={handleLikePost}
            currentUser={loggedInUser}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
