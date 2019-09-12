const pathRoute = require('path');
export const functionTypePath = (inputPath) => {
  if (pathRoute.isAbsolute(inputPath) === false) {
    return pathRoute.resolve(inputPath);
  }
  return inputPath;
};
