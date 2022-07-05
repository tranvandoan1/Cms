import React, { Component } from "react";
import InputComponent from "../input/InputComponent";
import images from "../../../../res/images";
import ButtonComponent from "../button/ButtonComponent";

interface IState {
}
interface IProps {
  backToHome?:any
}

class HeaderComponent extends Component<IProps, IState> {
  state: IState = {
  };

  render() {
    const {backToHome} = this.props;
    return (
      <>
       <p>sssssssss</p>
      </>
    );
  }
}

export default HeaderComponent;
