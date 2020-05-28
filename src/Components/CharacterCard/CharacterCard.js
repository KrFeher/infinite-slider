import React from "react";
import './CharacterCard.css';


const CharacterCard = ({image, species, gender, name}) => {
  return (
    <div className="card flex-item">
      <img src={image} alt="Avatar" style={{ width: "100%" }}></img>
      <div className="container">
        <h3>{name}</h3>
        <p>{`Species: ${species}`}</p>
        <p>{`Gender: ${gender}`}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
