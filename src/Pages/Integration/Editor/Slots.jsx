import React, { useState } from 'react';
import {Button} from 'antd';
import SlotsForm from './SlotsForm';


const Slots = () => {
  const [components, setComponents] = useState([]); 
  const [slotsno, setSlotsno] = useState(0);

  function renderForm() { 
    setSlotsno(slotsno+1);
    setComponents([...components, slotsno]);

  } 

  return (
    <>
    
    <div className="Slot-container">
      {components.map(() => ( <SlotsForm /> ))} 
          <div className = "btnContainer" >
            <Button className = "makeDivsBtn"  onClick = {renderForm}> 
              Add Slot Type
            </Button>
          </div>
        </div>

    </>
  );

}

export default Slots;