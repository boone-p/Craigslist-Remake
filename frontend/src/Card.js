import React from 'react';
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const grid = {
    minHeight: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
}

const box = {
    width: '15rem',
    margin: '20px',
    
}

function RenderCards(props) {
    const cards = props.productData.map((product, index) => {
        return (
            <Card style = {box} key={index}>
                <Card.Img variant="top" src="holder.js/250x250" src="https://m.media-amazon.com/images/I/91GSd2JH8SL._AC_SL1500_.jpg"/>
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