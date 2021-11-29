import React,{useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'

export default function Compra(props){
    const [data, setData] = useState([])
    const isFocused = useIsFocused();
    function getVendaItem({item}) {
        return (         
            <ListItem 
                keyExtractor={item => item.id.toString()}
                bottomDivider 
                onPress={() => props.navigation.navigate("CadastroVendas", item)}
                >
                <ListItem.Content>    
                    <ListItem.Subtitle>Id: {item.id}</ListItem.Subtitle>
                    <ListItem.Subtitle>Quantidade: {item.quantidade}</ListItem.Subtitle> 
                    <ListItem.Subtitle>Data: {item.data}</ListItem.Subtitle>
                    <ListItem.Subtitle>Cliente Id: {item.clienteId}</ListItem.Subtitle>
                    <ListItem.Subtitle>Produto Id: {item.produtoId}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        )}
    function fetchData(){
        fetch('http://192.168.0.6:5000/venda/')
        .then((response) =>{
            if(!response.ok){
                Alert.alert("Ocorreu um erro " + response.status)
            }
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => console.error(error))
    }

    useEffect(() => { 
        fetchData();
        props.navigation.addListener('focus', () => {fetchData();});
    }, []);

    return(
        <FlatList
            keyExtractor={({id}) => id.toString()}
            data={data}
            renderItem={getVendaItem}
        />
    );
}