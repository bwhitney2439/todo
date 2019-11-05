import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./ToggleAllButton.css";
const ToggleAllButton = ({ check, toggleAllComplete, count }) => {
  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked(check);
  }, [check]);

  console.log(checked);

  return (
    <React.Fragment>
      {!count ? (
        <FaChevronDown className="hide-toggleAll" size="30px" />
      ) : checked ? (
        <FaChevronDown
          onClick={() => toggleAllComplete(!checked)}
          className="dim-toggleAll"
          size="30px"
        />
      ) : (
        <FaChevronDown
          onClick={() => toggleAllComplete(!checked)}
          className="display-toggleAll"
          size="30px"
        />
      )}
    </React.Fragment>
  );
};

export default ToggleAllButton;
