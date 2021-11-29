import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import {Button} from 'react-native-elements'


export default function(props){
    const [id, setId] = useState("")
    const [cnpj, setCnpj] = useState("")
    return(
        <View style={style.principal}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', padding: 20 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={style.texto}>Busca por ID:</Text>
               <TextInput
                    onChangeText={id => setId(id)}
                    placeholder="Informe o id do fornecedor"
                    value={id.toString()}
               />
                        <Button title="Pesquisar por id" type="solid" onPress={() => {
                            if(id === ""){
                                Alert.alert("Informe id do fornecedor!")
                            }
                            else{
                                props.navigation.navigate("BuscaFornecedores", id)   
                            }
                        }}/>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={style.texto}>Busca por CNPJ:</Text>
               <TextInput
                    onChangeText={cnpj => setCnpj(cnpj)}
                    placeholder="Informe o CNPJ do fornecedor"
                    value={cnpj.toString()}
               />
                        <Button title="Pesquisar por cnpj" type="solid" onPress={() => {
                            if(cnpj == ""){
                                Alert.alert("Informe o cnpj do fornecedor!")
                            }
                            else{
                                props.navigation.navigate("BuscaFornecedoresCnpj", cnpj)   
                            }
                        }}/>
                    </View>
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                        <Button title="Cadastrar Fornecedor" type="solid" onPress={() => props.navigation.navigate("CadastroFornecedores")}/>
                    </View>
                </View>
        </View>
    )
}

const style = StyleSheet.create({
    principal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        textAlign: 'center',
        fontSize: 16
    },
    viewBotoes: {
        flex: 1
    }
})