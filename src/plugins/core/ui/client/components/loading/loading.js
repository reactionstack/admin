import React from "react";
import { registerComponent } from "../../../../../core/components/lib";
import CircularProgress from "../progress/circularProgress";

const Loading = () => (
  <div className="spinner-container spinner-container-lg">
    <CircularProgress indeterminate={true} />
  </div>
);

registerComponent("Loading", Loading);

export default Loading;
