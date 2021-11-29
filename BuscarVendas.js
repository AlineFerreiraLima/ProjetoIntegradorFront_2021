import React,{useState, useEffect} from 'react';
import {View,Text, Alert} from 'react-native';
import {Button} from 'react-native-elements'

export default function (props){

const [venda, setVenda] = useState([])
const id = props.route.params

useEffect(() => {
    fetch('http://192.168.0.6:5000/venda/' + id, {
        method: 'GET'
    })
    .then((response) => {    
        if(response.status == 404){
            Alert.alert("Nao existe uma venda com o ID informado!")
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
            setVenda(json)
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
                {"\t"+venda.id}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Quantidade:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t"+venda.quantidade}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>
                Data:  
            </Text>
            <Text style={{fontSize:18}}>
                {"\t" +venda.data}
            </Text>
        </View>
                
        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 20}}>
            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Button title="Cancelar" type="solid" onPress={() => props.navigation.goBack()}/>
            </View>
        </View>
    </View>
);
}