import React, {useEffect, useState} from 'react'

const CartContext = React.createContext()

const {Provider, Consumer} = CartContext

const STORAGE_KEY = "cart"

const parseCart = (cartString) => {
    try {
        if(!cartString || !cartString.length)   throw Error()
        const parsed = JSON.parse(cartString);
        return parsed
    } catch (error) {
        return []
    }
}

const serializeCart = (cart) => JSON.stringify(cart)

const CartProvider = ({children}) => {
    const [cart, setCart] = useState( [] )
    const [cartResume, setCartResume] = useState(null)

    useEffect( () => {
        let storedCart = localStorage.getItem( STORAGE_KEY )
        let parsed = parseCart(storedCart)
        setCartResume( getResume(parsed) )
        setCart( parsed )
    }, [] )

    const addItem = (newItem) => {
        var item = cart.find(item => item.sku === newItem.sku)
        if( item ){
            item.quantity ++;
        } else {
            cart.push({
                sku: newItem.sku,
                title: newItem.title,
                price: newItem.price,
                quantity: 1
            })
        }
        localStorage.setItem( STORAGE_KEY , serializeCart(cart) )
        setCart( cart );
    }

    const getResume = (cart) => {
        var resume = {"amount" : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0 )}
        resume["tax"] = resume.amount * (process.env.REACT_APP_TAX_PCTG/100)
        resume["total"] = resume.amount + resume.tax

        return resume
    }

    const deleteItem = (toDelete) => {
        const itemIndex = cart.findIndex(item => item.sku === toDelete.sku)
        if( itemIndex ){
            cart.splice(itemIndex, 1 )
            localStorage.setItem( STORAGE_KEY, serializeCart(cart) )
            setCart( cart )
        }
    }

    const empty = () => {
        cart.splice(0, cart.length);
        localStorage.removeItem( STORAGE_KEY )
    }

    return (
        <Provider value={{cart, cartResume, addItem, deleteItem, empty}}>
            {children}
        </Provider>
    )
}

export {CartProvider, Consumer as CartConsumer, CartContext}