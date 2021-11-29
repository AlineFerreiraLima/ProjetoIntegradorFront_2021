import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import {Button} from 'react-native-elements'


export default function(props){
    const [id, setId] = useState("")
    return(
        <View style={style.principal}>
            <View style={style.principal}>
               <Text style={style.texto}>Selecione uma opcao:</Text>
               <TextInput
                    onChangeText={id => setId(id)}
                    placeholder="Informe o id da compra"
                    value={id.toString()}
               />
            <View style={{flexDirection:'row', justifyContent:'space-between', padding: 20}}>
                    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                        <Button title="Pesquisar por id" type="solid" onPress={() => {
                            if(id === ""){
                                Alert.alert("Informe id da Compra!")
                            }
                            else{
                                props.navigation.navigate("BuscaCompras", id)   
                            }
                        }}/>
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                        <Button title="Cadastrar Compra" type="solid" onPress={() => props.navigation.navigate("CadastroCompras")}/>
                    </View>
                </View>
            </View> 
        </View>
    )
}

const style = StyleSheet.create({
    principal:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'        
    },
    texto:{
        textAlign:'center',
        fontSize: 16
    },
    viewBotoes:{
        flex:1
    }
})