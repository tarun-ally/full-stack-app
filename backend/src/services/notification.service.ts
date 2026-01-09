import nodemailer from 'nodemailer';
import twilio from 'twilio';

// FREE Gmail SMTP
const emailTransporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// FREE Twilio Trial
const twilioClient = process.env.TWILIO_SID && process.env.TWILIO_TOKEN 
    ? twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    : null;

// FREE SMS via Email-to-SMS Gateway
const SMS_GATEWAYS = {
    'verizon': '@vtext.com',
    'att': '@txt.att.net',
    'tmobile': '@tmomail.net',
    'sprint': '@messaging.sprintpcs.com',
    'boost': '@smsmyboostmobile.com',
    'cricket': '@sms.cricketwireless.net'
};

export async function sendEmail(eventType: string, payload: any): Promise<void> {
    if (!process.env.EMAIL_USER || !process.env.TEST_EMAIL) {
        console.log('📧 EMAIL: No credentials, skipping');
        return;
    }

    const subject = getEmailSubject(eventType);
    const body = getEmailBody(eventType, payload);

    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TEST_EMAIL,
            subject,
            html: body
        });
        console.log('📧 EMAIL sent successfully');
    } catch (error) {
        console.error('📧 EMAIL failed:', error);
        throw error;
    }
}

export async function sendSMS(eventType: string, payload: any): Promise<void> {
    // Try Twilio first (if configured)
    if (twilioClient && process.env.TWILIO_PHONE && process.env.TEST_PHONE) {
        return sendTwilioSMS(eventType, payload);
    }
    
    // Fallback to FREE Email-to-SMS
    if (process.env.SMS_PHONE && process.env.SMS_CARRIER) {
        return sendEmailToSMS(eventType, payload);
    }
    
    console.log('📱 SMS: No service configured, skipping');
}

async function sendTwilioSMS(eventType: string, payload: any): Promise<void> {
    const message = getSMSMessage(eventType, payload);
    try {
        await twilioClient!.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE!,
            to: process.env.TEST_PHONE!
        });
        console.log('📱 SMS sent via Twilio');
    } catch (error) {
        console.error('📱 Twilio SMS failed:', error);
        throw error;
    }
}

async function sendEmailToSMS(eventType: string, payload: any): Promise<void> {
    if (!process.env.EMAIL_USER) {
        throw new Error('Email credentials required for SMS gateway');
    }
    
    const phone = process.env.SMS_PHONE!.replace(/[^0-9]/g, ''); // Remove formatting
    const carrier = process.env.SMS_CARRIER!.toLowerCase();
    const gateway = SMS_GATEWAYS[carrier as keyof typeof SMS_GATEWAYS];
    
    if (!gateway) {
        throw new Error(`Unsupported carrier: ${carrier}`);
    }
    
    const smsEmail = phone + gateway;
    const message = getSMSMessage(eventType, payload);
    
    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: smsEmail,
            subject: '', // Most carriers ignore subject for SMS
            text: message // Plain text only for SMS
        });
        console.log(`📱 SMS sent via ${carrier} gateway to ${smsEmail}`);
    } catch (error) {
        console.error('📱 Email-to-SMS failed:', error);
        throw error;
    }
}

export async function sendPush(eventType: string, payload: any): Promise<void> {
    console.log(`🔔 PUSH: ${eventType} notification (Firebase not configured)`);
}

function getEmailSubject(eventType: string): string {
    switch (eventType) {
        case 'USER_SIGNUP': return '🎉 Welcome! Account Created';
        case 'ORDER_CREATED': return '📦 Order Confirmation';
        case 'PASSWORD_RESET': return '🔐 Password Reset Request';
        default: return `📢 ${eventType} Notification`;
    }
}

function getEmailBody(eventType: string, payload: any): string {
    const baseStyle = 'font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;';
    
    switch (eventType) {
        case 'USER_SIGNUP':
            return `<div style="${baseStyle}">
                <h2>🎉 Welcome!</h2>
                <p>Your account has been created successfully.</p>
                <p><strong>User ID:</strong> ${payload.userId || 'N/A'}</p>
                <p>Thank you for joining us!</p>
            </div>`;
        case 'ORDER_CREATED':
            return `<div style="${baseStyle}">
                <h2>📦 Order Confirmed</h2>
                <p>Your order has been placed successfully.</p>
                <p><strong>Details:</strong> ${JSON.stringify(payload)}</p>
                <p>We'll notify you when it ships!</p>
            </div>`;
        case 'PASSWORD_RESET':
            return `<div style="${baseStyle}">
                <h2>🔐 Password Reset</h2>
                <p>A password reset was requested for your account.</p>
                <p>If this wasn't you, please ignore this email.</p>
            </div>`;
        default:
            return `<div style="${baseStyle}">
                <h2>📢 ${eventType}</h2>
                <p>Event details: ${JSON.stringify(payload)}</p>
            </div>`;
    }
}

function getSMSMessage(eventType: string, payload: any): string {
    switch (eventType) {
        case 'USER_SIGNUP': return `🎉 Welcome! Your account is ready. User: ${payload.userId || 'N/A'}`;
        case 'ORDER_CREATED': return `📦 Order confirmed! We'll update you on shipping status.`;
        case 'PASSWORD_RESET': return `🔐 Password reset requested. Ignore if not you.`;
        default: return `📢 ${eventType} notification`;
    }
}