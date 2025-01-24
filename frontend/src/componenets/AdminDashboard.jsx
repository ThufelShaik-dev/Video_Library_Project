import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export function AdminDashboard() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["AdminId"]);
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
  function handleClick() {
    removeCookie("AdminId");
    navigate("/admin");
  }

  function GetVideo() {
    axios.get("http://127.0.0.1:2222/videos").then((response) => {
      setVideos(response.data);
    });
  }
  useEffect(() => {
    if (cookies["AdminId"]) {
      GetVideo();
    } else {
      alert("Please Login Admin");
      navigate("/admin");
    }
  }, []);

  return (
    <div className="container-fluid">
      <Link
        to="/add-video"
        className=" p-3 fw-bold btn btn-info my-3 text-decoration-none text-black"
      >
        Add New Video
      </Link>
      <button
        onClick={handleClick}
        className="text-white p-3 mx-4 rounded-2 btn btn-danger"
      >
        Signout
      </button>
      <h3>Admin Dashboard</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Video Title</th>
            <th>Video Preview</th>
            <th>Video Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index}>
              <td>{video.Title}</td>
              <td>
                <iframe src={video.Url} height={100} width={200}></iframe>
              </td>
              <td>
                <Link to={`/edit-video/${video.VideoId}`}>
                  <span className="btn btn-warning bi bi-pen me-4"></span>
                </Link>
                <Link to={`/delete-video/${video.VideoId}`}>
                  <span className="btn btn-danger bi bi-trash2"></span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
