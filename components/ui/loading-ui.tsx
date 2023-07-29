import React from "react";

const LoadingUI = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-bounce">
        <p className=" text-2xl font-bold text-center text-purple-400">
          Currently Making Magic...
        </p>
      </div>
    </div>
  );
};

export default LoadingUI;
