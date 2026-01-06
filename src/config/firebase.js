// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#avnpm install firebaseailable-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyoVU6kg-3KTBuxDmVYK5una0PyQ3Shf4",
  authDomain: "portfolio-8ef6c.firebaseapp.com",
  projectId: "portfolio-8ef6c",
  storageBucket: "portfolio-8ef6c.firebasestorage.app",
  messagingSenderId: "674666586786",
  appId: "1:674666586786:web:744c072e035bd7ab87adfb",
  measurementId: "G-SSX5JC3DK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics
try {
  // Analytics can fail in some environments (e.g. when offline or unsupported)
  analytics = getAnalytics(app)
} catch (err) {
  console.warn('Firebase Analytics not initialized:', err?.message || err)
}

// Firestore
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from 'firebase/firestore';

const db = getFirestore(app);
const statsDocRef = doc(db, 'stats', 'portfolio');

async function ensureStatsDoc() {
  // If offline, skip Firestore calls to avoid noisy errors
  if (typeof window !== 'undefined' && window.navigator && !window.navigator.onLine) {
    return null
  }

  const snap = await getDoc(statsDocRef)
  if (!snap.exists()) {
    await setDoc(statsDocRef, { likes: 0, views: 0 })
  }
  return snap
}

export async function getStats() {
  if (typeof window !== 'undefined' && window.navigator && !window.navigator.onLine) {
    return { likes: 0, views: 0 }
  }

  const snap = await ensureStatsDoc()
  if (!snap) return { likes: 0, views: 0 }

  const latest = await getDoc(statsDocRef)
  return latest.exists() ? latest.data() : { likes: 0, views: 0 }
}

export async function incrementLikes(delta = 1) {
  if (typeof window !== 'undefined' && window.navigator && !window.navigator.onLine) {
    // Skip updates when offline; just resolve with a fallback value
    return { likes: 0, views: 0 }
  }

  await ensureStatsDoc()
  await updateDoc(statsDocRef, {
    likes: increment(delta)
  })
  const snap = await getDoc(statsDocRef)
  return snap.exists() ? snap.data() : { likes: 0, views: 0 }
}

export async function incrementViews() {
  if (typeof window !== 'undefined' && window.navigator && !window.navigator.onLine) {
    return { likes: 0, views: 0 }
  }

  await ensureStatsDoc()
  await updateDoc(statsDocRef, {
    views: increment(1)
  })
  const snap = await getDoc(statsDocRef)
  return snap.exists() ? snap.data() : { likes: 0, views: 0 }
}

export async function subscribeToStats(onChange) {
  if (typeof window !== 'undefined' && window.navigator && !window.navigator.onLine) {
    // Immediately call back with zeros and skip realtime listener when offline
    onChange({ likes: 0, views: 0 })
    return () => {}
  }

  await ensureStatsDoc()
  const unsub = onSnapshot(statsDocRef, (snap) => {
    if (snap.exists()) onChange(snap.data())
  })
  return unsub
}

export { app, db, analytics };