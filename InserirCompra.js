import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'

export default function (props){
    const [Compra, setCompra] = useState(props.route.params ? props.route.params: {})

    const insert = () => {
        if(Compra.id === undefined){
                Compra.quantidade = parseFloat(Compra.quantidade)
                Compra.produtoId = parseInt(Compra.produtoId)
                
            fetch('http://192.168.0.6:5000/compra/', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "quantidade": Compra.quantidade,
                    "data": Compra.data,
                    "produtoId": Compra.produtoId                    
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Compra.quantidade = parseFloat(Compra.quantidade)
                    Compra.produtoId = parseInt(Compra.produtoId)

                    Alert.alert("Atenção: Todos os campos são obrigatórios!") 
                }
                else{
                    Alert.alert("Compra cadastrada com sucesso!")  
                    Compra.quantidade = "",
                    Compra.data = "",
                    Compra.produtoId = "",
                    props.navigation.navigate("ListaCompras")
                }
                
            })
            .catch((error) => {
                console.error(error)}
            )
        }        
    }

    return(
        <View style={styles.form}>
        <Text>Quantidade:</Text>
        <TextInput 
            onChangeText={quantidade => setCompra({...Compra, quantidade})}
            placeholder="Informe a quantidade do produto"
            value={Compra.quantidade == "" || Compra.quantidade == undefined ? Compra.quantidade : Compra.quantidade.toString()}
            style={styles.input}
        />
        <Text>Data:</Text>
        <TextInput 
            onChangeText={data => setCompra({...Compra, data})}
            placeholder="Informe a data da Compra"
            value={Compra.data}
            style={styles.input}
        />
        <Text>Id do produto:</Text>
        <TextInput 
            onChangeText={produtoId => setCompra({...Compra, produtoId})}
            placeholder="Informe o id do Produto"
            value={Compra.produtoId == "" || Compra.produtoId == undefined ? Compra.produtoId : Compra.produtoId.toString()}
            style={styles.input}
        />
        <View style={styles.buttons}>
            <Button title="Salvar" onPress={(insert)}/>
            <Button title="Cancelar" onPress={() => props.navigation.goBack()}/>
        </View>
    </View>
     )
}    

const styles = StyleSheet.create({
    form:{
        padding:12
    },
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:10
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})