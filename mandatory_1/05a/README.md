# Exposee Server


## Installation

1. Clone this repository:

    ```
    git clone https://github.com/Dani025a/Danijel_System_Intergration.git
    ```

    
2. go to the correct folder:

    ```
   cd .\mandatory_1\05a\
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the server:

    ```
    node exposee.js
    ```
The server will start running on http://localhost:3000 by default.

5. (optional) You can run the script integrator.js

    ```
    node integrator.js
    ```

## API Documentation

### Register Webhook

Registers a webhook for a specific event type.

- **URL:** `http://localhost:3000/webhooks/register`
- **Method:** `POST`
- **Request Body:**
  - `eventType` (string): The type of event to register the webhook for.
  - `endpoint` (string): The URL where the webhook should be called.

#### Example Request:

```json
{
  "eventType": "payment_received",
  "endpoint": "http://localhost:3000/payment_received"
}
```

```json
{
  "eventType": "payment_received",
  "endpoint": "http://localhost:3000/payment_processed"
}
```
## Unregister Webhook

Unregisters a webhook.

- **URL:** `http://localhost:3000/webhooks/unregister`
- **Method:** `POST`
- **Request Body:**
  - `endpoint` (string): The URL of the webhook to unregister.

#### Example Request:

```json
{
  "endpoint": "http://localhost:3000/payment_received"
}
```
```json
{
  "endpoint": "http://localhost:3000/payment_processed"
}
```
## Ping Event

Sends a test event to all registered webhooks.

- **URL:** `http://localhost:3000/ping`
- **Method:** `POST`
- **Response:** `200 OK` on success, with a JSON object containing a message indicating success or failure.
