export const timingFunctionExpand = (t) => {
  return --t * t * t * t * t + 1;
};

export const timingFunctionCollapse = (t) => {
  if ((t *= 2) < 1) {
    return 0.5 * t * t * t * t * t;
  }

  return 0.5 * ((t -= 2) * t * t * t * t + 2);
};