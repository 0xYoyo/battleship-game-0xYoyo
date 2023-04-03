const Ship = (len = 3) => {
  len;
  let hitCount = 0;
  let hasSunk = false;
  const hit = () => {
    hitCount++;
  };
  const isSunk = () => {
    if (len == hitCount) {
      hasSunk = true;
    }
    return hasSunk;
  };
  return { len, hit, isSunk };
};

export { Ship };
