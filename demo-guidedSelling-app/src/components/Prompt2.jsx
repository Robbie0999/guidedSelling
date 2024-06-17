// Import necessary libraries
import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import '../scss/promptTool.scss';
import botIcon from '../assets/icons/chat-bot.png';
import userIcon from '../assets/icons/user.png';
import dummyData from '../assets/data/database.json';

// Function to render the product recommendation tool
const ProductPrompt = () => {
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [chatMessages, setChatMessages] = useState([{
    text: 'Welcome to the Greenvoyage product recommendation tool. How can I help you today?', 
    sender: 'bot'
  }]);
  const [fullPrompt, setFullPrompt] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const responseTextarea = useRef(null);

  const createPrompt = async () => {
    if (!userMessage) {
      alert('Please add a prompt!');
      return;
    }

    setChatMessages(prevMessages => [...prevMessages, {
      text: userMessage, 
      sender: 'user'
    }]);

    function getCollectionsPrompt() {
      const collections = dummyData.collections.map(collection => {
        const products = collection.products.map(product => `
        - **${product.id}:** ${product.description}, price: ${product.price.currency} ${product.price.amount}, ${product.size}
        `).join('');
    
        return `
        **${collection.title}:** ${collection.description}
        ${products}
        `;
      }).join('');
        
      return `Our shop offers these collections and products:${collections}`;
    }
    
    const promptContext = `
      You are a sales person of the company Greenvoyage who knows everything about the products they sell. Greenvoyage is a sustainable luggage company from Copenhagen, Denmark, founded in 2014. They offer eco-friendly, high-end luggage and accessories. The company is known for its innovative designs and commitment to sustainability.
    `;

    const promptTable = `
    ${getCollectionsPrompt()}
    
    ---
    
    An user is asking for the following information:
    `;

    const prompt = `
    ${promptContext}
    
    ${promptTable}
    
    "${userMessage}"
    
    Based on the user's question, please provide relevant product recommendations from the product list. Return the data in JSON format with only product IDs and no description. Ensure the data is always displayed in the order that makes sense to the user's need. Start the response with a sales-like introduction. Also, if external information (e.g. product sizes) needs to be collected, show that in the response please. The format of the response should be in JSON:

    {
      "chatGPTResponse": "ChatGPT's response explaining the selection of suitcases.",
      "productIDs": [
      "<product id>",
      "<product id>",
      ...
      ]
    }

    Important: Ensure that the product IDs are used exactly as specified in the provided list, without any spelling or formatting errors. Double-check the IDs to prevent any mistakes.
    Use clear and concise language to explain the products and their features.
    `;
    console.log(prompt);

    setFullPrompt(prompt);
    setUserMessage('');
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
  }

  const responseJSON = (e) => {
    try {
      const botMessage = e.target.value;
  
      const response = JSON.parse(botMessage);
      
      // Extract chatGPTResponse and productIDs from response
      const { chatGPTResponse, productIDs } = response;
  
      // Update state with chatGPTResponse
      setChatMessages(prevMessages => [
        ...prevMessages,
        { text: chatGPTResponse, sender: 'bot' }
      ]);
  
      // Update state with recommended product IDs
      setRecommendedProducts(productIDs);
  
      if (responseTextarea.current) {
        responseTextarea.current.value = '';
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };
  
  // Function to handle Enter key press
  const enterKey = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const botMessage = e.target.value.trim();

      try {
        const parsedResponse = JSON.parse(botMessage);

        if (Array.isArray(parsedResponse)) {
          setChatMessages(prevMessages => [...prevMessages, {
            text2: 'That is a great question! Here are the products you recommended:',
            jsonList: parsedResponse,
            sender: 'bot',
            isJson: true
          }]);

          // Update recommended products and show product list
          setRecommendedProducts(parsedResponse);
        } else {
          setChatMessages(prevMessages => [...prevMessages, {
            text: botMessage,
            sender: 'bot',
          }]);
        } 
        setResponse(parsedResponse);
      } catch (error) {
        setChatMessages(prevMessages => [...prevMessages, {
          text: botMessage,
          sender: 'bot'
        }]);
        setResponse(botMessage);
      }
      if (responseTextarea.current) {
        responseTextarea.current.value = '';
      }
    }
  }

  // Function to reset recommended products
  const resetRecommendedProducts = () => {
    setRecommendedProducts([]);
  };

  // Return component
  return (
    <>
      <div className="prompt-tool-container">
        <div className="left-panel">
          <div className="prompt-tool-chat">
            <div id="prompt-container">
              <input 
                className='prompt-input'
                type="text"
                placeholder="Enter prompt please..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <button className='prompt-btn' onClick={createPrompt}>
                send
              </button>
            </div>

            <div className="chat-container">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message-container ${msg.sender}`}>
                  {msg.sender === 'bot' ? (
                    <>
                      <div className="chat-icon-container">
                        <img className='chat-icon' src={botIcon} alt="" />
                      </div>
                      <div className={`chat-message ${msg.sender}`}>
                        {msg.text}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`chat-message ${msg.sender}`}>
                        {msg.text}
                      </div>
                      <div className="chat-icon-container">
                        <img className='chat-icon' src={userIcon} alt="" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="get-prompt-container">
              <button className='get-prompt-btn' onClick={copyPrompt}>copy prompt</button>
            </div>
          </div>

          <div className="response-openAI-container">
            <textarea 
              className='response-openAI' 
              rows="2"
              cols="45"
              placeholder='Paste OpenAI response in here...'
              ref={responseTextarea}
              onChange={responseJSON}
              onKeyDown={enterKey}
            ></textarea>
          </div>
        </div>
        <div className="right-panel">
          <ProductList 
            recommendedProducts={recommendedProducts} 
            resetRecommendedProducts={resetRecommendedProducts} 
          />
        </div>
      </div>
    </>
  );
};

export default ProductPrompt;
