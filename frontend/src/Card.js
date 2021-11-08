import React from 'react';
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const grid = {
    minHeight: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: '145px'
}

const box = {
    width: '19rem',
    height: '18rem',
    margin: '80px',
    maxHeight: '55vh',
    boxShadow: '2px 2px 2px 2px #cccccc',
}

function RenderCards(props) {
    const cards = props.productData.map((product, index) => {
        return (
            <Card style = {box} key={index}>
                <Card.Img variant="top" src="holder.js/250x250" src="https://m.media-amazon.com/images/I/61j9RdOsJwL._AC_SL1379_.jpg"/>
                <Card.Body>
                    <Card.Header>{product.title}</Card.Header>
                    <Card.Text>{product.description}</Card.Text>
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