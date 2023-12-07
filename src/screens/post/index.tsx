import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons';
import Post from "../../components/post";
import Comment from "../../components/comment";

export default function PostActual({ route }: any) {
    const [postComments, setPostComments] = useState([])
    const [post, setPost] = useState<any>()
    const [liked, setLiked] = useState(true);

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const { postID } = route.params
        console.log('POSTID NO POSTATUAL: ', postID)
        await fetch(`http://sdmobile-back-production.up.railway.app/api/posts/${postID}`)
            .then(response => response.json())
            .then(json => {

                console.log('POSTTTTTT: ', json)
                setPost(json)
            }
            )
    }

    const handleLike = async () => {

        // await fetch(`http://sdmobile-back-production.up.railway.app/api/post/${postId}/like`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })

        init();
    };
    console.log(post)
    return post ? (
        <>
            <View style={styles.container}>
                <Post
                    key={post.id}
                    post={post}
                    onLikePress={handleLike}
                    currentUser={post.user.username ? post.user.username : '0'}
                />
            </View>
            <View style={styles.container}>
                <Text style={{ marginVertical: 10, fontSize: 20}}>Comentarios</Text>
                <Comment
                    key={post.id}
                    id={post.id}
                />
            </View>
        </>
    ) : (
        <></>
    )


}
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