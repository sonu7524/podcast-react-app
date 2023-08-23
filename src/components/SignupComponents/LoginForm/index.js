import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";


function LoginForm({setIsLoggedin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //const [isLoggedin, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Handling Login");
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            displayImageUrl: userData.displayImageUrl,
          })
        );
        toast.success("Login Successful!");
        setLoading(false);
        //setIsLoggedIn(true);
        navigate("/profile");
        // Navigate to the profile page
      } catch (error) {
        console.error("Error signing in:", error);
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Make sure email and password are not empty");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Handling Google Login");
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("userData", user);
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        console.log("userData", userData);
       

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            displayImageUrl: user.photoURL,
          })
        );

        
        toast.success("Login Successful!");
        setLoading(false);
        //setIsLoggedIn(true);
        navigate("/profile"); 
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />

      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <Button
        text={loading ? "Loading..." : "Login with Google"}
        isGoogleEnabled={true}
        onClick={handleGoogleLogin}
        disabled={loading}
      />
      {/* <Footer /> */}
    </>
  );
}

export default LoginForm;
