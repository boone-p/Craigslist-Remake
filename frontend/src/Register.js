 import React, {useState} from 'react';

const myForm = {
    padding: '80px',
}

const button = {
    backgroundColor: 'lightgray',
    borderColor: 'white',
}

function Register(props) { 

    const [userData, setUser] = useState(
        {  
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    );

    function handleChange(event) {
        let value = event.target.value;
        let name = event.target.name

        setUser((prevalue) => {
            return {
              ...prevalue,             
              [name]: value
            }
          })
    }

    function submitForm() {
        props.handleSubmit(userData);
        setUser({name: '', email: '', password: '', confirmPassword: ''});
    }
      
    return (
        <form style = {myForm}>

            <label htmlFor="name">name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleChange} 
            />

            <label htmlFor="email">email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleChange} 
            />
                
            <label htmlFor="password">password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={userData.password}
                onChange={handleChange} 
            />

            <label htmlFor="confirmPassword">confirm password</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange} 
            />


            <input type="button" value="Submit" style ={button} onClick={submitForm} />
                    
        </form>
    ); 
}
export default Register;