import React from "react";

const Inputfield = ({ placeholder, value, onChange, type = "text" }) => {
    return (
        <input
            type={type}               // Default to text if type is not provided
            placeholder={placeholder}  // Placeholder text for the input field
            value={value}              // The controlled input value
            onChange={onChange}        // Handler to update the state when input changes
            style={{ padding: "8px", margin: "10px 0", width: "100%" }} // Optional styling
        />
    );
};

export default Inputfield;
