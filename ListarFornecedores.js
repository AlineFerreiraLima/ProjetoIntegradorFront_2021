import React,{useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native'

export default function Exemplo(props){
    const [data, setData] = useState([])
    const isFocused = useIsFocused();
    //Mascaras p/ Formulario
    const maskCNPJ = (value) => {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");
      };

      const maskCep = (value) =>{
          return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1-$2")
          .replace(/(\d{3})(\d)/, "$1");
      }

      
        function getFornecItem({item}) {
        return (         
            <ListItem 
                keyExtractor={item => item.id.toString()}
                bottomDivider 
                onPress={() => props.navigation.navigate("CadastroFornecedores", item)}
                >
                <ListItem.Content>
                    <ListItem.Title>{item.razaoSocial.toString()}</ListItem.Title>      
                    <ListItem.Subtitle>Id: {item.id.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Cnpj: {maskCNPJ(item.cnpj).toString()}</ListItem.Subtitle> 
                    <ListItem.Subtitle>CEP: {maskCep(item.cep).toString()}</ListItem.Subtitle> 
                    <ListItem.Subtitle>Número: {item.numero.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Data de Atualização: {item.dataAtualizacao.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Contato: {item.contato.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Status: {item.status == true ? "👍" : "👎"}</ListItem.Subtitle>
                    <ListItem.Subtitle>Email: {item.email.toString()}</ListItem.Subtitle>
                    <ListItem.Subtitle>Telefone: {item.telefone.toString()}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        )}
    function fetchData(){
        fetch('http://192.168.0.6:5000/fornecedor/')
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
            renderItem={getFornecItem}
        />
    );
}