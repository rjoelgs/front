import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/cartContext';
import { getProductList } from '../services/products.service';
import Product from './Product';

const Products = () => {
  const {addItem} = useContext( CartContext )
  const [productList, setProductList] = useState([]);

  const showProducts = async () => {
    const response = await getProductList();
    if (response.status === 200)
      setProductList(response.data.result);
  };

  useEffect(() => {
    showProducts();
  }, []);

  const onProductAdded = (product) => {
    console.log("clicked", product);
    addItem(product)
  }

  return (
    <>
      {
        productList && productList.map((i) => {
          return (
            <Product sku={i.sku} src={i.src} title={i.title} des={i.des} price={i.price} onClic={onProductAdded} />
          );
        })
      }
    </>

  )
}

export default Products
