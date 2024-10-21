export const numWord = (value, words) => {
  const num = value % 10;

  const val = value % 100;
  if (val > 10 && val < 20) return words[2];

  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const withNumWord = (value, words) => {
  return value + " " + numWord(value, words);
};

export const maskaOnlyNumber = {
  mask: "S*",
  tokens: "S:[0-9]:multiple",
};

// export const textDateFormat = () => 