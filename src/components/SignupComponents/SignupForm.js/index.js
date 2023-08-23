import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db,provider,storage } from "../../../firebase";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const handleSignup = async () => {
    console.log("Handling Signup...");
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
      && displayImage
    ) {
      try {
        // Creating user's account.
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password    
        );

        const user = userCredential.user;

        console.log("user", user);

        const displayImageRef = ref(
          storage,
          `profile/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);

        const userData = {
          name: fullName,
          email: user.email,
          uid: user.uid,
          displayImageUrl: displayImageUrl,
        }
        // Saving user's details.
        await setDoc(doc(db, "users", user.uid), userData);
        //localStorage.setItem("user", JSON.stringify(userData));

        // Save data in the redux, call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            displayImageUrl: displayImageUrl,
          })
        );
        toast.success("User has been created!");
        setLoading(false);
        navigate("/");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error(
          "Please Make Sure your password and Confirm Password matches!"
        );
      } else if (password.length < 6) {
        toast.error(
          "Please Make Sure your password is more than 6 digits long!"
        );
      }
      setLoading(false);
      // throw an error
    }
  };

  const handleGoogleSignup = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        console.log("user", user);

        const googleUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          displayImageUrl: user.photoURL,
        }
        
        // Saving user's details.
        await setDoc(doc(db, "users", user.uid), googleUser);
        //localStorage.setItem("user", JSON.stringify(googleUser));

        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            displayImageUrl: user.photoURL,
          })
        );

        toast.success("User has been created!");
        setLoading(false);
        navigate("/");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    }

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
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
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />

      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />
      
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
      <Button
        text={loading ? "Loading..." : "Signup with Google"}
        isGoogleEnabled={true}
        disabled={loading}
        onClick={handleGoogleSignup}
      />
      
    </>
  );
}

export default SignupForm;
