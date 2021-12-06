
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
            contactInfo: '',
        }
    );

    const [productImage, setProductImage] = useState(
        {
            image: null,
            contentType: ''
        }
    );

    function handleChange(event) {
        let value = event.target.value
        let name = event.target.name
        
        setProduct((prevalue) => {
            return {
              ...prevalue,             
              [name]: value
            }
          })
    }
    
    function readFileAsBinary(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    async function handleChangePic(event) {
        const file = event.target.files[0];
        if (file) {
            let result = await readFileAsBinary(file);
            setProductImage(() => {
                return result;
            });
        }
        
    }

    // _handleReaderLoaded = (readerEvt) => {
    //     let binStr = readerEvt.target.result
    //     setProductImage(()=>{
    //         return {
    //             'image': binStr.toString('base64'),
    //         }
    //     })
    // }

    function submitForm(event) {
        event.preventDefault()
        // const formData = new FormData()
        // formData.append('data',productData)
        // formData.append('image', productImage)
        // console.log("formData in submitForm()")
        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        // }
      
        var object = {
                        "title": productData.title, 
                        "description": productData.description, 
                        "location": productData.location, 
                        "category": productData.category, 
                        "contactInfo": productData.contactInfo, 
                        "image": productImage
                    }
        props.handleSubmit(object)
        //props.handleSubmit(formData)


        setProduct({title: '', description: '', location: '', category: '', contactInfo: ''});
        setProductImage({picture: null});
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
            
            <label htmlFor="picture">picture</label>
            <input
                type="file"
                name="picture"
                id="picture"
                accept=".jpeg, .png, .jpg"
                value={productImage.picture}
                onChange={handleChangePic} />

            <input type="button" value="Submit" style ={button} onClick={submitForm} /> 

        
        </form>
    ); 
}
export default Form;

