import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const box = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    
}

const title = {
    fontSize: '30px',
    textAlign: 'center',
}

const desc = {
    fontSize: '15px',
    textAlign: 'center',
    padding:'10px',
    margin:'10px'
}

const i1 = {
    fontSize: '12px',
    float: 'left',
    paddingLeft: '38px'
}
const i2 = {
    fontSize: '12px',
    float: 'right',
    paddingRight: '1790px'
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

            <img style={box} src={product.image} alt=""/> 
            <div style={desc} >
                <p >{product.description}</p>
                <p >Located in: {product.location}</p>
                <p >Contact me at: {product.contactInfo}</p>
                <p >do NOT contact me with unsolicited services or offers</p>
                

            </div>
            <p style={i1}>post id: {product._id}</p>

        

        </div>

        
    );
}
    

export default Product;

