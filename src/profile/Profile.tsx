import React from 'react';
import { View, Text, Image, Button } from 'react-native';


export default function ProfilePage() {
    const userAvatar = require('../../assets/favicon.png');

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{alignItems: 'center', padding: 20}}>
                <Image source={userAvatar} style={{ width: 100, height: 100 }}></Image>
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Carlos Correa</Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Button title='Editar Perfil' color='gray'></Button>
            </View>
        </View>
    )
}