export function capitalize(word: string) {
  const firstLetter: string = word.slice(0,1).toUpperCase();
  const restLetters: string = word.slice(1).toLowerCase();
  return firstLetter + restLetters;
}