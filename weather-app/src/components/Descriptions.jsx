import React from "react";
import "./descriptions.css";

import { LuWind } from "react-icons/lu";
import { FaAnglesDown,FaAnglesUp } from "react-icons/fa6";
import { IoHappyOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";


const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaAnglesDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaAnglesUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <IoHappyOutline />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 5,
      icon: <WiHumidity />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <LuWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="section section__descriptions">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <middle>{title}</middle>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
