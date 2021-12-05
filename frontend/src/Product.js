import React, {Image, useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { divide } from 'lodash';

const box = {
    maxWidth: '13rem',
    maxHeight: '20rem',

    display: "block",
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%' 

}

const title = {
    fontSize: '50px',
    textAlign: 'center',
}




function Product(props) {
    const {id} = useParams();
    const [product, setProduct] = useState({})
    console.log(id)
    
    useEffect(() => {
        axios.get(`http://localhost:5001/product/${id}`)

            .then(response => {
                console.log("response in useEffect Product.js")
                console.log(response.data.productList)
                setProduct(response.data.productList[0])
            })

    }, [id])


    console.log(product.title)
    return (
        <div>

            <h1 style={title}>{product.title}</h1>
            <h1 style={title}>{product.contactInfo}</h1>
            <h1 style={title}>{product.location}</h1>
            <h1 style={title}>{product.description}</h1>
            <img style={box} src={product.image}/> 

        </div>

        
    );
}
    

export default Product;
