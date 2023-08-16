// @ts-ignore
import { fetchAllMaletas } from "../../lib/firestore/maleta-service.js";
import ExampleComponent from "../example-component/ExampleComponent";
import React from "react";

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <ExampleComponent />
    </div>
  );
};

export default Dashboard;
