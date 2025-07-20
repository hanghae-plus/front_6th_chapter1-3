export const isFalsy = (value: unknown): boolean => {
  return (
    value === null ||
    value === undefined ||
    value === false ||
    value === "" ||
    value === 0 ||
    Number.isNaN(value) ||
    value === "null" ||
    value === "undefined" ||
    value === "false" ||
    value === "0" ||
    value === "NaN"
  );
};
