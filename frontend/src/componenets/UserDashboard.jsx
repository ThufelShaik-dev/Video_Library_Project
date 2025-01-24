import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function UserDashboard() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["UserId"]);
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

  function GetVideo() {
    if (cookies["UserId"]) {
      axios.get("http://127.0.0.1:2222/videos").then((response) => {
        setVideos(response.data);
      });
    } else {
      alert("Please Login First");
      navigate("/user-login");
    }
  }
  function handleClick() {
    removeCookie("UserId");
    navigate("/user-login");
  }
  useEffect(() => {
    GetVideo();
  }, []);

  return (
    <div>
      <h3 className="bg-warning d-flex p-3 text-black align-items-center justify-content-between">
        Welcome <span className="bi bi-person-fill"> {cookies["UserId"]}</span>
        <button className="btn btn-danger rounded-2" onClick={handleClick}>
          Signout
        </button>
      </h3>
      <h3>UserDashboard</h3>
      <div className="d-flex flex-wrap" style={{ width: "auto" }}>
        {videos.map((video) => (
          <div className="card m-2 p-2 w-25" key={video.VideoId}>
            <iframe src={video.Url} width="100%" height="200"></iframe>
            <div className="card-header ">
              <h5>{video.Title}</h5>
              <div className="card-footer">
                <button className="btn bi bi-eye-fill">{video.Views}</button>
                <button className="btn bi bi-hand-thumbs-up mx-2">
                  {video.Likes}
                </button>
                <button className="bi btn bi-hand-thumbs-down">
                  {video.Dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
