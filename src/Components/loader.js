import React from "react";

const loaderStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "999",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  // backgroundColor: '#fff',
};

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: "3",
        top: 0,
        left: 0,
        opacity: "0.8",
        backgroundColor: "#ffffff",
      }}
    >
      <img
        style={loaderStyle}
        src={require("../Assets/Images/Loading_2.gif")}
      />
    </div>
  );
};

export default Loader;
