const express=require('express');const app=express();const cors=require('cors');require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const axios = require('axios');
app.use(cors());app.use(express.json());

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Cache for API data
let cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const fetchWithCache = async (url, key) => {
  const now = Date.now();
  if (cache[key] && (now - cache[key].timestamp) < CACHE_TTL) {
    return cache[key].data;
  }
  try {
    const response = await axios.get(url);
    cache[key] = { data: response.data, timestamp: now };
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fallback to local users data if external API fails
    let users;
    try {
      users = await fetchWithCache('https://api.hn9codecraft.com/users.js', 'users');
    } catch (error) {
      console.log('External API failed, using local users data');
      users = [
        {
          id: 1,
          firstname: 'Admin',
          lastname: 'User',
          email: 'admin@admin.com',
          password: 'Admin@123',
          phone: '+1234567890',
          country: 'Admin',
          totalHours: 0,
          spentHours: 0,
          purchasedPlans: []
        }
      ];
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected endpoints
app.get('/plans', authenticateToken, async (req, res) => {
  try {
    const plans = await fetchWithCache('https://api.hn9codecraft.com/plans.js', 'plans');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

app.get('/services', authenticateToken, async (req, res) => {
  try {
    const services = await fetchWithCache('https://api.hn9codecraft.com/services.js', 'services');
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await fetchWithCache('https://api.hn9codecraft.com/users.js', 'users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
app.post('/create-checkout-session',async(req,res)=>{
  try{const {line_items, customer_email}=req.body;
  const session=await stripe.checkout.sessions.create({
    mode:'payment',line_items,
    customer_email,
    success_url:'http://localhost:5174/success',cancel_url:'http://localhost:5174/cancel'
  });
  res.send({sessionId:session.id});}catch(e){console.error('Stripe error:', e);res.status(500).send({error: e.message || 'Failed to create checkout session'})}});

// Webhook endpoint to handle Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details.email;

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: 'Payment Confirmation - Hn9 Codecraft Services',
      text: `Thank you for your purchase! Your payment has been successfully processed. Session ID: ${session.id}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent to:', customerEmail);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  res.json({ received: true });
});

app.listen(process.env.PORT||4242,()=>console.log('Server running'));
