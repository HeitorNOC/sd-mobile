import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
}

export default function Comment({ id }: CommentProps) {
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
    return comments ? (
        <>
            {comments.map((comment) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{comment.user.username}</Text>
                        <Text style={styles.time}>Publicado às {new Date(comment.commentDate).toLocaleString()}</Text>
                    </View>
                    <Text style={styles.postText}>{comment.text}</Text>
                </View>
            ))
            }
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