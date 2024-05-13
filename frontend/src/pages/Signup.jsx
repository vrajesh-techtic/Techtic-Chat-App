import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { customSignupValidations } from "../utils/loginSignupValidators";
import axios from "axios";
import notificationProvider from "../utils/notificationProvider";
import StepSignup1 from "../components/StepSignup1";
import StepSignup2 from "../components/StepSignup2";
import StepSignup3 from "../components/StepSignup3";
import StepSignup4 from "../components/StepSignup4";
import CustomSignupLoginHeader from "../components/CustomSignupLoginHeader";
import WithoutAuth from "../routerProtector/WithoutAuth";

const Signup = () => {
  const { openNotification, contextHolder } = notificationProvider();
  const [step, setStep] = useState(1);

 


  const initialValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    profilePic: {},
    gender: "",
    countryCode: "",
    dob: "",
  };

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    values,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: customSignupValidations,
    onSubmit: async (values) => {
      // console.log("values: ", values);
      try {
        // const formData = new FormData();
        const formData = {
          email: values?.email,
          username: values?.username,
          name: values?.name,
          password: values?.password,
          confirmPassword: values?.cpassword,
          phoneNumber: values?.phoneNumber.toString(),
          countryCode: values?.countryCode,
          profilePic: values?.profilePic,
          gender: values?.gender,
          dob: values?.dob,
        };

        // console.log("formData -->", formData);

        const response = await axios.post(
          `http://localhost:5000/api/user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.data.status == true) {
          openNotification(response.data.message, "success");
          localStorage.setItem("user", JSON.stringify(response.data.data));
          resetForm();
          return;
        }
        if (response.data.status == false) {
          openNotification(response.data.error, "error");
          resetForm();
          return;
        }
      } catch (error) {
        console.log("Error in signup -->", error);
        openNotification(error.response.data.message, "error");
        resetForm();
        return;
      }
    },
  });

  // increment / decrement step

  const handleStep = (action, errors = null) => {
    if (action == "increment" && step < 4 && errors) {
      if (
        step === 1 &&
        !(!values.email || !values.name || !values.username) &&
        !(errors.email && errors.name && errors.username)
      ) {
        setStep(step + 1);
      }
      if (
        step == 2 &&
        !errors.password &&
        !errors.cpassword &&
        !(!touched.password || !touched.cpassword)
      ) {
        setStep(step + 1);
      }
      if (step == 3 && !errors.phoneNumber) {
        setStep(step + 1);
      }
      if (step == 4 && !errors.gender && !errors.dob) {
        setStep(step + 1);
      }
    }
    if (action == "decrement" && step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <CustomSignupLoginHeader />
      {contextHolder}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[-5%] bg-white w-[35%] z-10 shadow-xl  p-[2%] mx-auto rounded-lg"
      >
        <div className="text-center font-bold text-xl text-zinc-500">
          Signup
        </div>
        <Divider style={{ border: "1px solid #e5e7eb" }} className="my-2" />

        {/* In step 1 signup, only display email, username and name fields  */}

        {step == 1 && (
          <StepSignup1
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
          />
        )}

        {/* In step 2 signup, only display password and confirm password  */}

        {step == 2 && (
          <StepSignup2
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
          />
        )}

        {/* In step 3 signup, only display phone number and upload image  */}

        {step == 3 && (
          <StepSignup3
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
          />
        )}

        {/* In step 4 signup, only display gender and date */}

        {step == 4 && (
          <StepSignup4
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
            setValues={setValues}
          />
        )}

        <div className="grid grid-cols-2 gap-10 my-2">
          {step > 1 && step <= 4 && (
            <CustomButton
              onClick={() => handleStep("decrement")}
              className={`p-[3.5%] shadow-xl  rounded-lg text-center bg-red-500 text-white text-lg font-semibold w-[100%]`}
              text={"Back"}
            />
          )}
          {step < 5 && (
            <CustomButton
              onClick={() => handleStep("increment", errors)}
              className=" p-[3.5%] shadow-xl  rounded-lg text-center bg-green-400 text-white text-lg font-semibold w-[100%] "
              text={step < 4 ? "Continue" : "Submit"}
            />
          )}
        </div>

        <Divider style={{ border: "1px solid #e5e7eb" }} className="my-2" />

        <Link
          className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto"
          to="/login"
        >
          Already have an account, Click here!
        </Link>
      </form>
    </>
  );
};

export default WithoutAuth(Signup);
