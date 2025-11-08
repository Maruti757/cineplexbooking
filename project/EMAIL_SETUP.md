# Email Configuration Guide - MovieBox

This guide explains how to set up email functionality for sending booking confirmation emails.

## What Was Added

- **Email Service**: Nodemailer integration
- **Email Templates**: Professional HTML booking confirmation emails
- **Automatic Emails**: Emails are sent automatically when a booking is created
- **Email Details**: Includes movie info, booking details, customer info, and pricing

## Setting Up Gmail (Recommended)

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Find **2-Step Verification** and enable it
4. Follow the prompts to complete setup

### Step 2: Generate App Password

1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Find **App passwords** (appears after enabling 2FA)
3. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
4. Click **Generate**
5. Copy the 16-character password provided

### Step 3: Update .env File

In `/backend/.env`, update:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM_NAME=MovieBox
```

Replace:
- `your-gmail@gmail.com` with your Gmail address
- `your-16-character-app-password` with the password from Step 2 (without spaces)

