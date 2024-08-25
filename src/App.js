import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard/dashboard';
import Navbar from './Navbar/navbar';

function App() {
  const [visibility, setVisibility] = React.useState('visible');
  const [slider, setSlider] = React.useState(100);
  const [state, setState] = React.useState('All');

  const handleChange = (val) => {
    console.log(val);
    
    setVisibility(val);
  };
 const handleSliderChange = (val) => {
    console.log(val);
    
    setSlider(val);
  };

  useEffect(()=>{
    // setVisibility(visibility);
  },[visibility])
  return (
    
    <div className="">
      <Navbar
      
      handleChange={(val)=>{
        handleChange(val);
      }}

      handleSlider={(val)=>{
        handleSliderChange(val);
      }}

      handleState={(val)=>{
        setState(val);
      }}
      />
      <Dashboard  
      
      visibility={visibility}
      slider={slider}
      state={state}
      
      />

    </div>
  );
}

export default App;
