import React,{useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'

export default function Exemplo(props){
    const [data, setData] = useState([])
    const isFocused = useIsFocused();
    
    function getUserItem({item}) {
        return (         
            <ListItem 
                keyExtractor={item => item.id.toString()}
                bottomDivider 
                onPress={() => props.navigation.navigate("CadastroProdutos", item)}
                >
                <ListItem.Content>
                    <ListItem.Title>{item.nome}</ListItem.Title>      
                    <ListItem.Subtitle>Id: {item.id.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Valor: {item.valor.toString()}</ListItem.Subtitle> 
                    <ListItem.Subtitle>FonecedorId: {item.fornecedorId.toString()}</ListItem.Subtitle> 
                    <ListItem.Subtitle>Status: {item.status == true ? "👍" : "👎"}</ListItem.Subtitle>
                    <ListItem.Subtitle>Quantidade: {item.quantidade.toString()}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        )}
    function fetchData(){
        fetch('http://192.168.0.6:5000/produto/')
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
            renderItem={getUserItem}
        />
    );
}