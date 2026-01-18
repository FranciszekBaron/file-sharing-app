import { jwtDecode } from 'jwt-decode';
import type { User } from '..//..//src//types/User';
import type { UserFromToken } from '../dto/UserFromToken';

export interface JwtPayload {
  sub: string;    
  name: string;          // userId
  email: string;
  userId: string;   
  avatar: string        // custom claim z backendu
  jti: string;
  exp: number;              // timestamp wygaśnięcia
  iss: string;              // issuer
  aud: string;              // audience
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // w sekundach
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

export const getUserFromToken = (token: string): User| null => {
  const payload = decodeToken(token);
  if (!payload) return null;


console.log("Paylod from token: " + "\n" + 
    payload.email + "\n" + 
    payload.name + "\n" + 
    payload.avatar);

  return {
    id: payload.userId || payload.sub,
    name: payload.name,
    email: payload.email,
    avatar: payload.avatar
  };
};