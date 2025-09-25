import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-790e3109/health", (c) => {
  return c.json({ status: "ok" });
});

// Waitlist signup endpoint
app.post("/make-server-790e3109/waitlist", async (c) => {
  try {
    const body = await c.req.json();
    const { firstName, lastName, email, company } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company) {
      return c.json({ 
        error: "Missing required fields. Please provide firstName, lastName, email, and company." 
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    // Check if email already exists
    const existingUser = await kv.get(`waitlist:${email}`);
    if (existingUser) {
      return c.json({ error: "Email already registered on waitlist" }, 409);
    }

    // Store waitlist signup
    const signupData = {
      firstName,
      lastName,
      email,
      company,
      signupDate: new Date().toISOString(),
      id: crypto.randomUUID()
    };

    await kv.set(`waitlist:${email}`, signupData);
    
    console.log(`New waitlist signup: ${email} from ${company}`);
    
    return c.json({ 
      success: true, 
      message: "Successfully joined the waitlist!",
      id: signupData.id
    });

  } catch (error) {
    console.log(`Waitlist signup error: ${error}`);
    return c.json({ 
      error: "Internal server error during waitlist signup" 
    }, 500);
  }
});

// Get waitlist count endpoint (for admin purposes)
app.get("/make-server-790e3109/waitlist/count", async (c) => {
  try {
    const waitlistEntries = await kv.getByPrefix("waitlist:");
    return c.json({ count: waitlistEntries.length });
  } catch (error) {
    console.log(`Error getting waitlist count: ${error}`);
    return c.json({ error: "Error retrieving waitlist count" }, 500);
  }
});

Deno.serve(app.fetch);