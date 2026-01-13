import React from 'react';
import { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(prev => prev + 1);
  }
  return (  
    <div>
      <h1>Todo App</h1>
    </div>
  );
}