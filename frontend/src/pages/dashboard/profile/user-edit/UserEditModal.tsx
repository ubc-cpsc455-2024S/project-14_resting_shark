import { useState, useEffect } from "react";
import s from "./UserEditModal.module.css";
import { LuXCircle } from "react-icons/lu";
import { userApi } from "../../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import * as React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { requests } from "../../../../api/requestTemplate";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { username: string; email: string; profilePicture: string };
  setBase: React.Dispatch<React.SetStateAction<string>>;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  setHat: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  base: string;
  hat: string;
  item: string;
  backgroundColor: string;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  user,
  setBase,
  setItem,
  setHat,
  setBackgroundColor,
  base,
  hat,
  item,
  backgroundColor,
}) => {
  const bases = ["./images/goose.png", "./images/canada.png"];
  const hats = ["", "./images/mango.png", "./images/top-hat.png"];
  const items = ["", "./images/bowtie.png", "./images/shark.png"];

  const [activeTab, setActiveTab] = useState("userInfo");
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    profilePicture: user.profilePicture,
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [baseIndex, setBaseIndex] = useState(bases.indexOf(base));
  const [hatIndex, setHatIndex] = useState(hats.indexOf(hat));
  const [itemIndex, setItemIndex] = useState(items.indexOf(item));

  const token = useAppSelector((state) => state.auth.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        profilePicture: user.profilePicture,
      });
      setUsernameErrorMessage(null);
      setEmailErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUnsavedChanges(true);
    if (e.target.name === "username") {
      setUsernameErrorMessage(null);
    } else if (e.target.name === "email") {
      setEmailErrorMessage(null);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData: Partial<{
        username: string;
        email: string;
        password: string;
      }> = {};
      if (formData.username) updatedData.username = formData.username;
      if (formData.email) updatedData.email = formData.email;
      if (formData.password) updatedData.password = formData.password;

      await userApi.updateUserPersonalInfo(token, updatedData);

      setUnsavedChanges(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1800);

      await requests.patchRequest(token, `/user/profile`, {
        profile: {
          bgColor: backgroundColor,
          baseImage: base,
          accessory: hat,
          heldItem: item,
        },
      });
    } catch (error: any) {
      console.error("Failed to update user:", error);
      if (error.message.includes("Username")) {
        setUsernameErrorMessage(
          "Did not update profile information: " + error.message.split(":")[0]
        );
      } else if (error.message.includes("Email")) {
        setEmailErrorMessage(
          "Did not update profile information: " + error.message.split(":")[0]
        );
      }
      setSuccessMessage(null);
    }
  };

  function deleteAccount() {
    userApi.deleteUser(token);
    navigate("/");
  }

  const handleClose = () => {
    if (unsavedChanges) {
      if (
        window.confirm("You have unsaved changes. Do you really want to close?")
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const changeBase = (isLeft: boolean) => {
    let direction = 1;
    if (isLeft) {
      direction = -1;
    }
    setBaseIndex((baseIndex + direction + bases.length) % bases.length);
    setBase(bases[baseIndex]);
  };

  const changeHat = (isLeft: boolean) => {
    let direction = 1;
    if (isLeft) {
      direction = -1;
    }
    setHatIndex((hatIndex + direction + hats.length) % hats.length);
    setHat(hats[hatIndex]);
    console.log(hatIndex);
  };

  const changeItem = (isLeft: boolean) => {
    let direction = 1;
    if (isLeft) {
      direction = -1;
    }
    setItemIndex((itemIndex + direction + items.length) % items.length);
    setItem(items[itemIndex]);
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.header}>
          <h2>Edit Profile</h2>
          <button className={s.closeButton} onClick={handleClose}>
            <LuXCircle />
          </button>
        </div>
        <div className={s.tabs}>
          <div
            className={`${s.tab} ${
              activeTab === "userInfo" ? s.activeTab : ""
            }`}
            onClick={() => setActiveTab("userInfo")}
          >
            User Info
          </div>
          <div
            className={`${s.tab} ${
              activeTab === "profilePicture" ? s.activeTab : ""
            }`}
            onClick={() => setActiveTab("profilePicture")}
          >
            Profile Picture
          </div>
        </div>
        {activeTab === "userInfo" && (
          <div>
            <div className={s.inputContainer}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={s.inputField}
              />
              {usernameErrorMessage && (
                <p className={s.errorMessage}>{usernameErrorMessage}</p>
              )}

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={s.inputField}
              />
              {emailErrorMessage && (
                <p className={s.errorMessage}>{emailErrorMessage}</p>
              )}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={s.inputField}
              />
            </div>
            {successMessage && (
              <p className={s.successMessage}>{successMessage}</p>
            )}

            <div className={s.btnGroup}>
              <button className={s.button} onClick={handleSave}>
                Save
              </button>
              <button className={s.button} onClick={deleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        )}
        {activeTab === "profilePicture" && (
          <div>
            <div className={s.pictureContainer}>
              <div className={s.leftButtons}>
                <button onClick={() => changeHat(true)}>
                  <FaArrowLeft />
                </button>
                <button onClick={() => changeBase(true)}>
                  <FaArrowLeft />
                </button>
                <button onClick={() => changeItem(true)}>
                  <FaArrowLeft />
                </button>
              </div>
              <div
                className={s.pfp}
                style={{ backgroundColor: backgroundColor }}
              >
                <img className={s.img} src={base} alt="goose" />
                {hat !== "" && <img className={s.hat} src={hat} alt="hat" />}
                {item !== "" && (
                  <img className={s.item} src={item} alt="item" />
                )}
              </div>
              <div className={s.rightButtons}>
                <button onClick={() => changeHat(false)}>
                  <FaArrowRight />
                </button>
                <button onClick={() => changeBase(false)}>
                  <FaArrowRight />
                </button>
                <button onClick={() => changeItem(false)}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
            <div className={s.colorContainer}>
              <button
                className={s.colorButton}
                style={
                  backgroundColor === "#F97E99"
                    ? { backgroundColor: "#F97E99", border: "2px solid black" }
                    : { backgroundColor: "#F97E99" }
                }
                onClick={() => setBackgroundColor("#F97E99")}
              ></button>
              <button
                className={s.colorButton}
                style={
                  backgroundColor === "#ffc3a3"
                    ? { backgroundColor: "#ffc3a3", border: "2px solid black" }
                    : { backgroundColor: "#ffc3a3" }
                }
                onClick={() => setBackgroundColor("#ffc3a3")}
              ></button>
              <button
                className={s.colorButton}
                style={
                  backgroundColor === "#7BCE97"
                    ? { backgroundColor: "#7BCE97", border: "2px solid black" }
                    : { backgroundColor: "#7BCE97" }
                }
                onClick={() => setBackgroundColor("#7BCE97")}
              ></button>
              <button
                className={s.colorButton}
                style={
                  backgroundColor === "#96CDEC"
                    ? { backgroundColor: "#96CDEC", border: "2px solid black" }
                    : { backgroundColor: "#96CDEC" }
                }
                onClick={() => setBackgroundColor("#96CDEC")}
              ></button>
              <button
                className={s.colorButton}
                style={
                  backgroundColor === "#969FEC"
                    ? { backgroundColor: "#969FEC", border: "2px solid black" }
                    : { backgroundColor: "#969FEC" }
                }
                onClick={() => setBackgroundColor("#969FEC")}
              ></button>
            </div>
            <button className={s.button} onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEditModal;
