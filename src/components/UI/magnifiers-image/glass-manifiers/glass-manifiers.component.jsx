import React, { Component } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
import "./styles.css";
class GlassImage extends Component {
  state = {
    allowOverflow: true,
    magnifierBorderSize: 5,
    magnifierBorderColor: "rgba(255, 255, 255, .5)",
    magnifierSize: "30%",
    square: false,
  };

  handleSize = (e) => {
    const value = e.target.value + "%";
    this.setState(() => ({ magnifierSize: value }));
  };

  handleBorderSize = (e) => {
    const value = Number(e.target.value);
    this.setState(() => ({ magnifierBorderSize: value }));
  };

  handleBoolChange = (key) => (e) => {
    const value = Boolean(e.target.value);
    this.setState(() => ({ [key]: value }));
  };

  handleTextChange = (key) => (e) => {
    const value = e.target.value;
    this.setState(() => ({ [key]: value }));
  };

  render() {
    const {
      allowOverflow,
      magnifierSize,
      magnifierBorderSize,
      magnifierBorderColor,
      square,
    } = this.state;

    const { image, largeImage} = this.props;   
    return (
      <div className="flex">
        <GlassMagnifier
          className="input-position"
          imageSrc={image}
          largeImageSrc={largeImage}
          allowOverflow={allowOverflow}
          magnifierSize={magnifierSize}
          magnifierBorderSize={magnifierBorderSize}
          magnifierBorderColor={magnifierBorderColor}
          square={square}            
        />
      </div>
    );
  }
}

export default GlassImage;
