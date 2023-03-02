import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Product = (props) => {

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.src} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.des}
          </Card.Text>
          <Card.Text>
            {props.price}
          </Card.Text>
          <Button onClick={()=>props.onClic(props)} variant="primary">Add</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product
