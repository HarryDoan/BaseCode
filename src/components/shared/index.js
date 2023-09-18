import {isNumber} from 'lodash';

export const handleSquare = number => {
  return {
    width: number,
    height: number,
  };
};

export const handleRound = number => {
  return {
    width: number,
    height: number,
    borderRadius: number / 2,
  };
};

export const handleFlex = flex => {
  return {
    flex: isNumber(flex) ? flex : 1,
  };
};

export const handleFlexShrink = flexShrink => {
  return {
    flexShrink: isNumber(flexShrink) ? flexShrink : 1,
  };
};

export const handleFlexGrow = flexGrow => {
  return {
    flexGrow: isNumber(flexGrow) ? flexGrow : 1,
  };
};
