import React, {useState, useEffect} from 'react';
import Form from './Form';
import Cards from './Card';
import Navbar from './Navbar'
import About from './About'
import Register from './Register'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";


function App() {

    const[products, setProducts] = useState([])

    useEffect(() => {
        fetchAll().then( result => {
          if (result) {
            console.log("result in useEffect")
            console.log(result)
            setProducts(result.data.productList);
          }

        });
       }, [] );

    console.log("trying to print products")
    console.log(products)
    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5000/');
           console.log("response from frontend")
           console.log(response)
           return response 
        }
        catch (error){
           console.log(error); 
           return false;         
        }
      }  
    

    function addProduct(product) { 
        makePostCall(product).then( result => {
        if (result && result.status === 201)
          setProducts([...products, result.data]);
        });
    }
    
    async function makePostCall(product) {
        try {
           const response = await axios.post('http://localhost:5000/products', product);
           console.log(response)
           return response;
        }
        catch (error) { 
           console.log(error);
           return false;
        }
    }

    // function removeOneCharacter(index) {

    //     makeDeleteCall(characters[index].id).then( result => {
    //       if (result && result.status === 204) {
    //         const updated = characters.filter((characters, i) => {
    //           return i !== index
    //         });
    //         setCharacters(updated);
    //       }
    //     });
    // }
    
    return (
        <Router>
            <div>
                <Navbar />

                <Switch>

                    <Route path="/register">
                        <Register/>
                    </Route>

                    <Route path="/submit">
                        <Form handleSubmit={addProduct} />
                    </Route>

                    <Route path="/about">
                        <About/>
                    </Route>

                    <Route path="/">
                        <Cards productData={products}/>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default App;