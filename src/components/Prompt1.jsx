// import React and state initialization hook
import React, {useState} from "react";

// import FakerJS for fake data
import { faker } from "@faker-js/faker";

// import scss
import  "../scss/main.scss";
import "../scss/testing.scss";

//functional component 'productPrompt'
const productPrompt = () => {

  // generating product list with FakerJS
  const initialProductData = Array.from({ length: 20}, () => ({
    name: faker.commerce.product(),
    price: faker.commerce.price({min: 1, max: 100}),
    material: faker.commerce.productMaterial()
  }));

    //initialize state-variables
    const [userMessage, setUserMessage] = useState(''); 
    const [productData, setProductData] = useState(initialProductData);
    const [response, setResponse] = useState(null);
    const [secondUserMessage, setSecondUserMessage] = useState('');
    const [isFirstPromptGenerated, setIsFirstPromptGenerated] = useState(false);

  // template string with the product list 
  const promptContext = 
`
I have an assortment list for my new e-commerce webshop. \n
My webshop has the following products:

${productData.map(({name, price, material}) => 
  `
${name} - ${price} - ${material}`).join('\n')}
`;

  const secondPromptContext = 
`
Thanks for the response, but the client is looking for something more specific. \n
This is the new prdocutlist: \n
${response ? JSON.stringify(response) : "No product data available"}
`;

  // template string that creates output of product list in JSON
  const promptTable = 
`
I wish to recieve a list in JSON format of the product list in the following structure: \n
{"name": <product name>, "price": <product.price>, "material": <product.material>}
`;

  // function that generates a prompt. Checks if 'userMessage' is not empty
  const createPrompt = () => {
    if(!userMessage) {
      alert('Please add a prompt!');
      return;
    }

    // drawing the complete prompt by adding the necessary parts
    const prompt = 
`
    ${promptContext} 

The client is asking for the following: \n
"${userMessage}". \n
Give me a product list that is relevant to the user's message! 

    ${promptTable}
`;

    console.log(prompt);

    setIsFirstPromptGenerated(true);
  };

  const createSecondPrompt = () => {
    if(!secondUserMessage) {
      alert('Please add a prompt!');
      return;
    }

    const secondPrompt = 
`
    ${secondPromptContext}

The  client is asking for the following: \n
"${secondUserMessage}". \n
Give me a product list that is relevant to the user's second message.

    ${promptTable}
`;

    console.log(secondPrompt);

    // const updateProductData = [];
    // setProductData(updateProductData);
    // setResponse(updateProductData)
  }

  // rendering of component. Button click starts the prompt tool
  return(
    <div className="prompt-tool-container">
      <div className="prompt-input-container">
        <input 
        className="prompt-input-box"
        type="text"
        placeholder="Enter user message"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)} 
        />
        <button className="prompt-input-btn" onClick={createPrompt} disabled={isFirstPromptGenerated}>Generate prompt</button>
      </div>

      <div className="prompt-textarea">
        <textarea
        placeholder="Paste openAI response in here"
        rows="5"
        cols="50"
        onChange={(e) => {
          try {
            const parsedResponse = JSON.parse(e.target.value);
            setProductData(parsedResponse);
            setResponse(parsedResponse);
          } catch (error) {
            console.error('Error parsing JSON table:', error);
          }
        }}
        ></textarea>
      </div>

      <div className="prompt-input-container2">
        <input
          className="prompt-input-box2"
          type="text"
          placeholder="Enter second user message"
          value={secondUserMessage}
          onChange={(e) => setSecondUserMessage(e.target.value)}
        />
        <button className="prompt-input-btn2" onClick={createSecondPrompt}>Generate second prompt</button>
      </div>
    </div>
    
  );
}

// exporting the component
export default productPrompt;