import { useEffect, useState } from "react";
import s from "./Profile.module.css";
import * as React from "react";
import { requests } from "../../api/requestTemplate";
import { useAppSelector } from "../../redux/hooks";

export default function Profile() {
  const token = useAppSelector((state) => state.auth.jwtToken);

  const [base, setBase] = useState("./images/goose.png");
  const [hat, setHat] = useState("");
  const [item, setItem] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffc3a3");

  const fetchData = async () => {
    const pictureData = await requests.getRequest(token, "/user/profile");

    setBase(pictureData.baseImage);
    setHat(pictureData.accessory);
    setItem(pictureData.heldItem);
    setBackgroundColor(pictureData.bgColor);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.pfp} style={{ backgroundColor: backgroundColor }}>
      <img src={base} alt="goose" />
      {hat !== "" && <img src={hat} alt="hat" />}
      {item !== "" && <img src={item} alt="item" />}
    </div>
  );
}
