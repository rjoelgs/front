import React, { useState, useEffect, useContext } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import Paypal from './Paypal';
import { CartContext } from '../context/cartContext'
import { getProductList } from '../services/products.service'
import CartItem from './CartItem'
import { Row, Col } from 'react-bootstrap'
import CartResume from './CartResume'

const Cart = () => {
    const {cart, cartResume} = useContext( CartContext )
    const [productList, setProductList] = useState([])

    const loadProducts = async () => {
        const response = await getProductList();
        if (response.status === 200) {
            setProductList(response.data.result);
        }
          
      };
    
    const findProduct = (sku) => {
        return productList.find(prod => prod.sku === sku)
    }
    
    useEffect(() => {
        loadProducts();
    }, []);

    const handleOnPaid = (response) => {
        console.log("PAYPAL RESPONSE", response)
    }

    return (
        <>
            <h1>Bienvenido al carrito de compra</h1>
            <Row>
                <Col md={2}></Col>
                <Col md={4} className="align-self-center mr-3">
                    Nombre
                </Col>
                <Col md={2} className="align-self-center mr-3">
                    Precio
                </Col>
                <Col md={2} className="align-self-center mr-3">
                    Cantidad
                </Col>
                <Col md={2} className="align-self-center mr-3">
                    Subtotal
                </Col>
            </Row>
            
            {
                productList.length && cart && cart.map(item => {
                    var product = findProduct(item.sku)
                    return(
                        <CartItem key={item.sku} product={product} cartData={item}/>
                    )
                })
            }
            <hr/>
            {
                cartResume && (
                    <CartResume resume={cartResume}/>
                )
            }
            <hr/>
            <h1>Pagar</h1>
            <div style={{ maxWidth: "240px", minHeight: "200px" }}>
                <PayPalScriptProvider
                    options={{
                        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                        components: "buttons",
                        currency: "MXN"
                    }}
                >
                    <Paypal
                        currency={"MXN"}
                        amount={10}
                        onPaid={handleOnPaid}
                        showSpinner={true}
                    />
                </PayPalScriptProvider>
            </div>
        </>

  )
}

export default Cart
