import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { Context } from "../../Context/AuthContext";
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/UI/NavBar/NavBar'
import './styles.css'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const ListaProdutos = () =>{
    const { authenticated, handleLogout} = useContext(Context);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type:'',
        mensagem:'',
        loading: true
    });

    const confirmDelete = (categories) => {   
            confirmAlert({
              title: "Deseja continuar",
              message:
                "Deseja excluir esse produto" +
                categories.name + 
                "?",
              buttons: [
                {
                  label: "Sim",
                  onClick: () => handleDelete(categories.id)
                },
                {
                  label: "Não",
                  onClick: () => getCategories()
                }
              ]
            });
          };
        


    const handleDelete = async (idProducts) =>{
        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
        }

        await api.delete("/products/delete/"+idProducts, headers)
        .then((response) =>{
            setStatus({
                type:'success',
                mensagem: response.data.mensagem,
                loading:true
            })
            getCategories();

        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type:'error',
                    mensagem: 'Erro: Tente mais tarde'
                })
            }
        })
    }

    const getCategories = async () =>{

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
        }   
        
        await api.get("/products/all", headers)
        .then((response) =>{
            setData(response.data.products);
            setStatus({loading:false})
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type:'error',
                    mensagem: 'Erro: Tente mais tarde!'
                })
            }
        })
    }

    useEffect( () =>{
        getCategories();
    }, [])


    return(
        <>
            <NavBar />                    
            <Container>
            {status.loading ? <Alert variant="warning">Carregando...</Alert> : ""}
            <div className="btnNovo">
            <h1>Produtos</h1>
            <Button variant="outline-success">
                <Link className="noLink" to="/produtos/novo">Novo Produto</Link>
            </Button>
            </div>
            <Table striped bordered hover>  
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {(!status.loading &&
                data.map(products =>(
                    <tr key={products.id}>
                        <td>{products.id}</td>
                        <td>{products.name}</td>
                        <td>{products.description}</td>
                        <td>{products.quantity}</td>
                        <td>{products.price}</td>
                        <td className="spaceFlex">
                        <Button variant="outline-warning">
                            <Link className="noLink " to={"/produtos/update/" +products.id}>Editar</Link>
                        </Button>
                        <Button variant="outline-danger" onClick={() => confirmDelete(products)}>
                            Excluir
                        </Button>
                        </td>
                    </tr>
                ))

            )}
            </tbody>
            </Table>            
        </Container>
        </>
    )
}




