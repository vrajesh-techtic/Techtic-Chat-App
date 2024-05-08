import React from "react";

const CustomButton = ({ className, text, onClick }) => {
  return (
    <div>
      <button type="submit" className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
