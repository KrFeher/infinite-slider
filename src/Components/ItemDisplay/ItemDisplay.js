import React, { useState, useEffect, useRef, useCallback } from "react";
import { getMoreData } from "../../Utils/graphqlClient";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./ItemDisplay.css";

const ItemDisplay = (props) => {
  const [characters, setCharacters] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const observer = useRef();

  const lastElementRef = useCallback(
    (item) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // End reached, loading more characters
          getMoreCharacters();
        }
      });
      if (item) observer.current.observe(item);
    },
    [characters]
  );

  const getMoreCharacters = async () => {
    const newCharacters = await getMoreData(currentPageNumber);
    setCurrentPageNumber(currentPageNumber + 1);
    setCharacters([...characters, ...newCharacters]);
  };

  useEffect(() => {
    getMoreCharacters();
  }, []);

  return (
    <div className="flex-container">
      {characters.map((character, index) => {
        const { id, name, species, image, gender } = character;
        if (characters.length === index + 1) {
          // marking the last element
          return (
            <span key={id} ref={lastElementRef}>
              <CharacterCard name={name} species={species} image={image} gender={gender}></CharacterCard>
            </span>
          );
        } else {
          return (
            <span key={id}>
              <CharacterCard name={name} species={species} image={image} gender={gender}></CharacterCard>
            </span>
          );
        }
      })}
    </div>
  );
};

export default ItemDisplay;
