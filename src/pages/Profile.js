import React, {useState} from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import ProfileInfo from "../components/Profile";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  console.log("My User", user);
  if (!user) {
    return <Loader />;
  }

  //const localUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        //localStorage.removeItem("user");
        toast.success("User Logged Out!");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedin} />
      <ProfileInfo user={user} />
      <div className="logout-btn">
      <button 
      style={{ margin: "0 3rem", padding: "1rem 3rem", backgroundColor: "transparent", color: "white", border: "1px solid white", borderRadius: "5px", fontSize: "1rem" }}
      onClick={handleLogout} >Logout</button>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Profile;
