import * as Yup from 'yup';

export const customEditProfileValidation= Yup.object({
    name: Yup.string()
      .required("Name is required*")
      .test(
        "no-spaces",
        "Name should not contain only spaces",
        (value) => !/^\s+$/.test(value)
      ),
    username: Yup.string()
    .required("Username is required*")
    .test(
      "no-spaces",
      "Username should not contain only spaces",
      (value) => !/^\s+$/.test(value)
    ),
   
    phoneNumber: Yup.string()
      .required("Phone number is required*")
      .min(10)
      .max(10)
      .test(
        "no-spaces",
        "Phone number should not contain spaces and should be positive",
        (value) => value ? value >0 && !/^\s+$/.test(value) : " " 
      )
      .label("Phone Number"),
      gender: Yup.string().required("Gender is required"),
      dob: Yup.date().required("Date of birth is required"),
      countryCode: Yup.string().required("Please select country code"),
      profilePic: Yup.mixed().required("Please upload image") 
})