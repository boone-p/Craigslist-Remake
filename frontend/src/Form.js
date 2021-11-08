
import React, {useState} from 'react';

const myForm = {
    padding: '80px',
}

const button = {
    backgroundColor: 'lightgray',
    borderColor: 'white',
}

function Form(props) { 

    const [productData, setProduct] = useState(
        {  
            title: '',
            description: '',
            location: '',
            category: '',
            contactInfo: ''
        }
    );

    function handleChange(event) {
        let value = event.target.value;
        let name = event.target.name

        setProduct((prevalue) => {
            return {
              ...prevalue,             
              [name]: value
            }
          })
    }

    function submitForm() {
        props.handleSubmit(productData);
        setProduct({title: '', description: '', location: '', category: '', contactInfo: ''});
    }
      
    return (
        <form style = {myForm}>

            <label htmlFor="name">title</label>
            <input
                type="text"
                name="title"
                id="title"
                value={productData.title}
                onChange={handleChange} />
                
            <label htmlFor="description">description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={productData.description}
                onChange={handleChange} />

            <label htmlFor="location">location</label>
            <input
                type="text"
                name="location"
                id="location"
                value={productData.location}
                onChange={handleChange} />
                
            <label htmlFor="category">category</label>
            <input
                type="text"
                name="category"
                id="category"
                value={productData.category}
                onChange={handleChange} />

            <label htmlFor="contactInfo">contact info</label>
            <input
                type="text"
                name="contactInfo"
                id="contactInfo"
                value={productData.contactInfo}
                onChange={handleChange} />

            <input type="button" value="Submit" style ={button} onClick={submitForm} />

        
        </form>
    ); 
}
export default Form;

