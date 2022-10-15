import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/UI/NavBar/NavBar'

const initialValue = {
    name: '',
    description: '',
    quantity:'',
    price: '', 
    categorieId:''
}

export const ProdutosForm = (props) => {

    const history = useHistory();

    const [id] = useState(props.match.params.id);

    const [categories, setCategories] =useState([])
    const [values, setValues] = useState(initialValue);
    const [acao, setAcao] = useState('Novas');
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false
    })


    const valorInput = e => setValues({
        ...values,
        [e.target.name]: e.target.value
    })
    

    useEffect(() => {
        const getProducts = async () => {
            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }

            await api.get("/products/show/" + id, headers)
                .then((response) => {
                    if (response.data.products) {
                        setValues(response.data.products);
                        setAcao('Editar');
                    } else {
                        setStatus({
                            type: 'warning',
                            mensagem: 'Nenhuma categoria encontrado!!!',
                        })
                    }
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: Tente mais tarde!'
                        })
                    }
                })
        }
        if (id) getProducts();

    }, [id])

    const formSubmit = async e => {
        e.preventDefault();
        setStatus({ loading: true });

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }

        if(!id){
            await api.post("/products/create", values, headers)
                .then((response) => {
                    setStatus({ loading: false })
                    return history.push('/produtos')
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem,
                            loading: false
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: tente mais tarde',
                            loading: false
                        })
                    }

                })
        } else {
            await api.put("/products/update", values, headers)
                .then((response) => {
                    setStatus({ loading: false })
                    return history.push('/produtos')
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'error',
                            mensagem: err.response.data.mensagem,
                            loading: false
                        })
                    } else {
                        setStatus({
                            type: 'error',
                            mensagem: 'Erro: tente mais tarde',
                            loading: false
                        })
                    }

                })
        }    

    }

    return (
        <>
            <NavBar />
            <Container className="box">
                <Form onSubmit={formSubmit} className="borderForm">
                    <h2>{acao} Produtos</h2>

                    {status.type == 'error'
                        ? <Alert variant="danger">{status.mensagem}</Alert>
                        : ""}
                    {status.type == 'success'
                        ? <Alert variant="success">{status.mensagem}</Alert>
                        : ""}

                    {status.loading ? <Alert variant="warning">Enviando...</Alert> : ""}

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" name="name" value={values.name} onChange={valorInput} placeholder="Nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control type="number" name="quantity" value={values.quantity} onChange={valorInput} placeholder="Quantidade" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="number" name="price" value={values.price} onChange={valorInput} placeholder="Preço" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="description" name="description" value={values.description} onChange={valorInput} placeholder="Descrição" />
                        <Form.Text className="text-muted">
                            Adicione uma descrição para sua produto...
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select></Form.Select>
                    </Form.Group>
                    {/* {!id &&
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" name="password" onChange={valorInput} placeholder="Digite sua senha" />
                        </Form.Group>
                    } */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        {/* <Form.Check type="checkbox" label="Check me out" /> */}
                    </Form.Group>
                    {status.loading
                        ? <Button variant="primary" disabled type="submit">Enviando...</Button>
                        : <Button variant="primary" type="submit">Enviar</Button>
                    }

                </Form>
            </Container>
        </>
    )
}