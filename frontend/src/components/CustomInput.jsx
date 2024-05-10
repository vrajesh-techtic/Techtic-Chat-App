import React, { useEffect, useState } from "react";
import { country_code } from "../demoCountryCodePhoneNum";
import { DatePicker } from "antd";
import axios from "axios";

const errorStyle = {
  color: "red",
};
const CustomInput = ({
  type,
  name,
  value,
  label,
  placeholder,
  dropdown_name,
  default_select_value,
  dropdown_value,
  dropdown_error,
  dropdown_touched,
  dropdown_onChange,
  dropdown_onBlur,
  touched,
  errors,
  onChange,
  onBlur,
  accept,
  selectOptionArray,
  countryData
}) => {
 
  return (
    <>
      <div className="my-1 flex flex-col">
        <div
          id="label"
          className="font-semibold flex flex-row justify-start text-md mb-1"
        >
          {label}
        </div>
        {type !== "number" && type !== "dropdown" && type !== "date" && (
          <input
            className="border-2 rounded-lg p-2 outline-none flex flex-row align-middle"
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            autocomplete="off"
            accept={accept ?? accept}
          />
        )}

        {type == "number" && (
          <>
            <div className="flex flex-row">
              <select
                name={dropdown_name}
                value={dropdown_value}
                className="flex flex-col border-2 rounded-l-lg p-[2%] w-[44%]"
                onChange={dropdown_onChange}
                onBlur={dropdown_onBlur}
              >
                <option value="">{default_select_value}</option>
                {countryData?.map((country) => (
                  <option value={country.code}>
                    {country.iso + "  +" + country.code}
                  </option>
                ))}
              </select>
              <input
                className="flex flex-col border-2 border-l-0 p-2 w-[100%] outline-none align-middle rounded-r-lg"
                type="number"
                name={name}
                placeholder={placeholder}
                value={value}
                autocomplete="off"
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          </>
        )}

        {type == "date" && (
          <DatePicker
            className="p-[2%] border-2 border-[#e5e7eb] font-bold"
            style={{ fontSize: "17px" }}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}

        {type == "dropdown" && (
          <select
            className="border-2 rounded-lg p-2 outline-none flex flex-row align-middle"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value=""> -- {default_select_value} --</option>

            {selectOptionArray?.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex flex-row gap-[15px]">
        {dropdown_error && dropdown_touched && (
          <div className="text-sm my-1" style={errorStyle}>
            {dropdown_error}
          </div>
        )}

        {errors && touched && (
          <div className="text-sm my-1" style={errorStyle}>
            {errors}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomInput;
