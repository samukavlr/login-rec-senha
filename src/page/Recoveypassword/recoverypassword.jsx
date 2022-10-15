import React from "react";
import api from '../../services/api';
import {Button, Form, Container,Alert} from 'react-bootstrap'  
import {useState} from "react";

import './styles.css';



export function Recovery(){

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
  })
  const [value, setValue] = useState({
    email: ""
  })
  const[estado, setEstado] = useState(false)

  const handleChange = e =>{
     setValue({
      ...value,
      [e.target.name] : e.target.value

    })
  }

  const formSubmit = async e =>{
e.preventDefault()
setEstado(false)

setStatus({loading: true})
console.log(value)

const headers = {
  'headers': {
    'Content-Type': 'application/json'
  }
}
await api.put('/users/recovery', value, headers)
.then((response)=>{
    setStatus({
      type: "success",
      mensagem: response.data.mensagem,
      loading: false
    })
    setValue({
      email: ""
    })
}).catch((err)=>{
  if(err.response.data){
    setStatus({
      type: 'error',
      mensagem: err.response.data.mensagem,
      loading: false
    })
    setEstado(true)
  }else{
    setStatus({
      type: 'error',
      mensagem: 'Erro: tente mais tarde',
      loading: false
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={value.email} onChange={handleChange} type="email" name="email" placeholder="Digite seu E-mail" isInvalid={estado}/>
                <Form.Text className="text-muted">
               
                </Form.Text>
            </Form.Group>
            
              <Button  variant="primary" type="submit">Enviar</Button>
            

            </Form>            
        </Container>
        </>
    )
}