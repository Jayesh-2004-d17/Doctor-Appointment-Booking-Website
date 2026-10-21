# Prescripto — Doctor Appointment Booking Website

Prescripto is a full-stack doctor appointment booking application that connects patients with doctors. It provides a patient-facing website, an admin panel, a doctor dashboard, and a REST API backend.

## Features

### Patient Website
- User registration and login
- Browse and search doctors
- View doctor profiles and specialities
- Book doctor appointments
- View and manage appointments
- Cancel appointments
- Update personal profile and upload a profile image
- Online payment integration with Razorpay

### Admin Panel
- Admin authentication
- Add and manage doctors
- View the doctors list
- Manage doctor availability
- View and cancel appointments
- View dashboard statistics

### Doctor Dashboard
- Doctor login
- View appointments
- Complete or cancel appointments
- View dashboard statistics
- View and update doctor profile

## Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios |
| Admin Panel | React, Vite, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| Image Uploads | Multer, Cloudinary |
| Payments | Razorpay |
| Notifications | React Toastify |

## Project Structure

```text
prescripto/
├── frontend/       # Patient-facing React application
├── admin/          # Admin and doctor dashboard
├── backend/        # Express REST API
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB connection or MongoDB Atlas account
- Cloudinary account for image uploads
- Razorpay credentials for payment integration

## Installation and Setup

### 1. Clone the repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd prescripto
```

### 2. Configure the backend

```powershell
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

JWT_SECRET=your_strong_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CURRENCY=INR
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Replace all placeholder values with your own credentials. Never commit `.env` files or real secrets to GitHub.

Start the backend:

```powershell
npm run server
```

The backend uses port `4000` by default, unless you configure another port.

API health check:

```text
http://localhost:4000/
```

The root endpoint should respond with `API WORKING` when the server is running.

### 3. Configure the patient frontend

Open a new PowerShell terminal:

```powershell
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the development server:

```powershell
npm run dev
```

Open the local URL printed by Vite in the terminal.

### 4. Configure the admin panel

Open another PowerShell terminal:

```powershell
cd admin
npm install
```

Create a `.env` file inside `admin`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the admin panel:

```powershell
npm run dev
```

Open the local URL printed by Vite. The patient frontend and admin panel may use different development ports.

## API Routes

The backend exposes REST API routes under these prefixes:

| Prefix | Purpose |
|---|---|
| `/api/user` | Registration, login, profile, appointments and payments |
| `/api/doctor` | Doctor login, appointments, profile and dashboard |
| `/api/admin` | Admin login, doctor management, appointments and dashboard |

Examples of implemented route paths include:

- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/user/get-profile`
- `POST /api/user/book-appointment`
- `GET /api/user/appointments`
- `POST /api/doctor/login`
- `GET /api/doctor/appointments`
- `POST /api/admin/login`
- `POST /api/admin/add-doctor`
- `GET /api/admin/appointments`
- `GET /api/admin/dashboard`

Protected routes require the appropriate authentication token. Refer to the route and controller files for request formats and authorization requirements.

## Available Scripts

### Frontend and Admin

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```powershell
npm run server
npm start
```

The backend package currently does not have an implemented automated test script.

## Security Notes

- Keep API keys, database credentials and JWT secrets in environment variables.
- Do not upload `.env` files to the public repository.
- Use strong secrets and rotate any credentials that may have been exposed.
- Restrict protected endpoints to the appropriate user roles.
- Use HTTPS in production.
- Review authentication, input validation, payment verification and error handling before deploying to production.

## Deployment

The frontend and admin panel can be deployed as separate Vite applications. The backend requires a Node.js-compatible hosting service, and the database must be accessible from that service.

Configure `VITE_BACKEND_URL` with the deployed backend API URL for each frontend. Configure backend environment variables through the hosting provider's secure environment settings.

Before deployment, run the production build for both React applications and verify the backend API, database connection, image uploads, authentication and payment flow.

## Future Improvements

- Automated unit and integration tests
- API documentation using OpenAPI/Swagger
- CI/CD workflow
- Structured logging and application monitoring
- Rate limiting and additional security hardening
- Improved error handling and production deployment documentation

## License

Add the license applicable to this repository before distributing the project.
