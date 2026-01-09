# 🆓 FREE Notification Setup Guide

## 1. Gmail SMTP (FREE Email)

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Enable 2-Factor Authentication

### Step 2: Generate App Password
1. Go to Google Account > Security > App passwords
2. Generate password for "Mail"
3. Copy the 16-character password

### Step 3: Update .env
```bash
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
TEST_EMAIL=recipient@example.com
```

## 2. FREE SMS Options

### Option A: Email-to-SMS Gateway (100% FREE FOREVER)

**Supported Carriers:**
- Verizon: `@vtext.com`
- AT&T: `@txt.att.net` 
- T-Mobile: `@tmomail.net`
- Sprint: `@messaging.sprintpcs.com`
- Boost: `@smsmyboostmobile.com`
- Cricket: `@sms.cricketwireless.net`

**Setup:**
```bash
SMS_PHONE=1234567890  # Your phone number (no formatting)
SMS_CARRIER=verizon   # Your carrier
```

**How it works:** System sends email to `1234567890@vtext.com` → You get SMS!

### Option B: Twilio Trial (FREE $15 Credit)

1. Sign up at https://www.twilio.com/try-twilio
2. Get Account SID, Auth Token, and phone number
3. Update .env:
```bash
TWILIO_SID=your-account-sid
TWILIO_TOKEN=your-auth-token
TWILIO_PHONE=+1234567890
TEST_PHONE=+1234567890
```

## 3. Test Setup

```bash
# Copy example env
cp backend/.env.example backend/.env

# Edit with your credentials
nano backend/.env

# Start system
./setup-dev.sh
```

## 4. Verify

1. Open http://localhost:5173
2. Click "User Signup" 
3. Check your email and phone!

**Recommendation:** Use Email-to-SMS Gateway for unlimited free SMS!