import React from "react";

function TechItem({ tech, onDelete }) {
  return (
    <li key={tech}>
      {tech}{" "}
      <button onClick={onDelete} type="button">
        Remover
      </button>
    </li>
  );
}

TechItem.defaultProps = {
  tech: "Oculto"
};

export default TechItem;
