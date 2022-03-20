interface MotionValue {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  margin?: number | string;
}

const motionKeys = ["top", "left", "right", "bottom", "width", "height", "margin"];

const { hasOwnProperty } = Object.prototype

const getStyle = (value: MotionValue) => {

    if (hasOwnProperty.call(value, 'top')) {
        
    }
};
