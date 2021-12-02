import React, {useState, useEffect} from 'react';
import Form from './Form';
import Cards from './Card';
import Navbar from './Navbar';
import About from './About';
import Register from './Register';
import Login from './Login';
import Sidebar from './Sidebar'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";


function App() {

	const[products, setProducts] = useState({})
	const[user, setUser] = useState([])
	const [cookies, setCookie] = useCookies(['user']);

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
            const response = await axios.get("http://localhost:5000/", {
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
		console.log("product in App.js addProduct")
		console.log(product)
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
				console.log(result.data.email)

				setCookie('Email', result.data.email, { path: '/' });

				console.log(user)
				localStorage.setItem("token", result.data.token);
			}
		});
	}

	async function makeLoginPostCall(user) {
		try {
		   const response = await axios.post('http://localhost:5000/login', user);
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
		try {
			const response = await axios.post('http://localhost:5000/products', product, {
				headers: {
					authorization : "Bearer " + localStorage.getItem("token"),
					ContentType: 'application/json',
					Accept: 'application/json'
				}
			});
			console.log(response)
			return response;
		}
		catch (error) {
		   console.log("error in postCall:")
		   console.log(error);
		   return false;
		}
	}

	async function makeUserPostCall(user) {
		try {
		   const response = await axios.post('http://localhost:5000/register', user);
		   console.log("response in makeUserPostCall")
		   console.log(response)
		   return response;
		}
		catch (error) { 
		   console.log(error);
		   return false;
		}
	}

	return (
		<Router>
			<div>

				<Navbar/>
				<Routes>

					<Route path="/register" element={<Register handleSubmit={addUser}/>}/>
					<Route path="/login" element={<Login handleSubmit={loginUser}/>}/>
					<Route path="/submit" element={<Form handleSubmit={addProduct}/>}/>
					<Route path="/about" element={<About />}/>
					<Route path="/" element={<Cards productData={products}/>}/>
				
				</Routes>
						
				<Sidebar />

			</div>
		</Router>
	);
}

export default App;