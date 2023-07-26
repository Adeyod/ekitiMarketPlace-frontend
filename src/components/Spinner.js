import React from 'react';

function Spinner() {
  return (
    <div className="fixed inset-0 bg-black opacity-70 z-[9999] flex items-center justify-center">
      <div className="w-10 h-10 border-3 border-dashed border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
