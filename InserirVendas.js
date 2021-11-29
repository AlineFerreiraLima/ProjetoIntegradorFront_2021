import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, CheckBox } from 'react-native'

export default function (props) {
    const [venda, setVenda] = useState(props.route.params ? props.route.params : {})
    const [isSelected, setSelection] = useState(undefined);
    
    
    const insert = () => {
        if (venda.id === undefined) {
            venda.quantidade = parseFloat(venda.quantidade)
            venda.clienteId = parseInt(venda.clienteId)
            venda.produtoId = parseInt(venda.produtoId)
            fetch('http://192.168.0.6:5000/venda/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "quantidade": venda.quantidade,
                    "data": venda.data,
                    "clienteId": venda.clienteId,
                    "produtoId": venda.produtoId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Atenção: Todos os campos são obrigatórios!")
                    }
                    else {
                        Alert.alert("Venda inserida com sucesso!")
                            venda.quantidade = "",
                            venda.data = "",
                            venda.clienteId = "",
                            venda.produtoId = ""
                        props.navigation.navigate("ListaVendas")
                    }

                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
        else {
            venda.quantidade = parseFloat(venda.quantidade)
            venda.clienteId = parseInt(venda.clienteId)
            venda.produtoId = parseInt(venda.produtoId)
            fetch('http://192.168.0.6:5000/venda/' + venda.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "quantidade": venda.quantidade,
                    "data": venda.data,
                    "clienteId": venda.clienteId,
                    "produtoId": venda.produtoId,
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                    else {
                        Alert.alert("Venda atualizada com sucesso!")
                        venda.quantidade = "",
                            venda.data = "",
                            venda.clienteId = "",
                            venda.produtoId = ""
                    }
                    props.navigation.navigate("ListaVendas")
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    const remove = () => {
        console.warn(venda.id)
        if (venda.id === undefined) {
            Alert.alert("A venda não está cadastrada!")
        }
        else {
            fetch('http://192.168.0.6:5000/venda/' + venda.id, {
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
                        Alert.alert("Vendda removida com sucesso!")
                        venda.quantidade = "",
                            venda.data = "",
                            venda.clienteId = "",
                            venda.produtoId = "",
                        props.navigation.navigate("ListaVendas")
                    }
                    return response.json()
                })
                .catch((error) => {
                    console.error(error)
                }
                )
        }
    }

    return (
        <View style={styles.form}>
            <Text>Quantidade da venda:</Text>
            <TextInput
                onChangeText={quantidade => setVenda({ ...venda, quantidade })}
                placeholder="Informe a quantidade da Venda:"
                value={venda.quantidade == "" || venda.quantidade == undefined ? venda.quantidade : venda.quantidade.toString()}
                style={styles.input}
            />
             <Text>Data da venda:</Text>
            <TextInput
                onChangeText={data => setVenda({ ...venda, data })}
                placeholder="Informe a data da Venda:"
                value={venda.data == "" || venda.data == undefined ? venda.data : venda.data.toString()}
                style={styles.input}
            />
            <Text>ID do Cliente:</Text>
            <TextInput
                onChangeText={clienteId => setVenda({ ...venda, clienteId })}
                placeholder="Informe o ID do Cliente:"
                value={venda.clienteId == "" || venda.clienteId == undefined ? venda.clienteId : venda.clienteId.toString()}
                style={styles.input}
            />
            <Text>ID do Produto:</Text>
            <TextInput
                onChangeText={produtoId => setVenda({ ...venda, produtoId })}
                placeholder="Informe o ID do fornecedor"
                value={venda.produtoId== "" || venda.produtoId == undefined ? venda.produtoId : venda.produtoId.toString()}
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