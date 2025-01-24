import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";

export function UserRegister() {
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const [errorTheme, setErrorTheme] = useState("");
  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
      UserName: "",
      Mobile: "",
      Email: "",
    },

    validationSchema: yup.object({
      UserName: yup
        .string()
        .required("Enter the Name")
        .min(5, "Name must be at least 5 characters"),

      Password: yup
        .string()
        .required("Set the password")
        .min(4, "At least 4 characters required")
        .max(15, "Password should not exceed 15 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_{}[\]:;'<>?,./~`\\|+=-]).{4,15}$/,
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

      Mobile: yup
        .string()
        .required("Enter the mobile number")
        .matches(
          /^\+91\d{10}$/,
          "Mobile number should start with +91 and contain 10 digits"
        ),

      Email: yup
        .string()
        .required("Enter the valid email")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter a valid email address"
        ),
    }),

    onSubmit: (userDetails) => {
      axios
        .post("http://127.0.0.1:2222/register-user", userDetails)
        .then(() => {
          alert("User Added! Login Now");
          navigate("/user-login");
        });
    },
  });

  function verifyUser(e) {
    const userId = e.target.value;
    axios.get("http://127.0.0.1:2222/users").then((response) => {
      var user = response.data.find((item) => item.UserId === userId);
      if (user) {
        setError("UserId already Taken Try Another!");
        setErrorTheme("text-danger");
      } else {
        setError("User Id Available");
        setErrorTheme("text-success");
      }
    });
  }

  return (
    <div className="container-fluid">
      <h3 className="bg-warning text-center mt-3 p-2">Registration</h3>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="UserId" className="form-label fw-bold">
            UserId
          </label>
          <div>
            <input
              type="text"
              onKeyUp={verifyUser}
              className="form-control"
              name="UserId"
              onChange={formik.handleChange}
              id="UserId"
            />
          </div>
          <div className={errorTheme}>{error}</div>
          <label htmlFor="UserName" className="form-label fw-bold">
            Username
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              name="UserName"
              onChange={formik.handleChange}
              id="UserName"
            />
          </div>
          <div className="text-danger">{formik.errors.UserName}</div>
          <label htmlFor="Password" className="form-label fw-bold">
            Password
          </label>
          <div>
            <input
              type="password"
              id="Password"
              name="Password"
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="text-danger">{formik.errors.Password}</div>

          <label htmlFor="Mobile" className="form-label fw-bold">
            Mobile
          </label>
          <div>
            <input
              type="text"
              id="Mobile"
              name="Mobile"
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="text-danger">{formik.errors.Mobile}</div>

          <label htmlFor="Email" className="form-label fw-bold">
            Email
          </label>
          <div>
            <input
              type="email"
              className="form-control"
              name="Email"
              onChange={formik.handleChange}
              id="Email"
            />
          </div>
          <div className="text-danger">{formik.errors.Email}</div>

          <button type="submit" className="btn btn-success my-3 mx-3">
            Register
          </button>
          <Link to="/user-login" className=" btn btn-info text-decoration-none">
            already User? Login
          </Link>
        </form>
      </div>
    </div>
  );
}
