import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ListagemClientes from './Clientes/ListarClientes'
import BuscaClientes from './Clientes/BuscarClientes'
import BuscaClientesCnpj from './Clientes/BuscarClientesCnpj'
import CadastroClientes from './Clientes/InserirClientes'
import BuscaCadatroClientes from './Clientes/PesquisarCadastrarClientes'
import {NavigationContainer} from '@react-navigation/native' 
import { Button, Icon } from 'react-native-elements'
import ListagemFornecedores from './Fornecedores/ListarFornecedores'
import BuscaFornecedores from './Fornecedores/BuscarFornecedores'
import BuscaFornecedoresCnpj from './Fornecedores/BuscarFornecedoresCnpj'
import CadastroFornecedores from './Fornecedores/InserirFornecedor'
import BuscaCadatroFornecedores from './Fornecedores/PesquisarCadastrarFornecedores'
import Inicial from './Home/Inicial'
import ListagemProdutos from './Produtos/ListarProdutos'
import BuscaProdutos from './Produtos/BuscarProdutos'
import BuscaProdutosNome from './Produtos/BuscarProdutoNome'
import CadastroProdutos from './Produtos/InserirProdutos'
import BuscaCadatroProdutos from './Produtos/PesquisarCadastrarProdutos'
import ListagemCompras from './Compras/ListarCompras'
import BuscaCompras from './Compras/BuscarCompras'
import CadastroCompras from './Compras/InserirCompra'
import BuscaCadastroCompras from './Compras/PesquisarCadastrarCompras'
import ListagemVendas from './Vendas/ListarVendas'
import BuscaVendas from './Vendas/BuscarVendas'
import CadastroVendas from './Vendas/InserirVendas'
import BuscaCadastroVendas from './Vendas/PesquisarCadastrarVendas'

const Stack = createStackNavigator()

export default function(props){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial" screenOptions={screenOptions}>

        <Stack.Screen name="Inicial" component={Inicial} options={{title:"Tela Inicial"}}/>

            {/* Referente ao Cliente */}
            <Stack.Screen name="ListaClientes" component={ListagemClientes} options={ ({navigation}) => {
                          return {
                              title: "Lista de Clientes",
                              headerRight: () => (
                                  <Button
                                      type="clear"
                                      icon={<Icon name="add" size={25} color='white'/>}
                                      onPress={() => navigation.navigate('BuscaCadastroClientes')}
                                  />
                              ),
                          }
                      }}/>
            <Stack.Screen name="BuscaClientes" component={BuscaClientes} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="BuscaClientesCnpj" component={BuscaClientesCnpj} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="CadastroClientes" component={CadastroClientes} options={{title:"Inserir/Atualizar um Cliente"}}/>
            <Stack.Screen name="BuscaCadastroClientes" component={BuscaCadatroClientes} options={{title:"Inserir/Pesquisar um Cliente"}}/>

              {/* Referente ao Fornecedor */}
            <Stack.Screen name="ListaFornecedores" component={ListagemFornecedores} options={ ({navigation}) => {
                          return {
                              title: "Lista de Fornecedores",
                              headerRight: () => (
                                  <Button
                                      type="clear"
                                      icon={<Icon name="add" size={25} color='white'/>}
                                      onPress={() => navigation.navigate('BuscaCadastroFornecedores')}
                                  />
                              ),
                          }
                      }}/>
            <Stack.Screen name="BuscaFornecedores" component={BuscaFornecedores} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="BuscaFornecedoresCnpj" component={BuscaFornecedoresCnpj} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="CadastroFornecedores" component={CadastroFornecedores} options={{title:"Inserir/Atualizar um Fornecedor"}}/>
            <Stack.Screen name="BuscaCadastroFornecedores" component={BuscaCadatroFornecedores} options={{title:"Inserir/Pesquisar um Fornecedor"}}/>


            {/* Referente ao Produto */}
            <Stack.Screen name="ListaProdutos" component={ListagemProdutos} options={ ({navigation}) => {
                          return {
                              title: "Lista de Produtos",
                              headerRight: () => (
                                  <Button
                                      type="clear"
                                      icon={<Icon name="add" size={25} color='white'/>}
                                      onPress={() => navigation.navigate('BuscaCadastroProdutos')}
                                  />
                              ),
                          }
                      }}/>
            <Stack.Screen name="BuscaProdutos" component={BuscaProdutos} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="BuscaProdutosNome" component={BuscaProdutosNome} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="CadastroProdutos" component={CadastroProdutos} options={{title:"Inserir/Atualizar um Produtos"}}/>
            <Stack.Screen name="BuscaCadastroProdutos" component={BuscaCadatroProdutos} options={{title:"Inserir/Pesquisar um Produtos"}}/>

            {/* Referente a Compra */}
            <Stack.Screen name="ListaCompras" component={ListagemCompras} options={ ({navigation}) => {
                          return {
                              title: "Lista de Compras",
                              headerRight: () => (
                                  <Button
                                      type="clear"
                                      icon={<Icon name="add" size={25} color='white'/>}
                                      onPress={() => navigation.navigate('BuscaCadastroCompras')}
                                  />
                              ),
                          }
                      }}/>
            <Stack.Screen name="BuscaCompras" component={BuscaCompras} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="CadastroCompras" component={CadastroCompras} options={{title:"Inserir uma Compra"}}/>
            <Stack.Screen name="BuscaCadastroCompras" component={BuscaCadastroCompras} options={{title:"Inserir/Pesquisar uma Compra"}}/>
             {/* Referente a Venda */}
             <Stack.Screen name="ListaVendas" component={ListagemVendas} options={ ({navigation}) => {
                          return {
                              title: "Lista de Vendas",
                              headerRight: () => (
                                  <Button
                                      type="clear"
                                      icon={<Icon name="add" size={25} color='white'/>}
                                      onPress={() => navigation.navigate('BuscaCadastroVendas')}
                                  />
                              ),
                          }
                      }}/>
            <Stack.Screen name="BuscaVendas" component={BuscaVendas} options={{title:"Resultado da busca"}}/>
            <Stack.Screen name="CadastroVendas" component={CadastroVendas} options={{title:"Inserir uma Venda"}}/>
            <Stack.Screen name="BuscaCadastroVendas" component={BuscaCadastroVendas} options={{title:"Inserir/Pesquisar uma Venda"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

const screenOptions = {
  headerStyle:{
    backgroundColor:'blue'
  },
  headerTintColor:'#fff',
  headerTitleStyle:{
    fontWeight: 'bold'
  }
}

