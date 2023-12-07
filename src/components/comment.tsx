import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CommentsFetch {
    id: number
    text: string
    commentDate: Date
    user: {
        id: number
        name: string
        username: string
    }
}

interface CommentProps {
    id: number
    userID: number
}

export default function Comment({ id, userID }: CommentProps) {
    const [comments, setComments] = useState<CommentsFetch[]>()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        await fetch(`http://sdmobile-back-production.up.railway.app/api/comments/${id}`)
            .then(response => response.json())
            .then(json => {
                console.log('comments: ', json)
                setComments(json);
            });
    }

    async function handleDeleteComment(commentID: number) {
        try {
            const res = await fetch('http://sdmobile-back-production.up.railway.app/api/comments', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                    id: commentID
                })
            })
            if (res.status != 204) {
                
                window.alert('Erro ao apagar comentário')
            } else {
                window.alert('Comentário apagado com sucesso')
                init()
            }

        } catch (e) {
            console.log('error: ', e)
        }

    }
    return comments ? (
        <>
            <ScrollView style={styles.scroll}>
                {comments.map((comment) => (
                    <View key={comment.id} style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.username}>{comment.user.username}</Text>
                            <Text style={styles.time}>Publicado em {new Date(comment.commentDate).toLocaleString()}</Text>
                        </View>
                        <Text style={styles.postText}>{comment.text}</Text>
                        {
                            comment.user.id == userID ? (
                                <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
                                    <Feather name="trash-2" size={20} color="black" />
                                </TouchableOpacity>
                            ) : (
                                <></>
                            )
                        }
                    </View>
                ))
                }
            </ScrollView>
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
    scroll: {
        maxHeight: '70%'
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