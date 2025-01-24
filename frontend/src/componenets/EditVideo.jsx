import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export function EditVideo() {
  let navigate = useNavigate();
  let [cookies, setCookie, removeCookie] = useCookies(["AdminId"]);
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const [videos, setVideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },
  ]);
  let params = useParams();
  console.log(params);
  function LoadCategory() {
    axios.get("http://127.0.0.1:2222/categories").then((response) => {
      setCategories(response.data);
    });
  }

  function GetVideo() {
    axios.get(`http://127.0.0.1:2222/video/${params.id}`).then((response) => {
      setVideos(response.data);
    });
  }
  useEffect(() => {
    if (cookies["AdminId"]) {
      GetVideo();
      LoadCategory();
    } else {
      alert("please Login Admin");
      navigate("/admin");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      VideoId: videos[0].VideoId,
      Title: videos[0].Title,
      Url: videos[0].Url,
      Likes: videos[0].Likes,
      Dislikes: videos[0].Dislikes,
      Views: videos[0].Views,
      CategoryId: videos[0].CategoryId,
    },

    onSubmit: (videoDetails) => {
      axios
        .put(
          `http://127.0.0.1:2222/edit-video/${videoDetails.VideoId}`,
          videoDetails
        )
        .then(() => {
          alert(`Video Edited Successfully !`);
          navigate("/admin-dash");
        });
    },
    enableReinitialize: true,
  });

  return (
    <div className="container-fluid">
      <h2>Edit Video</h2>
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
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Title</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              name="Title"
              onChange={formik.handleChange}
              value={formik.values.Title}
            />
          </dd>
          <dt> Video Url</dt>
          <dd>
            <input
              type="text"
              className="form-control"
              name="Url"
              onChange={formik.handleChange}
              value={formik.values.Url}
            />
          </dd>
          <dt>Likes</dt>
          <dd>
            <input
              className="form-control"
              type="number"
              name="Likes"
              onChange={formik.handleChange}
              value={formik.values.Likes}
            />
          </dd>
          <dt>Dislikes</dt>
          <dd>
            <input
              className="form-control"
              type="number"
              name="Dislikes"
              onChange={formik.handleChange}
              value={formik.values.Dislikes}
            />
          </dd>
          <dt>Views</dt>
          <dd>
            <input
              className="form-control"
              type="number"
              name="Views"
              onChange={formik.handleChange}
              value={formik.values.Views}
            />
          </dd>
          <dt>Category</dt>
          <dd>
            <select
              className="form-select"
              name="CategoryId"
              id="CategoryId"
              onChange={formik.handleChange}
              value={formik.values.CategoryId}
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
  );
}
