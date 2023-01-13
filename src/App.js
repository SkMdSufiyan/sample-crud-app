import './App.css';
import {BrowserRouter, Routes, Route, useNavigate, useParams} from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Users from "./Users.js";
import ActionUsers from "./ActionUsers.js";
import Profile from "./Profile.js";
import EditProfile from "./EditProfile.js";


function App() {
  return (
    <div className="App">
      <h6>Day-23 CRUD task</h6>
      <BrowserRouter>
      <Routes>

        {/* Routing to dashboard page */}
        <Route path="/" element={<Dashboard />} />

        {/* Routing to users-list page */}
        <Route path="/users" element={<Users />} />

        {/* Routing to create-user page */}
        <Route path="/create-user" element={<ActionUsers />} />

        {/* Routing to edit-user page */}
        <Route path="/edit-user/:id" element={<ActionUsers />} />

        {/* Routing to profile page */}
        <Route path="/profile/:id" element={<Profile />} />

        {/* Routing to edit-profile page */}
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
