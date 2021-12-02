
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
            image: '',
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

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        }).then(response => JSON.stringify(response));
    };
    
    function handleChangePic(event) {
        const file = event.target.files[0];
        const base64 = convertToBase64(file);
        console.log("aaa")
        console.log(base64)
        if (file) {
            setProductImage(() => {
                return {           
                    'image': convertToBase64(file),
                    'contentType': file.type
                }
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
      

    
        var object = {'data': productData, 'image': productImage};
        console.log("submitForm")
        console.log(object['image'])
        props.handleSubmit(object)
        //props.handleSubmit(formData)


        // setProduct({title: '', description: '', location: '', category: '', contactInfo: ''});
        // setProductImage({picture: null});
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

