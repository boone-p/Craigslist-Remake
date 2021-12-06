[![freestuffapp CI](https://github.com/Free-Stuff-App/csc307project/actions/workflows/node.js.yml/badge.svg)](https://github.com/Free-Stuff-App/csc307project/actions/workflows/node.js.yml)

The Free Stuff App drew inspiration from poplular eCommerce websites such as CraigsList or Amazon.  We wanted to implement features that mimicked these websites to get a better understanding of real world applications.  Some standout features are our user authentication system, our search engine system, and our image submission form.  These were the three core implementations that took up the most time during the development process and replicates what a professional web application would do.

This project primarily follows the style and formatting rules outlined by the Prettier default settings: https://prettier.io/docs/en/options.html    

Link to our UI Prototype: https://www.figma.com/file/HoJW3uMMTX8vUTr2DTaLBV/product-form-page?node-id=9%3A2 

Link to our Component Diagram: https://drive.google.com/file/d/1x_YaEbIvXLNYa_1bVEftvxYsdVj8CNHf/view?usp=sharing 

Link to our Class Diagram: https://drive.google.com/file/d/1UeNfmCKKfKcF0WCdpJQjHTg38GqxIauf/view?usp=sharing

DEVELOPMENT ENVIRONMENT SETUP:

Package Manager: https://www.npmjs.com/

Frontend Dependencies: {  
     "axios": "^0.24.0",  
     "bootstrap": "^5.1.3",  
     "cra-template": "1.1.2",  
     "react": "^17.0.2",  
     "react-bootstrap": "^2.0.2",  
     "react-dom": "^17.0.2",  
     "react-router-dom": "^5.3.0",  
     "react-scripts": "^4.0.3"  
    }  

Backend Dependencies: {  
     "bcryptjs": "^2.4.3",  
     "cors": "^2.8.5",  
     "dotenv": "^10.0.0",  
     "express": "^4.17.1",  
     "jsonwebtoken": "^8.5.1",  
     "nodemon": "^2.0.13"  
     }  

Database Dependencies: {    
     "bcryptjs": "^2.4.3",  
     "dotenv": "^10.0.0",  
     "mongoose": "^6.0.10",  
     "mongodb-memory-server": "^8.0.4"  
     }  

CODE COVERAGE REPORT:
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   96.26 |       85 |     100 |   95.83 |                   
 database.js      |   95.83 |       85 |     100 |   95.29 | 15-31             
 productSchema.js |     100 |      100 |     100 |     100 |                   
 userSchema.js    |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
