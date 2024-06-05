// import React and state initialization hook.
import React, { useState, useEffect, useRef } from 'react';

// import sass.
import  '../scss/promptTool.scss';

// import assets icons.
import botIcon from '../assets/icons/chat-bot.png';
import userIcon from '../assets/icons/user.png';

// import JSON data.
import dummyData from '../assets/data/database.json';

const productPrompt2 = () => {
  // console.log(dummyData.collections)

  //initialize state-variables.
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [chatMessages, setChatMessages] = useState([{
    text: 'Welcome to the Greenvoyage product recommendation tool. How can I help you today?', 
    sender: 'bot'
  }]);
  const [fullPrompt, setFullPrompt] = useState('');

  // Textarea reference
  const responseTextarea = useRef(null);

  // Code within useEffect will only be used during the first render, because of the empty array as the second argument.
  // The function makes a POST-request to mock-API-server and add an userID to the response data.
  // The first bot message will be displayed during the frist render.
  useEffect(() => {
    const welcomeMessage = 'Welcome to the Greenvoyage product recommendation tool. How can I help you today?';
  }, []);

  // Function gets called when the user clicks the 'prompt-btn' button.
  const createPrompt = async () => {

    // Alert when userMessage value is empty
    if (!userMessage) {
      alert('Please add a prompt!');
      return;
    }

    //The userMessage will be added to the chatMessages state variable.
    setChatMessages(prevMessages => [...prevMessages, {
      text: userMessage, 
      sender: 'user'
    }]);

    // Function that generates the collections prompt with the JSON dummy database.
    function getCollectionsPrompt() {
      const collections = dummyData.collections.map(collection => {
        const products = collection.products.map(product => `
          ${product.title}
          ${product.description}
          price: ${product.price.currency} ${product.price.amount}
        `).join('\n');
    
        return `
        \n\n\n---
          \n${collection.title}: 
          \n${collection.description} 
          \nProducts in this collection: 
          \n${products}
        `;
      }).join('\n');
    
      return `\nOur shop offers these collections and products:${collections}`;
    }
    
    // Information about the made-up company 'Greenvoyage'.
    const promptContext = `
      \nGreenvoyage is a sustainable luggage company from Copenhagen, Denmark, founded in 2014. They offer eco-friendly, high-end luggage and accessories. The company is known for its innovative designs and commitment to sustainability.
    `;

    // Instructions to chatGPT.
    const promptTable = `
     \n${getCollectionsPrompt()} \n
     \nAn user is asking for the following information:
    `;

    // Generates the prompt by adding the promptContext, promptTable and userMessage to the fullPrompt state variable.
    const prompt = `
      ${promptContext}
      ${promptTable}
      \n${userMessage}
      \nCould you provide some recommendations, based on the users request? Return the data in JSON!
    `
      console.log(prompt);

      setFullPrompt(prompt);

    // The userMessage will be reset to an empty string.
    setUserMessage('');
  };


  // Function that copies the fullPrompt to the user's clipboard, by using the clipboard API.
  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
  }

  // Function that parses the JSON response from OpenAI and adds it to the response state variable.
  // Error handling if the input is not JSON.
  const responseJSON = (e) => {
    try {
      const parsedResponse = JSON.parse(e.target.value);
      setResponse(parsedResponse);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  const enterKey = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const botMessage = e.target.value.trim();

    try{
      const parsedResponse = JSON.parse(botMessage);

      if (parsedResponse && typeof parsedResponse === 'object') {
        setChatMessages(prevMessages => [...prevMessages, {
          text2: 'That is a great question! Here are the products you recommended:',
          jsonList: parsedResponse,
          sender: 'bot',
          isJson: true
        }]);
      } else {
        setChatMessages(prevMessages => [...prevMessages, {
          text: botMessage,
          sender: 'bot',
        }]);
      } 
      setResponse(parsedResponse);
    }  catch (error) {
        setChatMessages(prevMessages => [...prevMessages, {
          text: botMessage,
          sender: 'bot'
        }]);
        setResponse(botMessage);
    }
      if(responseTextarea.current){
        responseTextarea.current.value = '';
      }
    }
  }

  // rendering of component. Button click starts the prompt tool. 'setUsermessage' useState will be updated to the 'userMessage' state variable.
  return (
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
                      {msg.text2 && <div>{msg.text2}</div>}
                      {msg.isJson ? (
                        <ul>
                          {Object.entries(msg.jsonList).map(([key, value], idx) => (
                            <li key={idx}>
                              <strong>{key}:</strong>
                              {Array.isArray(value) ? (
                                <ul>
                                  {value.map((item, idx2) => (
                                    <li key={idx2}>
                                      {Object.entries(item).map(([key2, value2]) => (
                                        <div key={key2}>{key2}: {value2}</div>
                                      ))}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div>{JSON.stringify(value)}</div>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        msg.text
                      )}
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
    </div>
  );

};

export default productPrompt2;