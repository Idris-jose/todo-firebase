import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(s => s + 1);

  return (
   <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0e0f12]">
  {/* light blobs */}
  <div className="absolute inset-0">
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
  </div>

<div className="relative z-10 w-[420px] rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-white">
      <AnimatePresence mode="wait">

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-white font-light text-4xl">Yoooo,Get started</h1>
            <button
              onClick={nextStep}
              className="mt-6 w-full text-lg bg-white text-black rounded-md px-4 py-3"
            >
              Let's go!
            </button>
          </motion.div>
        )}
  
        {step === 2 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 justify-center items-center"
          >
            <h1 className="text-white text-3xl">What's your email?</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className="space-y-4 w-80"
            >
              <input
                type="email"
                className="w-full p-3 border border-white/5 rounded-md"
                placeholder="Enter your email"
                required
              />

              <button className="w-full text-lg bg-white text-black rounded-md px-4 py-3">
                Next
              </button>
            </form>
          </motion.div>
        )}



      </AnimatePresence>
      </div>
    </div>
  );
}
