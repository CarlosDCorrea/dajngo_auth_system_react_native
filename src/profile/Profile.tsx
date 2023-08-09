import React from 'react';
import { View, Text, Image, Button } from 'react-native';


export default function ProfilePage({route}) {
    const userAvatar = require('../../assets/favicon.png');

    const { userId, name } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{alignItems: 'center', padding: 20}}>
                <Image source={userAvatar} style={{ width: 100, height: 100 }}></Image>
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>userId: {userId}</Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>name: {name}</Text>
            </View>
        </View>
    )
}