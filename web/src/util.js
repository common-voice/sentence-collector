export const arrayCompare = (a1, a2) => (
  a1.length == a2.length && a1.every((v,i) => (v === a2[i]))
);
