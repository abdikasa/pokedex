const Spinner = (props) => {
  return (
    <div className={"ui active dimmer"}>
      <div className={"ui large text loader"}>{props.text}</div>
    </div>
  );
};

Spinner.defaultProps = {
  text: "Loading...",
};

export default Spinner;
