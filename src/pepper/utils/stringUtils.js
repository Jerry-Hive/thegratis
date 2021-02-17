export function toTitleCase(str) {
  let wordArr = str
    .toLowerCase()
    .split(" ")
    .map(function(str) {
      return titleize(str);
    });

  return wordArr.join(" ");
}

export function titleize(str) {
  return str[0].toUpperCase() + str.substring(1);
}
