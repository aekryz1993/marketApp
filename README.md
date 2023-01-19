# MarketApp

The application is composed of of two parts:

- The backend back-end app in the `backend/` directory
- The frontend app located in the `market-frontend/` directory

## Getting Started

For the server side application, navigate to the `backend/` directory then add `.env` file with the following variables:

```bash
# MongoDB database url
DATABASE_URL=""

# optional variables
HOST=""
PORT=
# Cloudinary api for generating photos seed. For more information visit `https://cloudinary.com/documentation/node_integration`
CLOUDINARY_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
# Pexels access key for uploading the generated photos. for more information visit `https://www.pexels.com/api/documentation/`
PEXELS_ACCESS_KEY=""
```

For the client side application, navigate to the `market-frontend/` directory then add `.env` file with the following variables:

```bash
# optional variables
HTTP_ENDPOINT=
WS_ENDPOINT=
```

## Scripts

```bash
# Install dependencies
npm install
# Run the application
npm run dev
```
