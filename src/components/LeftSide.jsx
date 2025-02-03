/* eslint-disable no-unused-vars */
import React from 'react';

function LeftSide() {
  return (
    <div className="hidden md:flex md:w-[30%] bg-blue-600 flex-col justify-center items-center p-8">
      <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center">
        <span className="text-blue-600 text-3xl font-bold">Logo.</span>
      </div>
      <h1 className="text-white text-5xl font-bold mb-2">EmpowerNGO</h1>
      <p className="text-white text-center text-lg">
        Empowering change through digital transformation
      </p>
    </div>
  );
}

export default LeftSide;
