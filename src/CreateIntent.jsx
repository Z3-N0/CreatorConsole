// LexBotPage.js
import React from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: 'AKIAQFZJK2ZETYR7Q252', // Replace with your AWS access key
  secretAccessKey: 'mOY2EhHbTGYdNml+wx30hjk5uzdPGYlXVd3ZsR7Q', // Replace with your AWS secret key
});

const lexmodelbuildingservice = new AWS.LexModelBuildingService();

function LexBotPage() {
  async function createLexBot() {

    var params = {
      name: "DocOrderPizza", 
      conclusionStatement: {
       messages: [
          {
         content: "All right, I ordered  you a {Crust} crust {Type} pizza with {Sauce} sauce.", 
         contentType: "PlainText"
        }, 
          {
         content: "OK, your {Crust} crust {Type} pizza with {Sauce} sauce is on the way.", 
         contentType: "PlainText"
        }
       ], 
       responseCard: "foo"
      }, 
      confirmationPrompt: {
       maxAttempts: 1, 
       messages: [
          {
         content: "Should I order  your {Crust} crust {Type} pizza with {Sauce} sauce?", 
         contentType: "PlainText"
        }
       ]
      }, 
      description: "Order a pizza from a local pizzeria.", 
      fulfillmentActivity: {
       type: "ReturnIntent"
      }, 
      rejectionStatement: {
       messages: [
          {
         content: "Ok, I'll cancel your order.", 
         contentType: "PlainText"
        }, 
          {
         content: "I cancelled your order.", 
         contentType: "PlainText"
        }
       ]
      }, 
      sampleUtterances: [
         "Order me a pizza.", 
         "Order me a {Type} pizza.", 
         "I want a {Crust} crust {Type} pizza", 
         "I want a {Crust} crust {Type} pizza with {Sauce} sauce."
      ], 
      slots: [
         {
        name: "Type", 
        description: "The type of pizza to order.", 
        priority: 1, 
        sampleUtterances: [
           "Get me a {Type} pizza.", 
           "A {Type} pizza please.", 
           "I'd like a {Type} pizza."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "What type of pizza would you like?", 
           contentType: "PlainText"
          }, 
            {
           content: "Vegie or cheese pizza?", 
           contentType: "PlainText"
          }, 
            {
           content: "I can get you a vegie or a cheese pizza.", 
           contentType: "PlainText"
          }
         ]
        }
       }, 
         {
        name: "Crust", 
        description: "The type of pizza crust to order.", 
        priority: 2, 
        sampleUtterances: [
           "Make it a {Crust} crust.", 
           "I'd like a {Crust} crust."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaCrustType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "What type of crust would you like?", 
           contentType: "PlainText"
          }, 
            {
           content: "Thick or thin crust?", 
           contentType: "PlainText"
          }
         ]
        }
       }, 
         {
        name: "Sauce", 
        description: "The type of sauce to use on the pizza.", 
        priority: 3, 
        sampleUtterances: [
           "Make it {Sauce} sauce.", 
           "I'd like {Sauce} sauce."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaSauceType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "White or red sauce?", 
           contentType: "PlainText"
          }, 
            {
           content: "Garlic or tomato sauce?", 
           contentType: "PlainText"
          }
         ]
        }
       }
      ]
     };

    lexmodelbuildingservice.putIntent(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
    
  })
}

  const handleCreateBotClick = async () => {
    await createLexBot();
  };

  return (
    <div>
      <h1>Create Lex Bot</h1>
      <button onClick={handleCreateBotClick}>Create Intent</button>
    </div>
  );
}

export default LexBotPage;
