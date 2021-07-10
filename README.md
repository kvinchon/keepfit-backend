# keepfit-backend
This repository is exclusively reserved for the 5th year innovative project, carried out with a purely pedagogical aim.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
This project is based on `Express.js` framework.

Make sure that `Node.js` is installed on your local machine. Binaries, installers, and source tarballs are available at <https://nodejs.org/en/download/>. 
Also, this project requires a Mapbox account. Make sure you have one in order to launch the application in development mode.

### Installing
Clone this repository into a folder of your choice:
```bash
$ git clone https://github.com/kvinchon/keepfit-backend.git && cd keepfit-backend/
```

To load dependencies, run the following command: 
```bash
$ npm install
```

Create a `.env` file containing the database connection credentials, the secret key for authentication and your Mapbox access token:
```
DATABASE_URL=MY_DB_URL
SECRET_KEY=MY_SECRET_KEY
MAPBOX_ACCESS_TOKEN=MY_ACCESS_TOKEN
```

Start the server by running the following command. By default, the server runs on port `8000`:
```bash
$ npm run dev
```

## API Authentication & Authorization
In order to access protected resources, you will need an access token, retrieved when the user logs in.
To access the protected resources, make sure you have the required role and add the following line in the request headers:
```
x-access-token: my-access-token
```

## API Documentation
Documentation for the latest Current release is available at <http://localhost:8000/api/documentation>.

## Authors
* **Kevin Vinchon** - *Initial work* - [kvinchon](https://github.com/kvinchon)
