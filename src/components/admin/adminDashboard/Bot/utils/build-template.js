export const  buildTemplate = (event, context) => {
    console.log("state", context.state);
    context.setState({
      [context.state.selected + "" + event.target.name]: event.target.value,
      borderColor:
        event.target.name === "BorderColor"
          ? event.target.value
          : context.state.borderColor,
      borderRadius:
        event.target.name === "BorderRadius"
          ? event.target.value
          : context.state.borderRadius,
      border:
        event.target.name === "Border" ? event.target.value : context.state.border,
      fillColor:
        event.target.name === "FillColor"
          ? event.target.value
          : context.state.fillColor,
      textColor:
        event.target.name === "TextColor"
          ? event.target.value
          : context.state.textColor,
      fontSize:
        event.target.name === "FontSize"
          ? event.target.value
          : context.state.fontSize
    });
  };