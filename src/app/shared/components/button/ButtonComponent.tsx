import React from "react";
import { Button, ButtonProps } from "antd";
import "./ButtonComponent.css";

interface IBaseState {}

interface IBaseProps extends ButtonProps {
  title?: string;
  titleStyle?:any
  btnStyle?:any
}

export default class ButtonComponent extends React.Component<
  IBaseProps,
  IBaseState
> {
  render() {
    return (
      <Button
        className="button_component"
        type="text"
        size="middle"
        block={true}
        style={this.props.btnStyle}
        {...this.props}
      >
        <span className="titleBtn" style={{margin: "0px", fontWeight: "500", ...this.props.titleStyle}}>{this.props.title}</span>
      </Button>
    );
  }
}
