import React from "react";

const ChatBot = () => {
  return (
    <div>
      <h1>How can help I you today?</h1>
      <h1>This page currently in working!</h1>
      <div className="chatbot-container bg-light p-5 rounded-lg shadow-md mt-5">
        <div className=" border-4 border-primary rounded-lg p-4 mb-4">
          Hi! I have a question about car price prediction.
        </div>
        <div className="chatbot-message bot-message mb-3 p-3 bg-secondary text-white rounded-lg">
          Hello! I'm AutoWise AI, your friendly assistant for vehicle price
          predictions. How can I assist you today?
        </div>
        <div className="chatbot-message user-message mb-3 p-3 bg-primary text-white rounded-lg">
          Can you tell me how to use the car price predictor?
        </div>
        <div className="chatbot-message bot-message mb-3 p-3 bg-secondary text-white rounded-lg">
          Of course! To use the car price predictor, simply navigate to the "Car
          Predictor" page from the homepage. There, you'll find a form where you
          can select the company, model, year of purchase, and other details
          about your car. Once you fill in the information and submit the form,
          our AI will analyze the data and provide you with an estimated price
          for your vehicle. If you have any specific questions about the form or
          the prediction process, feel free to ask!
        </div>
        <div className="chatbot-message user-message mb-3 p-3 bg-primary text-white rounded-lg">
          That's great! Can you also help me with bike price prediction?
        </div>
        <div className="chatbot-message bot-message mb-3 p-3 bg-secondary text-white rounded-lg">
          Absolutely! Just like the car price predictor, we also have a "Bike
          Predictor" page. You can select the company, model, year of purchase,
          and other relevant details about your bike. After submitting the form,
          our AI will provide you with an estimated price for your bike as well.
          If you have any questions about using the bike predictor or need
          assistance with anything else, I'm here to help!
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
