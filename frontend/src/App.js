import React from 'react';
import Form from './Form';

function addProduct(productData){
    console.log(productData)
    
}

function MyApp() {
    return (
        <div className="container">
            <Form handleSubmit={addProduct} />
        </div>
      );
      
      
}

export default MyApp;