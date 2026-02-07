/**
 * Almacenamiento de usuarios en JSON (localStorage).
 * Un único JSON con un array de usuarios; cada usuario es un objeto en ese array.
 */

const STORAGE_KEY = "maletalista_users";

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

function simpleHash(password: string): string {
  const salt = "maletalista";
  let h = 0;
  const s = salt + password;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export function hashPassword(password: string): string {
  return simpleHash(password);
}

export function checkPassword(password: string, storedHash: string): boolean {
  return simpleHash(password) === storedHash;
}

export function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users, null, 2));
}

export function createUser(params: {
  email: string;
  password: string;
  name: string;
}): StoredUser {
  return {
    id: crypto.randomUUID(),
    email: params.email.trim().toLowerCase(),
    passwordHash: hashPassword(params.password),
    name: params.name.trim(),
    createdAt: new Date().toISOString(),
  };
}
