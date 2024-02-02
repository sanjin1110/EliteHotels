import "./register.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const New = () => {
  
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});

  const inputs = [
    { id: "username", label: "Username", type: "text", placeholder: "Enter your username" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { id: "country", label: "Country", type: "text", placeholder: "Enter your country" },
    { id: "city", label: "City", type: "text", placeholder: "Enter your city" },
    { id: "phone", label: "Phone", type: "text", placeholder: "Enter your phone no." },
    { id: "password", label: "Password", type: "text", placeholder: "Enter your password" },

    // Add more input fields here if needed
  ];

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
 
    return password.length >= 8;
  }
    const validateInputs = () => {
    const errors = {};
    inputs.forEach((input) => {
      const inputValue = info[input.id]?.trim();
      if (!inputValue) {
        errors[input.id] = `${input.label} is required`;
      } else if (input.type === "email" && !validateEmail(inputValue)) {
        errors[input.id] = `Invalid email format for ${input.label}`;
      } else if (input.type === "password" && !validatePassword(inputValue)) {
        errors[input.id] = `Password must be at least 8 characters long for ${input.label}`;
      }
    });

    setErrors(errors);

    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const title = "Sign Up"; // Set your desired title here
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop form submission if validation fails
    }
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/depz2tezt/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  };


console.log(info);
return (
  <div className="new">
    {/* <Sidebar /> */}
    <div className="newContainer">
      {/* <Navbar /> */}
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                />
                {errors[input.id] && (
                  <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
                    {errors[input.id]}
                  </div>                )}
              </div>
            ))}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

};
export default New;
