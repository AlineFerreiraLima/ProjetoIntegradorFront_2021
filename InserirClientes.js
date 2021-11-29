import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert, CheckBox} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default function (props){
    const [cliente, setCliente] = useState(props.route.params ? props.route.params: {})
    const [isSelected, setSelection] = useState(cliente.status);

    const insert = () => {
        if(cliente.id === undefined){
            fetch('http://192.168.0.6:5000/cliente/', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "razaoSocial": cliente.razaoSocial,
                    "cnpj": cliente.cnpj,
                    "cep": cliente.cep,
                    "numero": cliente.numero,
                    "dataAtualizacao": cliente.dataAtualizacao,
                    "contato": cliente.contato,
                    "status": isSelected,
                    "email": cliente.email,
                    "telefone": cliente.telefone
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Atenção: Todos os campos são obrigatórios!") 
                }
                else{
                    Alert.alert("Cliente inserido com sucesso!")  
                    cliente.razaoSocial = "",
                    cliente.cnpj = "",
                    cliente.cep = "",
                    cliente.numero = "",
                    cliente.dataAtualizacao = "",
                    cliente.contato = "",
                    cliente.status = "",
                    cliente.email = "",
                    cliente.telefone = ""
                    props.navigation.navigate("ListaClientes")
                }
                
            })
            .catch((error) => {
                console.error(error)}
            )
        }
        else{
            fetch('http://192.168.0.6:5000/cliente/' + cliente.id, {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "razaoSocial": cliente.razaoSocial,
                    "cnpj": cliente.cnpj,
                    "cep": cliente.cep,
                    "numero": cliente.numero,
                    "dataAtualizacao": cliente.dataAtualizacao,
                    "contato": cliente.contato,
                    "status": isSelected,
                    "email": cliente.email,
                    "telefone": cliente.telefone
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("Cliente atualizado com sucesso!")  
                    cliente.razaoSocial = "",
                    cliente.cnpj = "",
                    cliente.cep = "",
                    cliente.numero = "",
                    cliente.dataAtualizacao = "",
                    cliente.contato = "",
                    cliente.status = "",
                    cliente.email = "",
                    cliente.telefone = ""                  
                }
                props.navigation.navigate("ListaClientes")
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    const remove = () => {
        if(cliente.id === undefined){
            Alert.alert("O cliente não está cadastrado!")
        }
        else{
            fetch('http://192.168.0.6:5000/cliente/' + cliente.id, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("cliente removido com sucesso!")  
                    cliente.razaoSocial = "",
                    cliente.cnpj = "",
                    cliente.cep = "",
                    cliente.numero = "",
                    cliente.dataAtualizacao = "",
                    cliente.contato = "",
                    cliente.status = "",
                    cliente.email = "",
                    cliente.telefone = "" 
                    props.navigation.navigate("ListaClientes")
                }
                return response.ok
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    return(
        <View style={styles.form}>
        <Text>Razão Social:</Text>
        <TextInput 
            onChangeText={razaoSocial => setCliente({...cliente, razaoSocial})}
            placeholder="Informe a Razão Social do cliente"
            value={cliente.razaoSocial}
            style={styles.input}
        />
        <Text>CNPJ:</Text>
        <TextInput 
            onChangeText={cnpj => setCliente({...cliente, cnpj})}
            placeholder="Informe o CNPJ do cliente"
            value={cliente.cnpj}
            style={styles.input}
        />
        <Text>CEP:</Text>
        <TextInput 
            onChangeText={cep => setCliente({...cliente, cep})}
            placeholder="Informe o CEP do cliente"
            value={cliente.cep}
            style={styles.input}
        />
        <Text>Número:</Text>
        <TextInput 
            onChangeText={numero => setCliente({...cliente, numero})}
            placeholder="Informe o Número do cliente"
            value={cliente.numero}
            style={styles.input}
        />
        <Text>Data de Atualização:</Text>
        <TextInput 
            onChangeText={dataAtualizacao => setCliente({...cliente, dataAtualizacao})}
            placeholder="Informe a Data de Atualização do cliente"
            value={cliente.dataAtualizacao}
            style={styles.input}
        />
        <Text>Contato:</Text>
        <TextInput 
            onChangeText={contato => setCliente({...cliente, contato})}
            placeholder="Informe o Contato do cliente"
            value={cliente.contato}
            style={styles.input}
        />
        <Text>Está Ativo?</Text>
            <Text>SIM ou NÃO? (não selecionar se a resposta for não) </Text>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
            />
        <Text>Email:</Text>
        <TextInput 
            onChangeText={email => setCliente({...cliente, email})}
            placeholder="Informe o Email do cliente"
            value={cliente.email}
            style={styles.input}
        />
        
        <Text>Telefone:</Text>               
        <TextInputMask
        type={'cel-phone'}
        options={{
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(99) '
        }}
        onChangeText={telefone => setCliente({...cliente, telefone})}
        placeholder="Informe o Telefone do Fornecedor"
        value={cliente.telefone}
        style={styles.input}/>

        <View style={styles.buttons}>
            <Button title="Salvar" onPress={(insert)}/>
            <Button title="Remover" onPress={(remove)}/>
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