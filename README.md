# Circuit Breaker for Stock API

This branch implements a circuit breaker pattern for handling stock API calls.  
It includes:

- Axios configuration with circuit breaker logic
- Stops sending requests after 3 consecutive failures
- Automatically retries after 60 seconds
- Skips requests while the circuit is open

The pattern helps protect against rate limits or downtime on external stock data providers.

---

## 🎥 Screen Recording

[Watch the coding](https://drive.google.com/file/d/1_lhTL4dEj35F-eUZ0umSQVkuL8qO7JwS/view?usp=sharing)

---

## 📂 Branch

`circuit-breaker-stock-api`
