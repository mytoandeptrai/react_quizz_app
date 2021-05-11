const ErrorMessage = ({ children }) => {
  const style = {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: "orangered",
    textAlign: "center",
    color: "white",
    textTransform: "capitalize",
  };
  return <div style={style}>{children}</div>;
};

export default ErrorMessage;
