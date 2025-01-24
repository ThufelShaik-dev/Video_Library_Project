import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export function DeleteVideo() {
  let navigate = useNavigate();
  let [cookies, setCookie, removeCookie] = useCookies(["AdminId"]);
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
  function GetVideo() {
    axios.get(`http://127.0.0.1:2222/video/${params.id}`).then((response) => {
      setVideos(response.data);
    });
  }

  function VideoToDelete() {
    /* eslint-disable no-restricted-globals */
    let verify = confirm("Are you sure you want to delete?");
    // /* eslint-enable no-restricted-globals */The error Unexpected use of 'confirm' no-restricted-globals is caused by an ESLint rule that discourages the use of confirm, alert, and prompt as they are considered outdated and can negatively affect user experience. To fix this, you can either disable the rule for this specific line or use a modern, custom confirmation dialog.
    if (verify) {
      axios
        .delete(`http://127.0.0.1:2222/delete-video/${params.id}`)
        .then(() => {
          alert("Video Deleted Successfully!");
          navigate("/admin-dash");
        });
    } else {
      alert("You Cancelled");
    }
  }
  useEffect(() => {
    if (cookies["AdminId"]) {
      GetVideo();
    } else {
      alert("Please Login");
      navigate("/admin");
    }
  });

  return (
    <div className="container-fluid">
      <h3>Delete Video</h3>
      <div className="card m-2 p-2 w-50 ">
        <div className="card-header">
          <h4>{videos[0].Title}</h4>
        </div>
        <div className="card-body">
          <iframe src={videos[0].Url} height="300" width="100%"></iframe>
        </div>
        <div className="card-footer">
          <button onClick={VideoToDelete} className="btn btn-danger">
            Delete
          </button>
          <Link to="/admin-dash" className="btn btn-warning">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
