import React from "react";
import dayjs from "dayjs";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const CustomEditProfileLayout = ({
  userProfileData,
  handleChange,
  handleBlur,
  setValues,
  errors,
  touched,
  values,
  countryData,
  handleSubmit,
  isUploadImage,
  setIsUploadImage,
}) => {
  const imageChange = (e) => {
    console.log("New image", e.target.files[0]);

    if(isUploadImage){
        setValues((prev) => {
          let newObj = { ...prev };
          newObj["profilePic"] = e.target.files[0];
          return newObj;
        });
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-[1.5%] w-[95%] mx-auto mt-[5%] shadow-lg rounded-lg"
    >
      <div className="text-zinc-600 text-xl font-bold text-center  mb-5">
        Edit Your Profile
      </div>
      <div id="form-input-container">
        <div
          id="email-username"
          className="grid grid-cols-2 items-center gap-5"
        >
          <div id="no-pointer-email-input" className="w-[100%]">
            <div className="font-semibold justify-start text-md mb-1">
              Email:
            </div>

            <input
              type="text"
              value={userProfileData.email}
              className="border-2 rounded-lg p-2 w-[100%] outline-none flex flex-row align-middle pointer-events-none"
            />
          </div>

          <CustomInput
            type="text"
            name={"username"}
            label="Username: "
            placeholder="Enter new username"
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.username}
            touched={touched.username}
            value={values.username}
          />
        </div>

        <div
          id="name-countrycode-phoneNumber"
          className="grid grid-cols-2 items-center gap-5 mb-5"
        >
          <div>
            <CustomInput
              type="text"
              label="Name:"
              placeholder="Enter new name"
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.name}
              touched={touched.name}
              name={"name"}
              value={values.name}
            />
          </div>
          <div>
            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.phoneNumber}
              touched={touched.phoneNumber}
              value={values.phoneNumber}
              dropdown_value={values.countryCode}
              default_select_value="country code"
              type="number"
              countryData={countryData}
              dropdown_name="countryCode"
              dropdown_error={errors.countryCode}
              dropdown_touched={touched.countryCode}
              dropdown_onChange={handleChange}
              dropdown_onBlur={handleBlur}
              placeholder="Enter the phone number"
              label="Phone Number:"
              name="phoneNumber"
            />
          </div>
        </div>
        <div id="gender-dob" className="grid grid-cols-2 items-center gap-5">
          <div>
            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.gender}
              touched={touched.gender}
              name="gender"
              type="dropdown"
              label="Gender:"
              value={values.gender}
              selectOptionArray={["Male", "Female", "Others"]}
              default_select_value="Select the gender"
            />
          </div>
          <div>
            <CustomInput
              type="date"
              label="Date of Birth:"
              name="dob"
              value={values.dob ? dayjs(values.dob, "YYYY-MM-DD") : null}
              onChange={(e) =>
                setValues({ ...values, dob: dayjs(e).format("YYYY-MM-DD") })
              }
              onBlur={handleBlur}
              errors={errors.dob}
              touched={touched.dob}
            />
          </div>
        </div>
        <div id="profilePic" className="grid grid-cols-2 gap-5 mt-[2%]">
          {isUploadImage ? (
            <div className="grid grid-cols-2 items-center">
            <div>
            <CustomInput
              onChange={imageChange}
              onBlur={handleBlur}
              type="file"
              accept="image/*"
              label="Select profile picture"
              name="profilePic"
              />
              </div>
              <div>

            <CustomButton
            text={"Upload Image"}
            onClick={()=>setIsUploadImage(true)}
            className={
                " bg-red-400 p-[0.7%] text-white rounded font-bold "
            }
            />
            </div>
            </div>
          ) : (
            <div id="upload-image">
              <div className="font-semibold justify-start text-md mb-1">
                Profie picture:
              </div>

              <div className="flex flex-row items-center gap-2">
                <input
                  type="text"
                  className="pointer-events-none border-2 p-[1.5%] placeholder-black h-[10%] rounded-lg w-[85%] "
                  placeholder={values.profilePic.toString().substring(0, values.profilePic.toString().length-20) + "...."}
                />
                <CustomButton
                  text={"Upload Image"}
                  onClick={()=>setIsUploadImage(true)}
                  className={
                    " bg-red-400 p-[0.7%] text-white rounded font-bold "
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomButton
        text="Update Profile"
        className={
          " mt-[1%] bg-green-400 p-[0.5%] text-white rounded font-bold text-xl shadow-lg flex ml-auto mr-auto"
        }
      />
    </form>
  );
};

export default CustomEditProfileLayout;
