import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../components/Login/Login';
import { Dashboard } from '../page/Dashboard';
import { ListaCategorias } from '../page/Categorias/ListaCategorias';
import { CategoriaForm } from '../page/CategoriaForm/CategoriaForm';
import { ListaProdutos } from '../page/Produtos/ListaProdutos';
import { ProdutosForm }from '../page/ProdutosForm/ProdutosForm'
import { Recovery} from '../page/Recoveypassword/recoverypassword'
import { Updatepassword } from '../page/updatepassword/Updatepassword';

function CustomRoute({ isPrivate, ...rest}){

    const { authenticated } = useContext(Context);
    if( isPrivate && !authenticated){
        return <Redirect to="/" />
    }
    return <Route { ...rest } />

}

export default function PrivateRoute(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/dashboard" component={Dashboard} />

            <CustomRoute isPrivate path="/categorias/novo" component={CategoriaForm} />
            <CustomRoute isPrivate path="/categories/update/:id" component={CategoriaForm} />
            <CustomRoute isPrivate path="/categorias" component={ListaCategorias} />

            <CustomRoute isPrivate path="/produtos/novo" component={ProdutosForm} />
            <CustomRoute isPrivate path="/produtos/update/:id" component={ProdutosForm} />
            <CustomRoute isPrivate path="/produtos" component={ListaProdutos} />

            <CustomRoute path="/updatepassword" component={Updatepassword} />
            <CustomRoute path="/recovery" component={Recovery} />
            
            
        
          
        </Switch>
    )
}