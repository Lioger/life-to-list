const capitalizeFirstLeterOfEachWord = (text: String) =>
  text.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

export {
  capitalizeFirstLeterOfEachWord,
};
