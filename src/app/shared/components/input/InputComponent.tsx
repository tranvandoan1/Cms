import React from "react";
import { Input, InputProps } from "antd";
import "./InputComponent.css";
import images from "../../../../res/images";

interface IBaseState {
  // value?: string
}

interface IBaseProps extends InputProps {
  isLogin?: boolean;
  placeholder?: string;
  onChange?: any;
  text?: string;
  error?: any;
  iconLeft?:any
}

export default class InputComponent extends React.Component<
  IBaseProps,
  IBaseState
> {
  state: IBaseState = {};

  render() {
    const {text, isLogin, iconLeft } = this.props;
    return (
      <>
        {isLogin ? (
          <>
            <div className="container_input">
              <img src={iconLeft ? iconLeft : images.ic_email} alt="" />
              <Input
                {...this.props}
                //@ts-ignore
                allowClear={true}
                style={this.props.style}
                className="input_component input_login"
                placeholder={this.props.placeholder}
                size="middle"
                value={text ?? ""}
                onChange={(e) => {
                  this.props.onChange(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <Input
            {...this.props}
            //@ts-ignore
            allowClear={true}
            style={this.props.style}
            className="input_component"
            placeholder={this.props.placeholder}
            size="middle"
            value={text ?? ""}
            onChange={(e) => {
              this.props.onChange(e.target.value);
            }}
          />
        )}
      </>
    );
  }
}
