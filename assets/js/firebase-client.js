import { firebaseConfig } from "./firebase-config.js";

const firebaseVersion = "12.7.0";
let servicesPromise = null;

export function hasFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

export async function getFirebaseServices() {
  if (!hasFirebaseConfig()) {
    return null;
  }

  if (!servicesPromise) {
    servicesPromise = loadFirebaseServices();
  }

  return servicesPromise;
}

async function loadFirebaseServices() {
  const appModule = await import(`https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js`);
  const firestoreModule = await import(`https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-firestore.js`);
  const app = appModule.initializeApp(firebaseConfig);

  return {
    app,
    db: firestoreModule.getFirestore(app),
    firestore: firestoreModule,
  };
}
