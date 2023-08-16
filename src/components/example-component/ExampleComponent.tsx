import { useEffect, useState } from "react";
import React from "react";

// @ts-ignore
import { fetchAllMaletas } from "../../lib/firestore/maleta.service.js";

const ExampleComponent = (): JSX.Element => {
  const [maletas, setMaletas] = useState([]);

  useEffect(() => {
    const retrieveMaleta = async () => {
      let result = await fetchAllMaletas();
      setMaletas(result);
    };
    retrieveMaleta();
  }, []);

  return (
    <>
      Maletas:{" "}
      {maletas.map((maleta: any) => (
        <h1 key={maleta.id}>{maleta?.descripcion}</h1>
      ))}
      Ids: {maletas.map((maleta: any) => (maleta.id !== 2 ? maleta.id : "0"))}
    </>
  );
};

export default ExampleComponent;
