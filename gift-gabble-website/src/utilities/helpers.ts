export function encodeObject(obj: { [key: string]: any }): string {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const timeoutPromise = (waitInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
};

export function randomIntFromInterval(
  min: number,
  max: number,
  inclusiveMax = false
) {
  if (!inclusiveMax) max = max - 1;
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export function convertCamelCaseObjToSnakeCase(inObj: { [k: string]: any }) {
  const keys = Object.keys(inObj);
  const toReturn: { [k: string]: any } = {};

  keys.forEach((k) => {
    const val = inObj[k];
    const newK = camelToSnakeCase(k);
    toReturn[newK] = val;
  });

  return toReturn;
}

export const randomFiveDigit = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};
