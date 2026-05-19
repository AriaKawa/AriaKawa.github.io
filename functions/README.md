# Movie Recommender Function

This function powers `movie-recommender.html` without exposing an OpenAI API key in browser code.

## Setup

```bash
cd functions
npm install
firebase functions:secrets:set OPENAI_API_KEY
firebase deploy --only functions:recommendMovies
```

The function reads `OPENAI_MODEL` if it is available in the runtime environment, otherwise it uses `gpt-5.4-mini`.

The default callable URL is:

```text
https://us-central1-multiplayer-640ec.cloudfunctions.net/recommendMovies
```
