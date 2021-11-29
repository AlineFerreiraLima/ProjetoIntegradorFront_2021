import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'


export default function (props) {
    return (
        <View style={styles.principal}>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("ListaFornecedores")}
                >
                    <Text>Fornecedores</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("ListaClientes")}
                >
                    <Text>Clientes</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("ListaProdutos")}
                >
                    <Text>Produtos</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("ListaCompras")}
                >
                    <Text>Compras</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate("ListaVendas")}
                >
                    <Text>Vendas</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    principal: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 20
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});

