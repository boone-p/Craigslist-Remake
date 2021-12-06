import React from 'react';
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'


const grid = {
    minHeight: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    allignItems:'center',
    justifyContent:'center'
}

const box = {
    width: '19rem',
    maxHeight: '25rem',
    margin: '80px',
    boxShadow: '1px 1px 1px 1px #cccccc',
}

const image = {
    marginTop:'5px',
    marginLeft:'10px',
    height: '30vh',
    width: '95%'
}

function RenderCards(props) {
    const cards = props.productData.map((product, index) => {
        return (
        
                <Card style = {box} key={index}>

                        <Link to={"/product/"+product._id}>
                            <Card.Img style={image} variant="top" alt="holder.js/250x250" src={product.image} /> 
                        </Link>

                    <Card.Body>
                        <Card.Header>{product.title}</Card.Header>
             
                    </Card.Body>

                </Card>
        );
    });

    return (
        <div style = {grid} >
            {cards}
        </div>
    );
}

function Cards(props) {
    return (
        <div>
            <RenderCards productData = {props.productData} />
        </div>
    );
}
    

export default Cards;
