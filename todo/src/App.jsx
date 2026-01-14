import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);

  const steps = [
    {
      title: "Let's get you set up",
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email"
    },
    {
      title: "Create a password",
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Create a password (min. 6 characters)"
    },
    {
      title: "Personal Information",
      label: "Full Name",
      type: "text",
      name: "name",
      placeholder: "Enter your full name"
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="flex flex-col gap-3 bg-green-100 items-center justify-center h-screen">
      <AnimatePresence mode="wait">
  {step <= 3 ? (
    <motion.div
      key={step}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-gray-700">{currentStep.title}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
        className="space-y-4 w-80"
      >
        <div>
          <label
            htmlFor={currentStep.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {currentStep.label}
          </label>
          <input
            type={currentStep.type}
            id={currentStep.name}
            name={currentStep.name}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={currentStep.placeholder}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md px-4 py-3 transition duration-300"
        >
          Next
        </button>
      </form>
    </motion.div>
  ) : (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-gray-700">Account Created!</h1>
      <p className="text-gray-600">
        Your account has been successfully created.
      </p>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
