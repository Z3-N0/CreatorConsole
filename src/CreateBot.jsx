// LexBotPage.js
import React from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: 'AKIAQFZJK2ZETYR7Q252', // Replace with your AWS access key
  secretAccessKey: 'mOY2EhHbTGYdNml+wx30hjk5uzdPGYlXVd3ZsR7Q', // Replace with your AWS secret key
});

const lexModelBuildingService = new AWS.LexModelBuildingService();

function LexBotPage() {
  async function createLexBot() {

    var params = {
      name: "DocOrderPizzaBot", 
      childDirected: false, 
      abortStatement: {
        messages: [
           {
          content: "I don't understand. Can you try again?", 
          contentType: "PlainText"
         }, 
           {
          content: "I'm sorry, I don't understand.", 
          contentType: "PlainText"
         }
        ]
       }, 
      idleSessionTTLInSeconds: 300, 
      locale: "en-US", 
      enableModelImprovements: true,
      intents: [
        {
       intentName: "DocOrderPizza", 
       intentVersion: "$LATEST"
      }
     ], 
     };

 
    lexModelBuildingService.putBot(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else     console.log(data);       
    })
    
  }

  const handleCreateBotClick = async () => {
    await createLexBot();
  };

  return (
    <div>
      <h1>Create Lex Bot</h1>
      <button onClick={handleCreateBotClick}>Create Bot</button>
    </div>
  );
}

export default LexBotPage;
