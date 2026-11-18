┌─────────────────────────────────────────────────┐
│              HTTP REQUEST (req)                 │
├─────────────────────────────────────────────────┤
│  req.params  → /movies/123                      │
│                { id: "123" }                    │
│                                                 │
│  req.query   → /movies?genre=comedy&lang=hindi  │
│                { genre: "comedy", lang: "hindi" }│
│                                                 │
│  req.body    → POST /movies with JSON body       │
│                { title: "Dangal" }              │
│                                                 │
│  req.headers → Authorization, Content-Type      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              HTTP RESPONSE (res)                │
├─────────────────────────────────────────────────┤
│  res.send()     → Send text/HTML                │
│  res.json()     → Send JSON object              │
│  res.status()   → Set status code               │
│                   .json() or .send()            │
└─────────────────────────────────────────────────┘