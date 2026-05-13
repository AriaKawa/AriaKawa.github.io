# VoiceScale Firebase Setup

VoiceScale is wired for a public Firestore leaderboard. It falls back to browser-only local storage until `firebase-config.js` is filled in.

## 1. Create Firebase project

1. Go to the Firebase console.
2. Create a project.
3. Add a Web app.
4. Copy the Firebase config object.
5. Paste those values into `voice-scale/firebase-config.js`.

Firebase's web setup docs show this same config + `initializeApp` pattern:
https://firebase.google.com/docs/web/setup

## 2. Create Firestore

1. In Firebase, open Firestore Database.
2. Create a database.
3. Start in production mode.
4. Use this collection name in the app: `voiceScaleScores`.

The app creates documents automatically when scores are submitted.

## 3. Security rules

Use rules like these for a public novelty leaderboard:

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /voiceScaleScores/{scoreId} {
      allow read: if true;
      allow create: if
        request.resource.data.keys().hasOnly(['name', 'weight', 'confidence', 'date', 'createdAt']) &&
        request.resource.data.name is string &&
        request.resource.data.name.size() > 0 &&
        request.resource.data.name.size() <= 18 &&
        request.resource.data.weight is int &&
        request.resource.data.weight >= 85 &&
        request.resource.data.weight <= 330 &&
        request.resource.data.confidence is int &&
        request.resource.data.confidence >= 0 &&
        request.resource.data.confidence <= 100 &&
        request.resource.data.date is string &&
        request.resource.data.createdAt == request.time;
      allow update, delete: if false;
    }
  }
}
```

## 4. Publish

After `firebase-config.js` has real values, commit and push to GitHub Pages again. The leaderboard will switch from local mode to public realtime mode automatically.
