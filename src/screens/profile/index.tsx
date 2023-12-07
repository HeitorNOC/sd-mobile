import { useEffect, useState } from "react"
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

interface User {
    id: number
    username: string
    name: string
}

export default function Profile({ route, navigation }: any) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const { loggedInUser } = route.params
        await fetch(`http://sdmobile-back-production.up.railway.app/api/users/${loggedInUser}`)
            .then(response => response.json())
            .then(json => {
                setUser(json)
            })
    }

    async function handleDeleteUser() {
        if (user?.id) {
            try {
                const res = await fetch(`https://sdmobile-back-production.up.railway.app/api/users/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'text/plain',
                    }
                })
                
                if (res.status !== 204) {
                    window.alert('Erro ao apagar usuário.')
                } else {
                    window.alert('Usuário Apagado com sucesso.')
                    navigation.navigate('Welcome')
                }
            } catch (e) {
                console.log('error: ', e)
            }
        }
    }

    return (
        <View style={styles.containerProfile}>
            <View style={styles.container}> 
                <Image source={require('../../../assets/avatar.jpg')} style={{ borderRadius: 999, width: 100, height: 100, margin: 10}} />
                <View style={styles.containerText}>
                    <Text style={styles.postButtonText}>Nome: {user?.name}</Text>
                    <Text style={styles.postButtonText}>Usuário: {user?.username}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleDeleteUser} style={styles.postButton}>
                <Text style={styles.postButtonText2}>Apagar Usuário</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.7,
        borderRadius: 20,
        borderColor: 'gray',
        paddingLeft: 50
    },
    containerText: {
        display: 'flex',
        flexDirection: 'column'
    },
    containerProfile: {
        display: 'flex',
        flexDirection: 'column',

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
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#D21312',
        borderRadius: 10,
        marginTop: 20
    },
    postButtonText: {
        color: '#000',
        paddingLeft: 25,
        fontSize: 19,
        margin: 10
    },
    postButtonText2: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
});