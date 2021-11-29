import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements'

export default function (props) {

    const [cliente, setCliente] = useState([])
    const cnpj = props.route.params

    useEffect(() => {
        fetch('http://192.168.0.6:5000/cliente/consulta/' + cnpj, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status == 404) {
                    Alert.alert("Nao existe um item com o CNPJ informado!")
                    props.navigation.goBack()
                }
                else {
                    if (!response.ok) {
                        Alert.alert("Mensagem: " + response.status)
                    }
                }
                return response.json()
            })
            .then((json) => {
                setCliente(json)
            }
            )
            .catch((error) => {
                console.error(error)
            })

    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    ID:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.id}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Razão Social:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.razaoSocial}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    CNPJ:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.cnpj}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    CEP:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.cep}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Número:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.numero}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Data de Atualização:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.dataAtualizacao}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Contato:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.contato}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Status:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.status}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    E-mail:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.email}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold' }}>
                    Telefone:
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {"\t" + cliente.telefone}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Atualizar" type="solid" onPress={() => props.navigation.navigate("CadastroClientes", cliente)} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Remover" type="solid" />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Cancelar" type="solid" onPress={() => props.navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}


