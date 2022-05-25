import Grid from "@material-ui/core/Grid";
import * as $ from "jquery";

import React, { Component } from "react";

class TextSignature extends Component {
  constructor(props) {
    super(props);

    this.myStyle = {
      fontFamily: "Kalam",
      width: "100%",
      minHeight: "100px",
      height: "max-content",
      background: "#e1e1e3",
      padding: "10px",
    };

    this.state = {
      fontSize: 50,
    };
  }

  componentDidUpdate() {
    let backgroundWidth = $("#TextSignContainer").width();
    let textWidth = $("#signInnerText").width();
    let index = 0;

    while (textWidth > backgroundWidth && index < 10) {
      this.setState({ fontSize: this.state.fontSize - 1 }, () => {
        $("#signInnerText").css("font-size", this.state.fontSize - 1);
      });
      index += 1;
      textWidth = $("#signInnerText").width();
    }
  }

  render() {
    return (
      <Grid sm={12} md={12} style={{ width: "100%", height: "100%" }}>
        <div id="TextSignContainer" style={this.myStyle}>
          <div
            id="signTextContent"
            style={{
              width: "100%",
              fontSize: this.state.fontSize,
              whiteSpace: "nowrap",
            }}
          >
            <span id="signInnerText">{this.props.text}</span>
          </div>
        </div>
      </Grid>
    );
  }
}

export default TextSignature;
