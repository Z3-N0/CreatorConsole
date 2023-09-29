import React, { useState } from 'react';
import {Button} from 'antd';
import IntentsForm from './IntentsForm';


const Slots = () => {
  const [components, setComponents] = useState([]); 
  const [intentsno, setIntetnsno] = useState(0);

  function renderForm() { 
    setIntetnsno(intentsno+1);
    setComponents([...components, intentsno]);

  } 

  return (
    <>
    
    <div className="Slot-container">
      {components.map(() => ( <IntentsForm /> ))} 
          <div className = "btnContainer" >
            <Button className = "makeDivsBtn"  onClick = {renderForm}> 
              Add Intent
            </Button>
          </div>
        </div>

    </>
  );

}

export default Slots;