import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert, CheckBox} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default function (props){
    const [Fornecedor, setFornecedor] = useState(props.route.params ? props.route.params: {})
    const [isSelected, setSelection] = useState(undefined);

    const insert = () => {
        if(Fornecedor.id === undefined){
            fetch('http://192.168.0.6:5000/fornecedor/', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "razaoSocial": Fornecedor.razaoSocial,
                    "cnpj": Fornecedor.cnpj,
                    "cep": Fornecedor.cep,
                    "numero": Fornecedor.numero,
                    "dataAtualizacao": Fornecedor.dataAtualizacao,
                    "contato": Fornecedor.contato,
                    "status": isSelected,
                    "email": Fornecedor.email,
                    "telefone": Fornecedor.telefone
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Atenção: Todos os campos são obrigatórios!") 
                }
                else{
                    Alert.alert("Fornecedor cadastrado com sucesso!")  
                    Fornecedor.razaoSocial = "",
                    Fornecedor.cnpj = "",
                    Fornecedor.cep = "",
                    Fornecedor.numero = "",
                    Fornecedor.dataAtualizacao = "",
                    Fornecedor.contato = "",
                    Fornecedor.status = "",
                    Fornecedor.email = "",
                    Fornecedor.telefone = ""
                    props.navigation.navigate("ListaFornecedores")
                }
                
            })
            .catch((error) => {
                console.error(error)}
            )
        }
        else{
            fetch('http://192.168.0.6:5000/fornecedor/' + Fornecedor.id, {
                method: 'PUT',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    "razaoSocial": Fornecedor.razaoSocial,
                    "cnpj": Fornecedor.cnpj,
                    "cep": Fornecedor.cep,
                    "numero": Fornecedor.numero,
                    "dataAtualizacao": Fornecedor.dataAtualizacao,
                    "contato": Fornecedor.contato,
                    "status": isSelected,
                    "email": Fornecedor.email,
                    "telefone": Fornecedor.telefone
                })
            })
            .then((response) => {   
                if(!response.ok){
                    Alert.alert("Mensagem: " + response.status) 
                }
                else{
                    Alert.alert("Fornecedor atualizado com sucesso!")  
                    Fornecedor.razaoSocial = "",
                    Fornecedor.cnpj = "",
                    Fornecedor.cep = "",
                    Fornecedor.numero = "",
                    Fornecedor.dataAtualizacao = "",
                    Fornecedor.contato = "",
                    Fornecedor.status = "",
                    Fornecedor.email = "",
                    Fornecedor.telefone = ""                  
                }
                props.navigation.navigate("ListaFornecedores")
            })
            .catch((error) => {
                console.error(error)}
            )
        }
    }

    const remove = () => {
        if(Fornecedor.id === undefined){
            Alert.alert("O fornecedor não está cadastrado!")
        }
        else{
            fetch('http://192.168.0.6:5000/fornecedor/' + Fornecedor.id, {
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
                    Alert.alert("Fornecedor removido com sucesso!")  
                    Fornecedor.razaoSocial = "",
                    Fornecedor.cnpj = "",
                    Fornecedor.cep = "",
                    Fornecedor.numero = "",
                    Fornecedor.dataAtualizacao = "",
                    Fornecedor.contato = "",
                    Fornecedor.status = true,
                    Fornecedor.email = "",
                    Fornecedor.telefone = "" 
                    props.navigation.navigate("ListaFornecedores")
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
            onChangeText={razaoSocial => setFornecedor({...Fornecedor, razaoSocial})}
            placeholder="Informe a Razão Social do Fornecedor"
            value={Fornecedor.razaoSocial}
            style={styles.input}
        /> 
        <Text>CNPJ:</Text>
        <TextInput 
            onChangeText={cnpj => setFornecedor({...Fornecedor, cnpj})}
            placeholder="Informe o CNPJ do Fornecedor"
            value={Fornecedor.cnpj}
            style={styles.input}
        /> 
               
        <Text>CEP:</Text>
        <TextInput 
            onChangeText={cep => setFornecedor({...Fornecedor, cep})}
            placeholder="Informe o CEP do Fornecedor"
            value={Fornecedor.cep}
            style={styles.input}
        /> 
        
        <Text>Número:</Text>
        <TextInput 
            onChangeText={numero => setFornecedor({...Fornecedor, numero})}
            placeholder="Informe o Número do Fornecedor"
            value={Fornecedor.numero}
            style={styles.input}
        />
        <Text>Data de Atualização:</Text>
        <TextInput 
            onChangeText={dataAtualizacao => setFornecedor({...Fornecedor, dataAtualizacao})}
            placeholder="Informe a Data de Atualização do Fornecedor"
            value={Fornecedor.dataAtualizacao}
            style={styles.input}
        />
        <Text>Contato:</Text>
        <TextInput 
            onChangeText={contato => setFornecedor({...Fornecedor, contato})}
            placeholder="Informe o Contato do Fornecedor"
            value={Fornecedor.contato}
            style={styles.input}
        />
        <Text>Está Disponivel?:</Text>
            <CheckBox
                value={isSelected ? isSelected : Fornecedor.status}
                onValueChange={setSelection}
            />
        <Text>Email:</Text>
        <TextInput 
            onChangeText={email => setFornecedor({...Fornecedor, email})}
            placeholder="Informe o Email do Fornecedor"
            value={Fornecedor.email}
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
        onChangeText={telefone => setFornecedor({...Fornecedor, telefone})}
        placeholder="Informe o Telefone do Fornecedor"
        value={Fornecedor.telefone}
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