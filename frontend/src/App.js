import React, {useState, useEffect} from 'react';
import Form from './Form';
import Cards from './Card';
import Navbar from './Navbar';
import About from './About';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import Product from './Product';

import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";


function App() {
	const[products, setProducts] = useState([])

	useEffect(() => {
		fetchAll().then( result => {
			if (result)
				setProducts(result.data.productList);
		});
	}, [] );


	async function fetchAll(){
		console.log("auth token in fetchall")
		console.log(localStorage.getItem("token"))

		try {
            const response = await axios.get("http://localhost:5001/", {
				headers: {
					authorization : "Bearer " + localStorage.getItem("token")
				}
			});
			console.log("response from frontend")
			console.log(response)
			return response; 
		}
		catch (error){
			console.log("Invalid login"); 
			return false;         
		}
	  }  

	function addProduct(product) { 
		makePostCall(product).then( result => {
		if (result && result.status === 201)
		  setProducts([...products, result.data]);
		});
	}

	function addUser(user) { 
		makeUserPostCall(user).then( result => {
			if (result && result.status === 201) {
			console.log("registration data from addUser")
			console.log(result.data)
			}
		});
	}

	function loginUser(givenEmail) { 
		makeLoginPostCall(givenEmail).then( result => {
			if (result && result.status === 201) {
				console.log("login data from loginUser")
				console.log(result.data.token)
				localStorage.setItem("token", result.data.token);
			}
		});
	}

	async function makeLoginPostCall(user) {
		try {
		   const response = await axios.post('http://localhost:5001/login', user);
		   console.log("response in makeLoginPostCall")
		   console.log(response.data)
		   return response;
		}
		catch (error) { 
		   console.log(error);
		   return false;
		}
	}
	
	async function makePostCall(product) {
		console.log("makePostCall")
		console.log(product)
		try {
			const response = await axios.post('http://localhost:5001/product', product, {
				headers: {
					authorization : "Bearer " + localStorage.getItem("token")
				}
			});

			return response;
		}
		catch (error) { 
		   console.log(error);
		   return false;
		}
	}

	async function makeUserPostCall(user) {
		try {
		   const response = await axios.post('http://localhost:5001/register', user);
		   console.log("response in makeUserPostCall")
		   console.log(response)
		   return response;
		}
		catch (error) { 
		   console.log(error);
		   return false;
		}
	}
	
	async function HandleSearch(value) {
		try {
			const updated = { sidebar: [], searchbar: value };
			const response = await axios.post(
				"http://localhost:5001/search", 
				updated
			);
			return response;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	return (
		<Router>
			<div>

				<Navbar handleSubmit={HandleSearch} />
				<Switch>

					<Route path="/product/:id">
							<Product />
					</Route>
					
					<Route path="/register">
						<Register handleSubmit={addUser}/>
					</Route>

					<Route path="/login">
						<Login handleSubmit={loginUser}/>
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
