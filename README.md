# 🛒 Multi-Vendor Backend Project

## 📖 Project Overview
This project is a **Multi-Vendor Management System** backend. It allows vendors to register, create their own firms (business profiles), and add products under those firms. The admin or dashboard side gives an overview of the total vendors, firms, and products.

This system can be used for building large-scale e-commerce or marketplace applications where multiple sellers can list products.

---

##  Detailed API Structure

###  Vendor API Structure
This section handles vendor-related operations like registration, login, profile management, and deletion.

![image](https://github.com/user-attachments/assets/57e05025-e1d3-449e-b801-deb57a7df81b)

- **Register Vendor**:  
  `POST /api/vendor/register`  
  Creates a new vendor account.

- **Vendor Login**:  
  `POST /api/vendor/login`  
  Allows vendors to log in and receive a JWT token for authentication.

- **Get Vendor Profile**:  
  `GET /api/vendor/profile`  
  Returns the vendor's own profile details.

- **Update Vendor**:  
  `PUT /api/vendor/update/:id`  
  Updates vendor information based on the given vendor ID.

- **Delete Vendor**:  
  `DELETE /api/vendor/delete/:id`  
  Deletes a vendor account based on the given vendor ID.

---

### 2️⃣ Firm API Structure
A **firm** represents the vendor's business or company entity under which products are added.

- **Add Firm**:  
  `POST /api/firm/add`
  
![image](https://github.com/user-attachments/assets/64e3abce-bbfa-4407-93a2-b75b87f7df7a)

  Allows vendors to create a new firm.

- **Get All Firms for Vendor**:  
  `GET /api/firm/vendor/:vendorId`  
  Retrieves all firms created by a particular vendor.

- **Get All Firms (Admin View)**:  
  `GET /api/firm/all`  
  Retrieves all firms present in the system for admin monitoring.

---

### 3️⃣ Product API Structure
Products are linked to firms and added by vendors. File/image upload is handled using Multer.

- **Add Product**:  
  `POST /api/product/add`
![image](https://github.com/user-attachments/assets/38a06de4-06c7-48b7-849f-b04d593c4ef4)

  Vendors can add a product under a firm, including image uploads.

- **Get All Products**:
  ![image](https://github.com/user-attachments/assets/c835393e-55b0-4cb8-875e-637497e810ec)
- 
  `GET /api/product/all`
  
  Returns a list of all products added by vendors.

---

### 4️⃣ Dashboard Overview


The dashboard provides an admin-level view of:
- Total Vendors Count
- Total Firms Count
- Total Products Count
  
![image](https://github.com/user-attachments/assets/87dade9d-a569-4b75-aa27-60b12ec2c179)

This helps the admin monitor platform activity.

---

## 💻 Technology Stack

| Technology        | Usage                          |
|------------------|--------------------------------|
| **Node.js**      | Server-side runtime            |
| **Express.js**   | Web application framework      |
| **MongoDB**      | NoSQL database                 |
| **Mongoose**     | MongoDB ODM for schema modeling|
| **JWT**          | Authentication using tokens    |
| **Multer**       | For file/image uploads         |







