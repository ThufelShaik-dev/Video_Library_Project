import { Link } from "react-router-dom";
export function VideoLibraryIndex() {
  return (
    <div>
      <h3 className="bg-warning mt-3 text-dark fw-bold p-3 text-center">
        "Video Library App"
      </h3>
      <div
        className="d-flex bg-dark justify-content-center align-items-center"
        style={{ height: "83vh" }}
      >
        <div>
          <div className="mb-4">
            <Link
              to="/user-login"
              className=" btn btn-warning w-100 text-decoration-none text-dark "
            >
              User Login
            </Link>
          </div>

          <div>
            <Link
              to="/admin"
              className=" btn btn-warning text-decoration-none text-dark"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
