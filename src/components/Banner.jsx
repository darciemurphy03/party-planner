import React from 'react';

export default function Banner({title}) {
  return (
    <div className=" bg-gradient-to-tr from-[#6a3e67] to-[#d259b4] flex justify-center items-center text-center h-44 mb-5 text-white shadow-lg">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}
