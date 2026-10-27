# Flask User Authentication Lab

A small Flask and React blog application demonstrating username-based login
with a browser session. The API stores the logged-in user's ID in Flask's
session, so the browser can restore the user after a page refresh.

![Application login page](client/public/login-screenshot.png)

> **Note:** This is an educational example, not production authentication. It
> accepts a username without a password and should not be used to protect
> real accounts or sensitive data.

## Features

- Log in using an existing username.
- Restore the current user from the session.
- Log out without clearing unrelated session data.
- Browse a list of articles and view individual articles.

## Requirements

- Python 3.8.13 (the version specified by `Pipfile`)
- Pipenv
- Node.js and npm

## Setup

Install the Python dependencies, initialize the database, and create sample
users and articles:

```bash
pipenv install
cd server
pipenv run flask db upgrade
pipenv run python seed.py
```

In one terminal, start the API:

```bash
cd server
pipenv run python app.py
```

In another terminal, install and start the React client:

```bash
npm install --prefix client
npm start --prefix client
```

The client proxies API requests to `http://localhost:5555`.

## API

| Method | Endpoint | Behavior |
| --- | --- | --- |
| `POST` | `/login` | Accepts `{"username": "..."}`, sets the session, and returns the user. Returns `400` for a missing username or `404` when the user does not exist. |
| `DELETE` | `/logout` | Removes the logged-in user's ID from the session and returns `204 No Content`. |
| `GET` | `/check_session` | Returns the current user, or `401 Unauthorized` when no valid user is logged in. |

Example login request:

```bash
curl -i -c cookies.txt -H 'Content-Type: application/json' \
  -d '{"username":"<seeded-username>"}' http://localhost:5555/login
```

Replace `<seeded-username>` with one of the usernames created by `seed.py`.
Use the saved cookie to check the session:

```bash
curl -i -b cookies.txt http://localhost:5555/check_session
```

## Tests

From the repository root, run:

```bash
pipenv run pytest
```

The tests expect the database to have been initialized and seeded as described
above.
