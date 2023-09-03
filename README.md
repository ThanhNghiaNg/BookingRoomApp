# ❣️ ️Building an AI-integrated hotel room booking website


![Travel nest](https://res.cloudinary.com/dqrm0sqsu/image/upload/v1693753047/Untitled_tdeowh.png)

💎 Tech stack:

- NEXTJS
- PRISMA
- OPEN-AI
- MONGODB ATLAS
- CLOUDINARY CDN
- OPENSTREETMAP
- CLERK
- NETLIFY/VERCEL

💎 Feature:

- Server error handling using react-toast
- Calendars with MUI-X
- Page loading state
- Page empty state
- Booking / Reservation system
- Creation and deletion of properties
- Pricing calculation for booking
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
- Favorites system
- Notification with toast
- ...

### ✅ Prerequisites

**Node version 14.x**

## 🔴 SET UP 

### 🔹 Install packages (library)

```shell
yarn
```
## 🔴  RUN LOCAL

### 🔹 Setup .env file

```js
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
POSTMARK_API_TOKEN=your_postmark_api_token
SMTP_FROM=your_smtp_from
POSTMARK_SIGN_IN_TEMPLATE=your_sign_in_template
POSTMARK_ACTIVATION_TEMPLATE=your_activation_template
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_API_KEY=your_stripe_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NODEMAILER_EMAIL=your_nodemailer_email
NODEMAILER_PW=your_nodemailer_password
```

### 🔹 Setup Prisma

```shell
npx prisma db push

```

### 🔹 Start the app

```shell
yarn run dev
```

## 🔹 Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |

# ❤️🧡💛💚💜💙🤎🖤 Instructions on how to integrate API keys  for running the project

This guide provides specific instructions on how to integrate API keys from popular services into website project. Ensure that you replace the placeholders with your actual API key values.

## Obtaining API Key from Cloudinary

1. **Sign Up/Log In**: If you don't already have an account, go to the [Cloudinary website](https://cloudinary.com/) and sign up. If you have an account, log in.

2. **Access Dashboard**: Once logged in, access your Cloudinary dashboard.

3. **Find API Key**: In your dashboard, navigate to the "Account Details" or a similar section where you can find your API Key and API Secret. These are usually labeled as "API Key" and "API Secret Key."

4. **Copy API Key**: Copy your API Key. This is the value you will use to authenticate requests to Cloudinary.

## Obtaining API Key from Stripe

1. **Sign Up/Log In**: If you don't have a Stripe account, go to the [Stripe website](https://stripe.com/) and sign up. If you have an account, log in.

2. **Access Dashboard**: After logging in, access your Stripe dashboard.

3. **Developer Section**: In your dashboard, navigate to the "Developers" or "API" section. Stripe often labels it as "API Keys."

4. **Generate API Key**: If you don't already have an API key, you can generate one. Stripe typically provides a "Publishable Key" and a "Secret Key." For most client-side operations, you'll use the "Publishable Key," and for server-side operations, you'll use the "Secret Key."

5. **Copy API Key**: Copy the relevant API Key you need. Make sure to keep the "Secret Key" secure and never expose it on the client-side.

## Obtaining API Key from Clerk

1. **Sign Up/Log In**: If you haven't already, go to the [Clerk website](https://clerk.dev/) and sign up for an account. If you have an account, log in.

2. **Access Dashboard**: Once logged in, access your Clerk dashboard.

3. **Developer Section**: In your dashboard, navigate to the "Developers" or "API" section. Clerk often labels it as "API Keys" or "Integration."

4. **Generate API Key**: If you don't already have an API key, you can generate one. Clerk typically provides a "Publishable Key" and a "Secret Key." These keys are used for authenticating and interacting with the Clerk service.

5. **Copy API Key**: Copy the relevant API Key you need. Ensure that you use the appropriate key in your application code based on your use case.

## Obtaining API Key from MongoDB Atlas

1. **Sign Up/Log In**: If you don't have a MongoDB Atlas account, go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and sign up. If you have an account, log in.

2. **Access Dashboard**: After logging in, access your MongoDB Atlas dashboard.

3. **Cluster Configuration**: In your dashboard, navigate to your cluster configuration. You can do this by clicking on your cluster or cluster settings.

4. **Database Access**: In the cluster settings, go to the "Database Access" section. This is where you manage user accounts and API keys.

5. **Create API Key**: To create a new API key, click on "Add New Database User" or a similar option. Follow the prompts to create a new user and API key.

6. **Copy API Key**: Once the API key is generated, make sure to copy it. You will need this key to connect to your MongoDB Atlas cluster from your application.

## Obtaining API Key from Nodemailer

1. **Configure Nodemailer**: To use Nodemailer in your project, you need to configure it with the email service provider you plan to use (e.g., Gmail, SMTP server). Follow the documentation of your email service provider to obtain the required credentials.

2. **SMTP Credentials**: If you're using an SMTP server, you'll typically need the following SMTP credentials:

   - SMTP Server Hostname
   - Port Number
   - Username
   - Password or App Password (if applicable)

   These credentials are essential for Nodemailer to send emails through the SMTP server. Refer to your email service provider's documentation to find these details.

## Obtaining API Key from Postmark

1. **Sign Up/Log In**: If you don't have a Postmark account, go to the [Postmark website](https://postmarkapp.com/) and sign up. If you have an account, log in.

2. **Access Dashboard**: Once logged in, access your Postmark dashboard.

3. **API Tokens**: In your dashboard, navigate to the "API Tokens" section. Postmark provides API tokens for accessing their services programmatically.

4. **Generate API Token**: If you don't have an API token, you can generate one. Postmark typically offers a "Server API Token" for server-side integration.

5. **Copy API Token**: After generating the API token, copy it. You will use this token to send emails through Postmark from your application.

## 🔴  DEPLOYING TO NETLIFY

##### Netlify is a popular platform for deploying web applications. Here's how to deploy project to Netlify:

1. **Sign Up/Log In**: If you don't have a Netlify account, go to the [Netlify website](https://www.netlify.com/) and sign up. If you have an account, log in.

2. **Create a New Site**: Once logged in, click the "New Site from Git" button on your Netlify dashboard.

3. **Connect to Repository**: Choose your Git hosting service (e.g., GitHub, GitLab, Bitbucket) and connect your repository to Netlify. Follow the prompts to authorize Netlify to access your repository.

4. **Configure Build Settings**: Netlify will automatically detect your project's build settings. Ensure that it's correctly configured with the build command and public directory for your Next.js project.

5. **Environment Variables**: In the Netlify dashboard, go to "Site settings" or a similar section to set environment variables. Add the environment variables (API keys, database URLs, etc.) you need for your project. These will be securely stored and accessible during the deployment process.

6. **.env.production File**: Create a `.env.production` file in your project's root directory. This file should contain the production environment variables needed for your application. Ensure that you do not include sensitive information directly in this file.

7. **Deploy**: Click the "Deploy" button to start the deployment process. Netlify will build and deploy your project based on your repository's code and configuration.

8. **Access Your Site**: Once the deployment is complete, Netlify will provide you with a URL where your site is hosted. You can access your live site from this URL.
