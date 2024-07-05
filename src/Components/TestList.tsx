import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState, useCallback, useEffect } from "react";

function TestList() {
  const [items, setItems] = useState([0, 1, 2]);
  const [parent] = useAutoAnimate();
  const add = useCallback(() => setItems((prevItems) => [...prevItems, prevItems.length]), [items]);

  return (
    <>
      <ul
        style={{ all: "unset", display: "flex", flexDirection: "column", position: "static", listStyle: "none", transition: "all ease 0.3s" }}
        ref={parent}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={add}>Add number</button>
      <button onClick={add}>Disable</button>
    </>
  );
}

export default TestList;
