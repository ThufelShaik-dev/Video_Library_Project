import { useFormik, handleSubmit, handleChange } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export function AdminLogin() {
  const [cookies, setCookie, removeCookie] = useCookies(["AdminId"]);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (admin) => {
      axios.get("http://127.0.0.1:2222/admin").then((response) => {
        var user = response.data.find((item) => admin.UserId === item.UserId);
        if (user) {
          if (admin.Password === user.Password) {
            setCookie("AdminId", admin.UserId);
            alert("Login Success");
            navigate("/admin-dash");
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
    <div className="containter-fluid">
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form className="bg-dark p-3 text-white" onSubmit={formik.handleSubmit}>
          <label htmlFor="UserId" className="form-label fw-bold">
            UserId
          </label>
          <div>
            <input
              onChange={formik.handleChange}
              type="text"
              id="UserId"
              name="UserId"
              className="form-control"
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
              className="form-control"
              onChange={formik.handleChange}
            />
          </div>

          <button
            className="btn mt-3 btn-success text-center w-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
