import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import {Button} from 'react-native-elements'


export default function (props) {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    return (
        <View style={style.principal}>
            <View style={style.principal}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', padding: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={style.texto}>Busca por ID:</Text>
                            <TextInput
                                onChangeText={id => setId(id)}
                                placeholder="Informe o id do item"
                                value={id.toString()}
                            />
                            <Button title="Pesquisar por id" type="solid" onPress={() => {
                                if (id === "") {
                                    Alert.alert("Informe id do Item!")
                                }
                                else {
                                    props.navigation.navigate("BuscaProdutos", id)
                                }
                            }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={style.texto}>Busca por nome:</Text>
                            <TextInput
                                onChangeText={nome => setNome(nome)}
                                placeholder="Informe o nome do item"
                                value={nome.toString()}
                            />
                            <Button title="Pesquisar por nome" type="solid" onPress={() => {
                                if (nome === "") {
                                    Alert.alert("Informe nome do Item!")
                                }
                                else {
                                    props.navigation.navigate("BuscaProdutosNome", nome)
                                }
                            }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Cadastrar Produtos" type="solid" onPress={() => props.navigation.navigate("CadastroProdutos")} />
                    </View>
                </View>
            </View>
        </View >
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