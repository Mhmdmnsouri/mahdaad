# User Data Fetch with Cache and Cancellation

This branch implements user data retrieval with advanced handling, including:

- API calls triggered by `userId`
- Cancelling previous requests if `userId` changes before completion
- Caching responses per `userId` to avoid redundant network requests
- Always updating the state with the latest response only

This ensures optimal performance and a responsive UX when switching between users.

---

## 🎥 Screen Recording

[Watch the coding](https://drive.google.com/file/d/1_r2MWngSbG6oeWAeTWtaBD_JD0muD4PZ/view?usp=sharing)

---

## 📂 Branch

`feat/user-data-cache-cancel`
