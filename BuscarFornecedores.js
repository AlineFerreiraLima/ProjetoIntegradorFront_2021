import React,{useState, useEffect} from 'react';
import {View,Text, Alert} from 'react-native';
import {Button} from 'react-native-elements'

export default function (props){

const [fornecedor, setFornecedor] = useState([])
const id = props.route.params

useEffect(() => {
    fetch('http://192.168.0.6:5000/fornecedor/' + id, {
        method: 'GET'
    })
    .then((response) => {    
        if(response.status == 404){
            Alert.alert("Nao existe um fornecedor com o ID informado!")
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
            setFornecedor(json)
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
                {"\t"+fornecedor.id}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Razão Social:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t"+fornecedor.razaoSocial}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                CNPJ:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.cnpj}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                CEP:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.cep}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Número:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.numero}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Data de Atualização:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.dataAtualizacao}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Contato:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.contato}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Status:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.status}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                E-mail:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.email}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Telefone:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +fornecedor.telefone}
            </Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 20}}>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Atualizar" type="solid" onPress={() => props.navigation.navigate("CadastroFornecedores", fornecedor)}/>
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


