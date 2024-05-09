import * as Yup from "yup";

export const customLoginValidations = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required*")
    .test(
      "no-spaces",
      "Email should not contain only spaces",
      (value) => !/^\s+$/.test(value)
    ),
  password: Yup.string()
    .min(7)
    .required("Password is required*")
    .test(
      "no-spaces",
      "Password should not contain only spaces",
      (value) => !/^\s+$/.test(value)
    ),
});

export const customSignupValidations = Yup.object({
    email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required*")
    .test(
        "no-spaces",
        "Email should not contain only spaces",
        (value) => !/^\s+$/.test(value)
    ),
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
    password: Yup.string()
      .min(7)
      .trim(true)
      .required("Password is required*")
      .test(
        "no-spaces",
        "Password should not contain only spaces",
        (value) => !/^\s+$/.test(value)
    ),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and Confirm Password not matched")
      .required("Confirm Password is required")
      .test(
        "no-spaces",
        "Confirm Password should not contain spaces",
        (value) => !/^\s+$/.test(value)
    )
    .label("Confirm Password"),
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
});
