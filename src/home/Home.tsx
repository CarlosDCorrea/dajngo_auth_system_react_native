import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, Button, Pressable } from 'react-native';

import { AuthContext } from '../auth/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomePage({ navigation }) {
    const [users, setUsers] = useState([]);
    const [state, setState] = useState(false);

    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        console.log('execution after a state change::', state);
    }, [state]);

    useEffect(() => {
        AsyncStorage.getItem('accessToken').
            then(accessToken => {
                console.log('accessToken::', accessToken);
                if (accessToken) {
                    fetch('http://192.168.20.9:8000/user/list', {
                        method: 'GET',
                        headers: {
                            'authorization': 'Token ' + accessToken
                        }
                    }).
                        then(async (response) => {
                            if (response.status === 200) {
                                setUsers(await response.json());
                            } else {
                                //show some dialog, alert or toast that indicates that the login was not possible
                            }
                        }).
                        catch(error => { console.log('error::', error) });
                } else {
                    console.log('you are not logged in');
                }
            }).
            catch(error => console.log('some error while getting the token::', error));
    }, []);

    function goToProfile(userId: number, userName: string) {
        navigation.navigate('Profile', {
            userId: userId,
            name: userName
        });
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <Button title='Log Out' onPress={signOut}/>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20, marginLeft: 10 }}>Listado de usuarios</Text>
                <FlatList
                    data={users}
                    renderItem={({ item }) =>
                        <Pressable onPress={() => {
                            goToProfile(item.id, item.username)
                        }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                <Text>userID: {item.id}</Text>
                                <Text>username: {item.username}</Text>
                            </View>
                        </Pressable>}
                ></FlatList>
            </View>
        </View>
    )
}