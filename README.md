
# 🚨 **Disaster Management Backend API** 🚨

Welcome to the **Disaster Management Backend API**! This is a robust and powerful backend system designed to help manage disaster-related data, donations, and shelters. This API facilitates easy interaction with users (including NGOs and donors), and provides live alerts during disasters. 🌍💪

---

## **Features** 🛠️

- **User Authentication & Roles** 🔐
  - Login functionality for NGOs to manage shelters and donations.
- **Shelter Management** 🏠
  - NGOs can add and view shelters for disaster relief.
- **Donation Management** 💸
  - Users can make donations and view their donation history.
- **Disaster Alerts** 🚨
  - Real-time alerts for disaster situations with geo-location data.

---

## **Getting Started** 🚀

To get started with the backend API, follow the steps below:

### Prerequisites 🔑

- **Node.js** - Ensure Node.js is installed on your system.
- **MongoDB** - Database used to store data (local or cloud).
- **JWT Token** - User authentication and authorization are handled via JWT tokens.

---

### **Installation** 🔧

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/disaster-management-backend.git
   ```

2. **Install dependencies**:
   ```bash
   cd disaster-management-backend
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add your secret keys and MongoDB URI.
   ```env
   ACCESS_TOKEN_SECRET=your_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

The API will now be running on `http://localhost:5000`.

---

## **API Endpoints** 📡

### **1️⃣ Authentication & User Role Verification** 🛂

- **POST `/api/login`**:  
  **Login a user (NGO)**  
  **Fields**: 
  - `email`
  - `password`
  
  **Response**:
  - JWT token for further authenticated requests.

---

### **2️⃣ Shelter Management** 🏠

- **POST `/api/shelters`**:  
  **Add a new shelter (NGO only)**  
  **Fields**:
  - `name`: Name of the shelter 🏢
  - `location`: Address of the shelter 🗺️
  - `capacity`: Shelter capacity 🛏️
  - `contact`: Shelter's contact info 📞
  
  **Authorization**: JWT token required for NGOs.

- **GET `/api/shelters`**:  
  **View all shelters**  
  **Response**: List of all shelters.

---

### **3️⃣ Donation Management** 💸

- **POST `/api/donations`**:  
  **Make a donation**  
  **Fields**:
  - `donorName`: Your name (if not anonymous) ✍️
  - `anonymous`: Boolean for anonymity 🤐
  - `amount`: Donation amount 💵
  - `donorEmail`: Optional email 📧
  - `donorAddress`: Optional address 🏡
  - `ngoName`: Name of the NGO receiving the donation 🏢

- **GET `/api/donations`**:  
  **Get all donations made by the logged-in user**  
  **Authorization**: JWT token required for user authentication.

---

### **4️⃣ Disaster Alerts** 🚨

- **POST `/api/alerts`**:  
  **Send a disaster alert**  
  **Fields**:
  - `message`: Message describing the disaster 🌪️
  - `location`: Geo-location of the disaster 🗺️ (latitude, longitude)
  - `severity`: Severity of the disaster (low, medium, high) ⚠️
  - `alertType`: Type of disaster (flood, earthquake, etc.) 🌊

- **GET `/api/alerts`**:  
  **Get all active disaster alerts**  
  **Response**: List of alerts.

---

## **Models** 🏗️

### **User Model** 👤

- **Fields**:
  - `email`: The user’s email (for login) 📧
  - `password`: The user’s password 🔑
  - `role`: Can be `ngo` for NGOs.

### **Shelter Model** 🏠

- **Fields**:
  - `name`: Name of the shelter 🏢
  - `location`: Address of the shelter 🗺️
  - `capacity`: The shelter’s capacity 🛏️
  - `contact`: Contact info 📞
  - **ngoId**: Reference to the NGO that owns the shelter 🏢

### **Donation Model** 💸

- **Fields**:
  - `donorName`: Name of the donor (if not anonymous) ✍️
  - `anonymous`: Whether the donation is anonymous or not 🤐
  - `amount`: Donation amount 💵
  - `donorEmail`: Donor's email 📧
  - `donorAddress`: Donor's address 🏡
  - `ngoName`: Name of the NGO receiving the donation 🏢

### **Alert Model** 🚨

- **Fields**:
  - `message`: Description of the alert 🌪️
  - `location`: Geo-location of the disaster 🗺️
  - `severity`: Severity level of the disaster (low, medium, high) ⚠️
  - `alertType`: Type of disaster (e.g., earthquake, flood) 🌊

---

## **Authentication** 🔑

**JWT (JSON Web Tokens)** are used to authenticate users. After logging in with valid credentials, the server will issue a token that must be included in the Authorization header of subsequent requests. 🛂

**Example**:  
```bash
Authorization: Bearer <your_jwt_token>
```

---

## **How to Interact with the API** 💻

For the **frontend**, here’s what needs to be sent:

1. **Login**:
   - Send `email` and `password` to the **POST `/api/login`** endpoint.
   - Get the JWT token from the response and save it for future requests.

2. **Shelters**:
   - **POST**: Send `name`, `location`, `capacity`, `contact` to **POST `/api/shelters`** (with token).
   - **GET**: Fetch all shelters with **GET `/api/shelters`** (no data needed from frontend).

3. **Donations**:
   - **POST**: Send `donorName`, `anonymous`, `amount`, `donorEmail`, `donorAddress`, `ngoName` to **POST `/api/donations`**.
   - **GET**: Fetch all donations made by the logged-in user with **GET `/api/donations`** (JWT token required).

4. **Alerts**:
   - **POST**: Send `message`, `location`, `severity`, and `alertType` to **POST `/api/alerts`**.
   - **GET**: Fetch all active alerts with **GET `/api/alerts`** (no data needed from frontend).

---

## **Conclusion** 🎉

This backend system provides a seamless way to manage shelters, handle donations, and send disaster alerts. The frontend just needs to interact with the API endpoints, send the required data, and display the results!
