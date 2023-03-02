import React from 'react'
import { Row, Col } from "react-bootstrap";

const CartResume = ({resume}) => {

  return (
    <>
        <Row>
            <Col md={4} className="align-self-center mr-3">
                Monto de compra
            </Col>
            <Col md={4} className="align-self-center mr-3">
                $ {resume.amount}
            </Col>
        </Row>
        <Row>
            <Col md={4} className="align-self-center mr-3">
                Impuestos = {process.env.REACT_APP_TAX_PCTG}%
            </Col>
            <Col md={4} className="align-self-center mr-3">
                $ {resume.tax}
            </Col>
        </Row>
        <Row>
            <Col md={4} className="align-self-center mr-3">
                Total a pagar
            </Col>
            <Col md={4} className="align-self-center mr-3">
                $ {resume.total}
            </Col>
        </Row>
    </>
  )
}

export default CartResume
