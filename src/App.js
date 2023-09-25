import React from 'react';
import {Route,Routes} from "react-router-dom";
import Stats from './Pages/Statistics';
import Integration from './Pages/Integration';
import Manage from './Pages/Manage';
import Bill from './Pages/Billing';
import Template from './Pages/Integration/Template';
import PrimaryInfo from './Pages/Integration/PrimaryInfo';
import Editor from './Pages/Integration/Editor';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Stats />} />
      <Route path="/Integration" element={<Integration />}/>
      <Route path="/Integration/Primary-Information" element={<PrimaryInfo />}/>
      <Route path="/Integration/Template" element={<Template />}/>
      <Route path="/Integration/Editor" element={<Editor />}/>
      <Route path="/Manage" element={<Manage />}/>
      <Route path="/Billing" element={<Bill />} />
    </Routes>
    </>
  );
}

export default App;
