import React from 'react'
import { Row, Col } from "react-bootstrap";

const CartItem = ({product, cartData}) => {

  return (
    <Row>
        <Col md={2}>
            <img
                width={100}
                height={100}
                className="align-self-center mr-3"
                src={product.src}
                alt={product.des}
                title={product.des}
            />
        </Col>
        <Col md={4} className="align-self-center mr-3">
            {product.title} <sub>{product.des}</sub>
        </Col>
        <Col md={2} className="align-self-center mr-3">
            ${product.price}
        </Col>
        <Col md={2} className="align-self-center mr-3">
            {cartData.quantity}
        </Col>
        <Col md={2} className="align-self-center mr-3">
            ${cartData.quantity * product.price}
        </Col>
    </Row>
  )
}

export default CartItem
