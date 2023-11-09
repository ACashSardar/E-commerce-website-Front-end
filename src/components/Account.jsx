import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { updateUser } from "../services/EcommerceServices";
import { BASE_URL } from "../services/ServerBaseURL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = ({ currentUser, loadCurrentUser }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    if (currentUser !== null) {
      setName(currentUser.name);
      setAddress(currentUser.address);
      setPhoneNo(currentUser.phoneNo);
      setProfilePic(new File([""], "default_profile_pic.jpg"));
    }
  }, [currentUser]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleEditAccount = (name, address, phoneNo) => {
    const data = {
      email: currentUser.email,
      password: currentUser.password,
      role: currentUser.role,
      name: name,
      address: address,
      phoneNo: phoneNo,
    };
    const formData = new FormData();
    console.log(profilePic);
    formData.append("file", profilePic);
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("document", blob);
    updateUser(formData, currentUser.userId, userInfo).then((res) => {
      loadCurrentUser();
      document.getElementById("profile-pic").src =
        BASE_URL + "/api/v1/users/image/" + currentUser.profilePic;
      toast("User account updated");
      setEditing(false);
    });
  };

  const loadImage = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        document.getElementById("profile-pic").src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-canvas p-5">
      <ToastContainer />
      <div className="p-1 bg-light mx-auto rounded" style={{ width: "20rem" }}>
        <div className=" d-flex justify-content-center">
          <div className="bg-light px-5">
            <img
              id="profile-pic"
              src={BASE_URL + "/api/v1/users/image/" + currentUser.profilePic}
              alt=""
              style={{ height: "14rem", width: "14rem" }}
            />
          </div>
        </div>
        <div className=" d-flex justify-content-center">
          {editing === false ? (
            <div className="p-4 rounded bg-light" style={{ width: "20rem" }}>
              {currentUser !== null && currentUser.email !== "" ? (
                <div>
                  <p className="fs-6">Name: {currentUser.name}</p>
                  <p className="fs-6">Email: {currentUser.email}</p>
                  <p className="fs-6">Phone: {currentUser.phoneNo}</p>
                  <p className="fs-6">Address: {currentUser.address}</p>
                  <p className="fs-6">Role: {currentUser.role}</p>
                </div>
              ) : (
                <div
                  className="container-fluid text-center"
                  style={{ width: "100%" }}
                >
                  <p className="fs-6">I don't have an account yet.</p>
                  <a href="/signup" className="btn btn-primary rounded-0">
                    Register now
                  </a>
                </div>
              )}
              {currentUser.userId !== "" ? (
                <button
                  className="custom-btn3"
                  onClick={() => setEditing(true)}
                  style={{ width: "100%" }}
                >
                  Edit Account
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div
              className="p-4 pt-2 rounded bg-light"
              style={{ width: "20rem" }}
            >
              <input
                type="file"
                accept="image/*"
                className="form-control rounded-1 my-1"
                style={{ width: "100%" }}
                onChange={(e) => loadImage(e)}
                required
              />
              <p className="fs-6">
                Name:{" "}
                <input
                  type="text"
                  className="form-control-sm fw-light border-dark border-0 border-bottom rounded-0"
                  style={{ outline: "none" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p className="fs-6">Email: {currentUser.email}</p>
              <p className="fs-6">
                Phone:{" "}
                <input
                  type="text"
                  className="form-control-sm fw-light border-dark border-0 border-bottom rounded-0"
                  style={{ outline: "none" }}
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </p>
              <p className="fs-6">
                Address:{" "}
                <input
                  type="text"
                  className="form-control-sm fw-light border-dark border-0 border-bottom rounded-0"
                  style={{ outline: "none" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </p>
              <p className="fs-6">Role: {currentUser.role}</p>
              {currentUser.userId !== "" ? (
                <button
                  className="custom-btn3"
                  onClick={() => handleEditAccount(name, address, phoneNo)}
                  style={{ width: "100%" }}
                >
                  Update Account
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
