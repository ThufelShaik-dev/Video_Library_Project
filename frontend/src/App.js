import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { VideoLibraryIndex } from "./componenets/VideoLibraryHome";
import { AdminLogin } from "./componenets/AdminLogin";
import { AdminDashboard } from "./componenets/AdminDashboard";
import { AddVideo } from "./componenets/AddVideo";
import { EditVideo } from "./componenets/EditVideo";
import { DeleteVideo } from "./componenets/DeleteVideo";
import { UserLogin } from "./componenets/UserLogin";
import { UserRegister } from "./componenets/UserRegister";
import { UserDashboard } from "./componenets/UserDashboard";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoLibraryIndex />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/add-video" element={<AddVideo />} />
          <Route path="/edit-video/:id" element={<EditVideo />} />
          <Route path="/delete-video/:id" element={<DeleteVideo />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/user-dash" element={<UserDashboard />} />
          <Route
            path="*"
            element={
              <h2 className="text-danger">Your Request Not Found Go Back!</h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
