import React, {useState} from 'react';

const myForm = {
    padding: '80px',
}

const button = {
    backgroundColor: 'lightgray',
    borderColor: 'white',
}

function Login(props) { 

    const [loginData, setLogin] = useState(
        {  
            name: '',
            password: '',
        }
    );

    function handleChange(event) {
        let value = event.target.value;
        let name = event.target.name

        setLogin((prevalue) => {
            return {
              ...prevalue,             
              [name]: value
            }
          })
    }

    function submitForm() {
        props.handleSubmit(loginData);
        setLogin({name: '', password: ''});
    }
      
    return (
        <form style = {myForm}>

            <label htmlFor="name">name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={loginData.name}
                onChange={handleChange} 
            />

            <label htmlFor="password">password</label>
            <input
                type="text"
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