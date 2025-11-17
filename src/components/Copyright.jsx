const Copyright = ({ name }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-45deg)",
          opacity: 0.05,
          fontSize: "4vw",
          fontWeight: "bold",
          color: "#000",
          userSelect: "none",
        }}
      >
        {Array?.from({ length: 50 }).map((_, idx) => (
          <span key={idx} style={{ margin: "5vw" }}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Copyright;
