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
      <Route path="/integration" element={<Integration />}/>
      <Route path="/integration/primary-information" element={<PrimaryInfo />}/>
      <Route path="/integration/template" element={<Template />}/>
      <Route path="/integration/editor" element={<Editor />}/>
      <Route path="/manage" element={<Manage />}/>
      <Route path="/billing" element={<Bill />} />
    </Routes>
    </>
  );
}

export default App;
