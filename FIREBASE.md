# Firebase In This Site

Shared Firebase setup lives in:

- `assets/js/firebase-config.js`
- `assets/js/firebase-client.js`

For new pages, load the page script as a module:

```html
<script type="module" src="your-page.js"></script>
```

Then import the shared helper:

```js
import { getFirebaseServices, hasFirebaseConfig } from "./assets/js/firebase-client.js";

if (hasFirebaseConfig()) {
  const { db, firestore } = await getFirebaseServices();
  const { collection, addDoc, serverTimestamp } = firestore;

  await addDoc(collection(db, "exampleCollection"), {
    name: "Example",
    createdAt: serverTimestamp(),
  });
}
```

For scripts inside a subfolder, adjust the path:

```js
import { getFirebaseServices } from "../assets/js/firebase-client.js";
```

VoiceScale already uses this shared setup for its public Firestore leaderboard.
