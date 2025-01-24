import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserLogin() {
  let navigate = useNavigate();
  let [cookies, setCookie, removeCookie] = useCookies("[UserId]");

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },

    onSubmit: (userDetails) => {
      axios.get("http://127.0.0.1:2222/users").then((response) => {
        let userDb = response.data.find(
          (user) => user.UserId === userDetails.UserId
        );
        if (userDb) {
          if (userDetails.Password == userDb.Password) {
            setCookie("UserId", userDetails.UserId);
            alert("Login success");
            navigate("/user-dash");
          } else {
            alert("Invalid Password");
          }
        } else {
          alert("Invalid UserId");
        }
      });
    },
  });

  return (
    <div className="container-fluid">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form
          className="bg-dark p-3 text-white rounded-4"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="UserId" className="form-label fw-bold">
            UserId
          </label>
          <div>
            <input
              type="text"
              className="form-control"
              name="UserId"
              onChange={formik.handleChange}
              id="UserId"
            />
          </div>
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
          <button type="submit" className="btn btn-success my-3 mx-3">
            Login
          </button>
          <Link
            to="/user-register"
            className="text-decoration-none btn btn-primary"
          >
            New User? Register now!
          </Link>
        </form>
      </div>
    </div>
  );
}
