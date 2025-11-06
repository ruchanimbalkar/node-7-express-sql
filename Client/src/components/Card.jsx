//import Styles
import "./Card.css";
//import
import animalEmojis from "../data";
import { MdDelete } from "react-icons/md";
export default function Card({ animal, handleClick }) {
  let fly = animal.can_fly ? "Can Fly!" : "";
  let emoji = animalEmojis[animal.name];
  let showEmoji = animalEmojis[animal.name] ? emoji : "";
  return (
    <>
      <div className="animal-card">
        <h2>
          {" "}
          {animal.name} {showEmoji}{" "}
        </h2>
        <h3> Species : {animal.category} </h3>
        <h4> Habitat : {animal.lives_in} </h4>
        <h5> {fly} </h5>
        <button onClick={handleClick}>
          {" "}
          <MdDelete /> Delete Animal
        </button>
      </div>
    </>
  );
}
