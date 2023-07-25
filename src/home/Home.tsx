import {Text, View, FlatList} from 'react-native';

const data = {
    users: []
}

const occupations = ["Profesor", "Bombero", "Alcohólico", 'Estudiante de Ingeniría desempleado']

export default function HomePage() {
    for (let i = 1; i < 20; i++) {
        let user = {
            name: 'User ' + i,
            age: 20 + i,
            ocupation: occupations[Math.ceil(Math.random() * occupations.length - 1)]
        }

        data.users.push(user)
    }

    return (
       <View style={{flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: '700', marginTop: 20, marginLeft: 10}}>
                Listado de Usuarios
            </Text>
            <FlatList
                data={data.users}
                renderItem={({item}) => 
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 10}}>
                        <Text>Nombre: {item.name}</Text>
                        <Text>Edad: {item.age}</Text>
                        <Text>Ocupación: {item.ocupation}</Text>
                    </View>
                }
            ></FlatList>
       </View> 
    )
}