import { LuGripVertical } from "react-icons/lu";
import "./Matching.css";
import { useState } from "react";
import { Reorder } from "framer-motion";
import Matching from "../../class/Matching";

export default function MatchingQuestion({ page }: { page: Matching }) {
  const termsObject = page.terms;
  const definitionsObject = page.definitions;

  const terms = Object.keys(termsObject);
  const definitions = Object.keys(definitionsObject);

  const [reorderable, setReorderable] = useState(definitions);

  return (
    <div className="padded-container-3">
      <div className="header-matching">Match the terms with its definition</div>
      <div className="matching-container">
        <div className="terms-container">
          {terms.map((term) => (
            <div className="term-container">
              {term}
              <span className="connect-start"></span>
            </div>
          ))}
        </div>
        <Reorder.Group
          className="definitions-container"
          axis="y"
          values={reorderable}
          onReorder={setReorderable}
        >
          {reorderable.map((definition) => (
            <Reorder.Item
              value={definition}
              key={definition}
              className="definition-container"
            >
              {definition}
              <span className="connect-end"></span>
              <span className="draggable-icon">
                <LuGripVertical size={22} />
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
