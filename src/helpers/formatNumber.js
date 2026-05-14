export const formatNum = (item) => {
  const value = parseFloat(item);
  const num = Math.abs(value);
  if (num >= 1000000000) {
    return (value / 1000000000).toFixed(2) + " млрд";
  }
  if (num >= 1000000) {
    return (value / 1000000).toFixed(2) + " млн";
  }
  if (num >= 1000) {
    return (value / 1000).toFixed(2) + " тыс";
  } else {
    return value.toFixed(2);
  }
};

export const changeColor = (item) => {
  const num = parseFloat(item);
  const color = num >= 0 ? "#52c41a" : "#ff4d4f";
  return color;
};
