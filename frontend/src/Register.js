
import React, {useState} from 'react';

const myForm = {
    padding: '80px',
}

const button = {
    backgroundColor: 'lightgray',
    borderColor: 'white',
}

function Register() { 

    return (
        <form style = {myForm}>

            <label htmlFor="email">email</label>
            <input
                type="text"
                name="email"
                id="email"
            />
                
            <label htmlFor="password">password</label>
            <input
                type="text"
                name="password"
                id="password"
            />

            <label htmlFor="confirmPassword">confirm password</label>
            <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
            />


            <input type="button" value="Register" style ={button} />
                    
        </form>
    ); 
}
export default Register;
