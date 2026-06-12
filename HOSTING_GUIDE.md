# Full-Stack Deployment Guide for CineGrid

This step-by-step guide is designed to help you host your full-stack movie application (**CineGrid**) on the cloud for free.

We will deploy:
1. **Database**: A cloud-hosted MySQL database using **Aiven** (which offers a reliable free MySQL tier).
2. **Backend**: The Express.js server hosted on **Render** (free Web Service).
3. **Frontend**: The React + Vite website hosted on **Vercel** (free static site hosting).

---

## Phase 1: Push Your Code to GitHub

First, you need to save your project code in a GitHub repository.

1. **Log in to GitHub** (or sign up at [github.com](https://github.com)).
2. Click **New** (or the `+` icon in the top right) to create a new repository.
   - Name it: `CineGrid`
   - Keep it **Public** or **Private** (either works).
   - **Do NOT** check "Add a README", "Add .gitignore", or "Choose a license" (we already have these in our code).
   - Click **Create repository**.
3. Open a terminal in your project directory (`d:\GitHub\CineGrid`) and run the following commands to push your project:
   ```bash
   git init
   git add .
   git commit -m "Configure mobile responsiveness and deployment support"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/CineGrid.git
   git push -u origin main
   ```
   *(Be sure to replace `YOUR_GITHUB_USERNAME` with your actual GitHub username).*

---

## Phase 2: Create a Cloud MySQL Database

Since this application uses MySQL, we need a database running in the cloud that our hosted backend can connect to.

1. Go to [aiven.io](https://aiven.io) and create a free account.
2. Click **Create service**.
3. Select **MySQL** as your service type.
4. Choose **Free Plan** (this will cost you $0/month).
5. Choose a cloud region close to you (e.g., AWS / Google Cloud in your continent) and click **Create Service**.
6. Wait 2–3 minutes for your database to initialize. Once it's ready:
   - Under **Connection Information**, find the **Service URI**. It looks like this:
     `mysql://avnadmin:password@mysql-hostname.aivencloud.com:port/defaultdb?ssl-mode=REQUIRED`
   - Copy this entire connection string. **This is your database URL**.

---

## Phase 3: Deploy the Express Backend on Render

Render is a cloud hosting platform that will run your Node.js server.

1. Go to [render.com](https://render.com) and sign up (using your GitHub account makes it easier).
2. On your Render dashboard, click **New** (top right) and select **Web Service**.
3. Select **Build and deploy from a Git repository**, click **Next**, and connect your GitHub account.
4. Select your **CineGrid** repository from the list.
5. In the configuration settings, fill out:
   - **Name**: `cinegrid-backend`
   - **Root Directory**: *(leave blank)*
   - **Language**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/initDb.js && node server/index.js`
     *(This runs the database migration first to create the `users` and `watchlist` tables, then starts the Express server).*
   - **Instance Type**: `Free`
6. Scroll down and click **Advanced** to add **Environment Variables**:
   - Click **Add Environment Variable** and enter:
     - Key: `DATABASE_URL`
     - Value: *(paste the Service URI you copied from Aiven)*
   - Add another environment variable:
     - Key: `JWT_SECRET`
     - Value: *(type any random long secure password, e.g., `supersecretkey12345`)*
7. Click **Create Web Service**.
8. Render will compile and start your server. Watch the logs. Once it says `Connected to MySQL database` and `Server is running on port 10000`, your backend is live!
9. At the top left of the screen, copy your Web Service URL (e.g., `https://cinegrid-backend.onrender.com`).

---

## Phase 4: Deploy the React Frontend on Vercel

Vercel is the easiest and fastest platform to host Vite React frontends.

1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
2. On the dashboard, click **Add New** and select **Project**.
3. Import your **CineGrid** repository.
4. In the Project Settings:
   - **Framework Preset**: Vercel should automatically detect **Vite**. If not, select it.
   - **Root Directory**: *(leave blank or `./`)*
   - **Build and Output Settings**: *(default is fine: `npm run build` and output directory `dist`)*
5. Expand the **Environment Variables** section and add:
   - Name: `VITE_BACKEND_URL`
   - Value: `https://YOUR-RENDER-BACKEND-URL.onrender.com/api`
     *(Make sure to append `/api` to the end of the Render backend URL you copied in Phase 3!)*
6. Click **Deploy**.
7. Vercel will build your static files. After 1 minute, you will see a congratulations screen. Click on the preview image to open your hosted website!

---

## Troubleshooting & Verification

- **Vercel loads but login fails**: Open your browser developer tools (F12) -> Console. If you see CORS errors or network errors, double check that your `VITE_BACKEND_URL` environment variable on Vercel is exactly correct and ends with `/api`.
- **Render deployment fails**: Check the Render deployment logs. Make sure you entered the correct `DATABASE_URL` from Aiven. Aiven database URIs include `ssl-mode=REQUIRED` at the end which is correct, and our backend is configured to accept connection strings directly.
