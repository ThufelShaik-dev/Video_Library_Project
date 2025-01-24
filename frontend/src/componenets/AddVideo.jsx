import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export function AddVideo() {
  const [videoIdLength, setVideoIdLenght] = useState(0);
  let [cookies, setCookie, removeCookie] = useCookies(["AdminId"]);
  let navigate = useNavigate();
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },

    onSubmit: (vidoeDetails) => {
      for (const key in vidoeDetails) {
        let value = vidoeDetails[key];

        if (value < 0 || value == "") {
          alert(
            "Fill the form correctly [no negative values and no empty field]"
          );
          return;
        }
      }
      axios.post("http://127.0.0.1:2222/add-video", vidoeDetails).then(() => {
        alert("Added a New Video");
        navigate("/admin-dash");
      });
    },
  });

  function VideoIdLength() {
    axios.get("http://127.0.0.1:2222/videos").then((response) => {
      let length = response.data.length;
      setVideoIdLenght(length);
      formik.setFieldValue("VideoId", length + 1);
    });
  }
  function LoadCategories() {
    axios.get("http://127.0.0.1:2222/categories").then((response) => {
      response.data.unshift({ CategoryId: 0, CategoryName: "select Category" });
      setCategories(response.data);
    });
  }
  useEffect(() => {
    if (cookies["AdminId"]) {
      LoadCategories();
      VideoIdLength();
    } else {
      alert("Please Login");
      navigate("/admin");
    }
  }, []);

  return (
    <div className="container-fluid">
      <h3 className="bg-warning text-center p-2 m-2">Add New Video</h3>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <form
          className="bg-dark text-white p-4 mt-5 "
          onSubmit={formik.handleSubmit}
        >
          <dl>
            <dt>VideoId</dt>
            <dd>
              <input
                className="form-control"
                type="number"
                name="VideoId"
                value={formik.values.VideoId}
                disabled
                // readOnly When you bind formik.handleChange to an input, it listens for user edits and updates the value in the Formik state. By removing onChange for VideoId, you prevent this unintended behavior or u can use disabled or readOnly.
              />
            </dd>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                className="form-control"
                name="Title"
                onChange={formik.handleChange}
              />
            </dd>
            <dt> Video Url</dt>
            <dd>
              <input
                type="text"
                className="form-control"
                name="Url"
                onChange={formik.handleChange}
              />
            </dd>
            <dt>Likes</dt>
            <dd>
              <input
                className="form-control"
                type="number"
                name="Likes"
                onChange={formik.handleChange}
              />
            </dd>
            <dt>Dislikes</dt>
            <dd>
              <input
                className="form-control"
                type="number"
                name="Dislikes"
                onChange={formik.handleChange}
              />
            </dd>
            <dt>Views</dt>
            <dd>
              <input
                className="form-control"
                type="number"
                name="Views"
                onChange={formik.handleChange}
              />
            </dd>
            <dt>Category</dt>
            <dd>
              <select
                className="form-select"
                name="CategoryId"
                id="CategoryId"
                onChange={formik.handleChange}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.CategoryId}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </dd>
          </dl>
          <button type="submit" className="mx-4 btn btn-success">
            Add
          </button>
          <Link to="/admin-dash" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
