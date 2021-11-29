import React,{useState, useEffect} from 'react';
import {View,Text, Alert} from 'react-native';
import {Button} from 'react-native-elements'

export default function (props){

const [produto, setProduto] = useState([])
const nome = props.route.params

useEffect(() => {
    fetch('http://192.168.0.6:5000/produto/consulta/' + nome, {
        method: 'GET'
    })
    .then((response) => {    
        if(response.status == 404){
            Alert.alert("Nao existe nome do produto informado!")
            props.navigation.goBack()
        }
        else{
            if(!response.ok){
                Alert.alert("Mensagem: " + response.status)
            }
        }
        return response.json()
    })
    .then((json) => {
            setProduto(json)
        }
    )
    .catch((error) => {
        console.error(error)})
    }, []);

    

return(
    <View style={{flex:1, padding: 24}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                ID:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t"+produto.id}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Nome:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t"+produto.nome}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Valor:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +produto.valor}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Id do Fornecedor:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +produto.fornecedorId}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Status:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +produto.status}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Quantidade:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +produto.quantidade}
            </Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 20}}>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Atualizar" type="solid" onPress={() => props.navigation.navigate("CadastroProdutos", produto)}/>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Remover" type="solid"/>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Cancelar" type="solid" onPress={() => props.navigation.goBack()}/>
            </View>
        </View>
    </View>
);
}
