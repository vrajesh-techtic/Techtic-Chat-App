import React from 'react'
import {country_code} from '../demoCountryCodePhoneNum'
import { DatePicker } from 'antd';

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
    touched,
    errors,
    onChange,
    onBlur,
    accept,
    selectOptionArray
}) => {
  return (
    <>
      <div className="my-1 flex flex-col">
          <div id='label' className="font-semibold flex flex-row justify-start text-md mb-1">
            {label}
          </div>
         {(type !=="number" && type !== "dropdown" && type!=="date") && 
         (<input className="border-2 rounded-lg p-2 outline-none flex flex-row align-middle" name={name} value={value} type={type} placeholder={placeholder} onChange={onChange} onBlur={onBlur} autocomplete="off" accept={accept ?? accept}/>)}
         
         {type=="number" && (
          <>
                {/* {type =="number" && <div className="font-semibold flex flex-row justify-start text-lg mb-1">
                  {label}
                </div>} */}
                <div className="flex flex-row">

                  <select name={dropdown_name} className="flex flex-col border-2 rounded-l-lg p-[2%] w-[44%]">
                      {country_code?.map((country)=>(
                        <option value={country["code"]}>{country["iso"] + " " + country["code"]} </option>
                      ))}
                  </select>
                  <input  className="flex flex-col border-2 border-l-0 p-2 w-[100%] outline-none align-middle rounded-r-lg" type="text" name={name} placeholder={placeholder} autocomplete="off" onChange={onChange} onBlur={onBlur}/>
              
                </div>
          </>
         
         )}

         {type=="date" &&  
         
         <DatePicker className="p-[2%] border-2 border-[#e5e7eb] font-bold" style={{fontSize: "17px"}}/>}

         {type == "dropdown" && (
           <select className="border-2 rounded-lg p-2 outline-none flex flex-row align-middle" name={name}>
          <option value={default_select_value}> -- {default_select_value} --</option>

         {selectOptionArray?.map((val)=>(
            <option value={val}>{val}</option>
         ))} 
          </select>
         )}
      </div>
      {errors && touched && (
        <div className="text-sm my-1" style={errorStyle}>
          {errors}
        </div>
      )}
    </>
  )
}

export default CustomInput
