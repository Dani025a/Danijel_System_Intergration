# Database Setup Guide

This guide explains how to install and set up the database using Docker, and provides details about each user and their privileges.

## Installation
1. Install Docker on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

2. Install PostgreSQL client tools:
   - Download and install PostgreSQL client tools from the official PostgreSQL website: [PostgreSQL Downloads](https://www.postgresql.org/download/).
   - Make sure to select the appropriate version for your operating system.

3. Add PostgreSQL bin directory to PATH:
   - **Windows**:
     - Open the Control Panel.
     - Go to System and Security > System > Advanced system settings.
     - Click on the "Environment Variables" button.
     - In the "System Variables" section, select the "Path" variable and click on "Edit".
     - Add the path to the PostgreSQL bin directory (e.g., `C:\Program Files\PostgreSQL\13\bin`) to the list of paths.
     - Click "OK" to save the changes.
     - You can check PostgreSQL versio, to make sure that you have installed PostgreSQL correct
    ```bash
    psql --version
    ```
4. Navigate to the project directory in your terminal.

5. Run the following command to build the Docker image and set up the database:

    ```bash
    docker build -t my-postgres-image .
    ```

6. After the build process is complete, run the Docker container with the following command:

    ```bash
    docker run --name my-postgres-container -p 5432:5432 -d my-postgres-image
    ```

## Users and Privileges

### Admin User

- Username: admin_user
- Password: adminpassword
- Privileges:
  - Full access to all tables in the public schema.

### Author User

- Username: author_user
- Password: authorpassword
- Privileges:
  - SELECT, INSERT, UPDATE, DELETE on the authors table.
  - SELECT, INSERT, UPDATE, DELETE on the books table.

### User Management User

- Username: user_management_user
- Password: usermanagementpassword
- Privileges:
  - SELECT, INSERT, UPDATE, DELETE on the users table.
  - SELECT on the books table.
  -  SELECT on the authors table.

