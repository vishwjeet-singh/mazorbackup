import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {db} from "../firebase"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef=useRef()
  const companynameRef=useRef()
  const phonenumberRef=useRef()
 
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
    
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
function submitdata(){


    db.collection('Userdata').doc(emailRef.current.value).set({
    name:nameRef.current.value,
    companyname:companynameRef.current.value,
    phonenumber:phonenumberRef.current.value,
    username:emailRef.current.value,
    password:passwordRef.current.value,
    credit:100
    })
  
  
}
  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
   
   <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="companyname">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" ref={companynameRef} />
            </Form.Group>
            <Form.Group id="phonenumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="tel" ref={phonenumberRef}  />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100" type="submit" onClick={submitdata}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
  </Container>
  )
}
