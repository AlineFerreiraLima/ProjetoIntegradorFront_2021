import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, CheckBox } from 'react-native'

export default function (props) {
    const [produto, setProduto] = useState(props.route.params ? props.route.params : {})
    const [isSelected, setSelection] = useState(produto.status);
    
    const insert = () => {
        if (produto.id === undefined) {
            produto.valor = parseFloat(produto.valor)
            produto.fornecedorId = parseInt(produto.fornecedorId)
            produto.quantidade = parseFloat(produto.quantidade)
            fetch('http://192.168.0.6:5000/produto/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "nome": produto.nome,
                    "valor": produto.valor,
                    "fornecedorId": produto.fornecedorId,
                    "status": isSelected,
                    "quantidade": produto.quantidade
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Atenção: Todos os campos são obrigatórios!")
                    }
                    else {
                        Alert.alert("Produto inserido com sucesso!")
                        produto.nome = "",
                            produto.valor = "",
                            produto.fornecedorId = "",
                            produto.status = "",
                            produto.quantidade = ""
                        props.navigation.navigate("ListaProdutos")
                    }

                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
        else {
            produto.valor = parseFloat(produto.valor)
            produto.fornecedorId = parseInt(produto.fornecedorId)
            produto.quantidade = parseFloat(produto.quantidade)
            fetch('http://192.168.0.6:5000/produto/' + produto.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "nome": produto.nome,
                    "valor": produto.valor,
                    "fornecedorId": produto.fornecedorId,
                    "status": isSelected,
                    "quantidade": produto.quantidade
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Produto atualizado com sucesso!")
                        produto.nome = "",
                            produto.valor = "",
                            produto.fornecedorId = "",
                            produto.status = "",
                            produto.quantidade = ""
                    }
                    props.navigation.navigate("ListaProdutos")
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    const remove = () => {
        if (produto.id === undefined) {
            Alert.alert("O produto nao esta cadastrado!")
        }
        else {
            fetch('http://192.168.0.6:5000/produto/' + produto.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Produto removido com sucesso!")
                        produto.nome = "",
                            produto.valor = "",
                            produto.fornecedorId = "",
                            produto.status = "",
                            produto.quantidade = ""
                        props.navigation.navigate("ListaProdutos")
                    }
                    return response.ok
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    return (
        <View style={styles.form}>
            <Text>Nome do Produto:</Text>
            <TextInput
                onChangeText={nome => setProduto({ ...produto, nome })}
                placeholder="Informe o nome do produto"
                value={produto.nome}
                style={styles.input}
            />
            <Text>Valor do produto:</Text>
            <TextInput
                onChangeText={valor => setProduto({ ...produto, valor })}
                placeholder="Informe o valor do produto"
                value={produto.valor == "" || produto.valor == undefined  ? produto.valor : produto.valor.toString()}
                style={styles.input}
            />
            <Text>ID Fornecedor:</Text>
            <TextInput
                onChangeText={fornecedorId => setProduto({ ...produto, fornecedorId })}
                placeholder="Informe o ID do fornecedor"
                value={produto.fornecedorId == "" || produto.fornecedorId == undefined ? produto.fornecedorId : produto.fornecedorId.toString()}
                style={styles.input}
            />
            <Text>Está Disponível?</Text>
            <Text>SIM ou NÃO? (não selecionar se a resposta for não) </Text>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
            />
            <Text>Quantidade:</Text>
            <TextInput
                onChangeText={quantidade => setProduto({ ...produto, quantidade })}
                placeholder="Informe a quantidade do produto"
                value={produto.quantidade == "" || produto.quantidade == undefined ? produto.quantidade : produto.quantidade.toString()}
                style={styles.input}
            />
            <View style={styles.buttons}>
                <Button title="Salvar" onPress={(insert)} />
                <Button title="Remover" onPress={(remove)} />
                <Button title="Cancelar" onPress={() => props.navigation.goBack()} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})