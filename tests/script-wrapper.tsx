import * as React from "react";
export const SingleChild = () => {
  return (
    <div id="wrapper">
      <div className="utterances"></div>
    </div>
  );
};

export const MultiChildren = () => {
  return (
    <div id="wrapper">
      <div className="utterances"></div>
      <div className="utterances"></div>
      <div className="utterances"></div>
      <div className="utterances"></div>
      <div className="utterances"></div>
    </div>
  );
};

export const NoChildren = () => {
  return <div id="wrapper"></div>;
};
