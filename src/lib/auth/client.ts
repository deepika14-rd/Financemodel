'use client';

import type { User } from '@/types/user';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

// ✅ FIXED USER OBJECT (added role)
const user = {
  id: 'USR-0001',
  avatar: '/assets/avatar.png',
  firstName: 'Deepika',
  lastName: 'Rivers',
  email: 'deepika@devias.io',
  role: 'admin', // ✅ REQUIRED FIELD
} satisfies User;

export async function signUp(_: SignUpParams): Promise<{ error?: string }> {
  return {};
}

export async function signIn(_: SignInParams): Promise<{ error?: string }> {
  return {};
}

export async function signOut(): Promise<void> {
  return;
}

export async function getUser(): Promise<User | null> {
  return user;
}