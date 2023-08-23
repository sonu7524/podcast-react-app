import React from "react";
import "./style.css"

function ProfileInfo({ user }) {
    console.log("My User", user);
    return (
        <div className="profile">
        <img className="profile-img" src={user.displayImageUrl} />
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>User Id: {user.uid}</p>
        </div>
    );

}

export default ProfileInfo;