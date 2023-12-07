import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native"
import { Feather } from '@expo/vector-icons';
import Post from "../../components/post";
import Comment from "../../components/comment";

export default function PostActual({ route, navigation }: any) {
    const [post, setPost] = useState<any>()
    const [newCommentText, setNewCommentText] = useState('')
    const [userId, setUserId] = useState<number>()
    const [postId, setPostId] = useState<number>()
    const [userLogged, setUserLogged] = useState()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const { postID, loggedInUser, userLogged } = route.params
        setUserId(loggedInUser)
        setPostId(postID)
        setUserLogged(userLogged)
        await fetch(`http://sdmobile-back-production.up.railway.app/api/posts/${postID}`)
            .then(response => response.json())
            .then(json => {
                setPost(json)
            })
    }

    async function handleComment() {
        try {
            const res = await fetch('http://sdmobile-back-production.up.railway.app/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentDate: new Date(),
                    text: newCommentText,
                    userId,
                    postId
                })
            })
            if (res.status != 201) {
                window.alert('Erro ao criar comentário.')
            } else {
                window.alert('Comentário adicionado com sucesso.')
                setNewCommentText('')
                navigation.navigate('Home')
            }
        } catch (e) {
            console.log('error: ', e)
        }
    }

    const handleLike = async (postId: number) => {
        try {


            await fetch(`http://sdmobile-back-production.up.railway.app/api/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    postId
                })
            })

            init()
        } catch (e) {
            console.log('erro: ', e)
        }
    };
    return post ? (
        <>
            <View style={styles.container}>
                <Post
                    key={post.id}
                    post={post}
                    onLikePress={handleLike}
                    currentUser={userId}
                    id={post.id}
                />
            </View>
            <View style={styles.container}>
                <Text style={{ marginVertical: 10, fontSize: 20, marginLeft: 15 }}>Comentarios</Text>
                <View style={styles.postInputContainer}>
                    <TextInput
                        placeholder="Digite seu comentário..."
                        value={newCommentText}
                        onChangeText={text => setNewCommentText(text)}
                        style={styles.postInput}
                    />
                    <TouchableOpacity onPress={handleComment} style={styles.postButton}>
                        <Text style={styles.postButtonText}>Comentar</Text>
                    </TouchableOpacity>
                </View>
                <Comment
                    key={post.id}
                    id={post.id}
                    userID={post.user.id}
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
    postInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginBottom: 15
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
});