import React, { useId } from "react";

function Select({ options, label, className, inputRef, ...props }) {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="">
          {label}{" "}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={inputRef}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
