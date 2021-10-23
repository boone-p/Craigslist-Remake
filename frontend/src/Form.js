
import React, {useState} from 'react';


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
        <form>

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

        <input type="button" value="Submit" onClick={submitForm} />

        {/* <h1>testing if handle change goes through:
            <span style={{ color: 'red' }}>{productData.title}</span>
            <span style={{ color: 'green' }}>{productData.description}</span>
            <span style={{ color: 'blue' }}>{productData.location}</span>
            <span style={{ color: 'pink' }}>{productData.category}</span>
            <span style={{ color: 'purple' }}>{productData.contactInfo}</span>
        </h1> */}
        
        </form>
    ); 
}
export default Form;

