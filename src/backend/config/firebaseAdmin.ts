import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = getAuth();

export const verifyFirebaseToken = async (token: string) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      org_id: decodedToken.org_id || null,
    };
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    throw new Error('Invalid token');
  }
}; 