export function capitalize(word: string | null): string | null {
  if (word === null || word === undefined) {
    return null;
  } else {
    const firstLetter: string = word.slice(0,1).toUpperCase();
    const restLetters: string = word.slice(1).toLowerCase();
    return firstLetter + restLetters;
  }
}