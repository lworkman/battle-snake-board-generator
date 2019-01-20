import React from "react";

export const generateColour: () => string = () => {
  var max = 0xffffff;
  return '#' + Math.round(Math.random() * max).toString(16);
}

export const onChangeNumberLimitFactory = (target: (...arg: any) => void, max: number = 1000, min: number = 0) => {
  return (event: React.ChangeEvent<HTMLInputElement>, ) => {
    let value = event.target.value;

    if (/[\D]/.test(value)) {
      return;
    }
    if (parseInt(value, 10) > max) {
      value = max.toString();
    }
    if (parseInt(value, 10) < min) {
      value = min.toString();
    }
    target(value);
  }
}

export const onBlurSetMinimumFactory = (target: (...arg: any) => void, min: number = 0) => {
  return (event: React.FocusEvent<HTMLInputElement>, ) => {
    let value = event.target.value;

    if (/[\D]/.test(value)) {
      return;
    }
    if (parseInt(value, 10) < min || !value) {
      value = min.toString();
    }
    target(value);
  }
}

export const generateId = () => Math.floor((Math.random() * 1000000)).toString()