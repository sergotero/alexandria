import bcrypt from "bcryptjs";

export function capitalize(word: string | null): string | null {
  if (word === null || word === undefined) {
    return null;
  } else {
    const firstLetter: string = word.slice(0,1).toUpperCase();
    const restLetters: string = word.slice(1).toLowerCase();
    return firstLetter + restLetters;
  }
}

export async function encryptPassword(pass: string, num: number = 10): Promise<string> {
  const salt = await bcrypt.genSalt(num);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
}

export async function checkPassword(pass: string, hash: string): Promise<boolean> {
  const check = bcrypt.compare(pass, hash);
  return check;
}