import React from "react";
import api from '../../services/api';
import {Button, Form, Container,Alert} from 'react-bootstrap'  
import {useState} from "react";

import './styles.css';



export function Updatepassword(){
    

    const [status, setStatus] = useState({
        type: "",
        mensagem: "",
        loading: false
      })
      const [values, setValues] = useState({
        email: "",
        password: "",
        confirmpass: "",
        token : ""
      })
      const handleChange = (e)=>{
        setValues({
          ...values,
          [e.target.name] : e.target.value
        })
      }

      const formSubmit = async (e)=>{
        e.preventDefault()
        setStatus({loading: true})
        const headers = {
          'headers' : 'Content-Type : aplication/json'
        }
        await api.put('/users/updatepassword', values, headers)
        .then((response)=>{
          setStatus({
            type: 'success',
            mensagem: response.data.mensagem,
            loading: false
          })
          setValues({
            email: "",
            password: "",
            confirmpass: "",
            token : ""
          })
        })
        .catch((err)=>{
            if(err.response.data){
              setStatus({
                type: 'error',
                mensagem: err.response.data.mensagem,
                loading: false
              })
            }
            else{
              setStatus({
                type: 'error',
                mensagem: 'Erro: tente mais tarde'
              })
            }

        })

      }




    return (
        <>
        <Container className="box">
            <h1>Recuperar senha</h1>
            <Form  className="borderForm" onSubmit={formSubmit}>

            {status.type == 'error' 
            ? <Alert variant="danger">{status.mensagem}</Alert> 
            : ""}
            {status.type == 'success' 
            ? <Alert variant="success">{status.mensagem}</Alert> 
            : ""}
            <Form.Group  className="mb-3" >    
                <Form.Control value={values.email} type="email" name="email" onChange={handleChange} placeholder="E-MAIL" />
            </Form.Group>
            <br />

            <Form.Group  className="mb-3" >
                <Form.Control value={values.password} type="password" name="password"onChange={handleChange} placeholder="SENHA" />
            </Form.Group>

            <Form.Group className="mb-3" >   
                <Form.Control value={values.confirmpass} type="password" onChange={handleChange} name="confirmpass" placeholder="CONFIRME SENHA" />
            </Form.Group>

            <Form.Group  className="mb-3" >             
                <Form.Control value={values.token} type="text" name="token" onChange={handleChange} placeholder="CODIGO VALIDAÇÃO" />
            </Form.Group>
            
              <Button  variant="primary" type="submit">TROCAR SENHA</Button>
            

            </Form>            
        </Container>
        </>
    )
}