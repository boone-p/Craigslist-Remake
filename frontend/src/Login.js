import React, {useState} from 'react';

const myForm = {
    padding: '80px',
}

const button = {
    backgroundColor: 'lightgray',
    borderColor: 'white',
}

function Login(props) { 

    const [loginData, setToken] = useState(
        {  
            email: '',
            password: '',
            token: ''
        }
    );

    function handleChange(event) {
        let value = event.target.value;
        let name = event.target.name

        setToken((prevalue) => {
            return {
              ...prevalue,             
              [name]: value
            }
          })
    }

    function submitForm() {
        props.handleSubmit(loginData);
        setToken({email: '', password: ''});
    }
      
    return (
        <form style = {myForm}>

            <label htmlFor="email">email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange} 
            />

            <label htmlFor="password">password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange} 
            />

            <input type="button" value="Submit" style ={button} onClick={submitForm} />
                    
        </form>
    ); 
}
export default Login;