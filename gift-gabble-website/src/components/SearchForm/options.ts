export const UNKNOWN_VALUE = "???";
export const OTHER_VALUE = "other";
export const whoOptions = [
  UNKNOWN_VALUE,
  "friend",
  "boyfriend",
  "girlfriend",
  "husband",
  "wife",
  "partner",
  "co-worker",
  "family",
];

const familyWhoOptions: (string | string[])[] = [
  UNKNOWN_VALUE,
  "mom",
  "dad",
  "sister",
  "brother",
  "cousin",
  "uncle",
  "aunt",
  "grandfather",
  "grandmother",
];

export const whoTwoMap: {
  [key: string]: {
    formLabelText: string;
    optionsList: (string | string[])[];
  };
} = {
  family: {
    formLabelText: "Who in your family?",
    optionsList: familyWhoOptions,
  },
};
export const whyOptions = [
  UNKNOWN_VALUE,
  ["bday", "their birthday"],
  ["anniversary", "our anniversary"],
  ["wedding", "their wedding"],
  ["holiday_party", "holiday party"],
  ["graduation", "graduation"],
  ["other", "other (add below)"],
  ["na", "no reason"],
];
