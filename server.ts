import express from "express";
import { createServer as createViteServer } from "vite";
import { SendMailClient } from "zeptomail";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (!supabase) {
  console.warn("Supabase credentials missing. Database integration disabled.");
}

// Helper function for keep-alive logic
async function runKeepAlive() {
  if (supabase) {
    console.log("Running Supabase keep-alive...");
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error("Keep-alive query failed:", error.message);
        return { success: false, error: error.message };
      } else {
        console.log("Keep-alive query successful.");
        return { success: true };
      }
    } catch (err: any) {
      console.error("Keep-alive error:", err);
      return { success: false, error: err.message };
    }
  }
  return { success: false, error: "Supabase not initialized" };
}

// Keep-alive cron job for persistent environments (node-cron)
cron.schedule("0 0 * * *", runKeepAlive);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Endpoint for Vercel Cron Jobs
  app.get("/api/cron/keep-alive", async (req, res) => {
    const result = await runKeepAlive();
    res.json(result);
  });

  app.post("/api/waitlist", async (req, res) => {
    const { email, firstName, lastName } = req.body;
    console.log(`Received waitlist request for: ${email}`);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // 1. Save to Supabase (if configured)
    if (supabase) {
      try {
        console.log("Saving to Supabase...");
        const { error } = await supabase
          .from('waitlist')
          .insert([
            { 
              email, 
              first_name: firstName, 
              last_name: lastName,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          if (error.code === '23505') {
            console.log("Duplicate email detected.");
            return res.status(409).json({ error: "This email is already on the waitlist." });
          }
          console.error("Supabase error detail:", error);
          return res.status(500).json({ error: `Database error: ${error.message}` });
        }
        console.log("Successfully saved to Supabase.");
      } catch (dbError: any) {
        console.error("Database exception:", dbError);
        return res.status(500).json({ error: `Database exception: ${dbError.message}` });
      }
    } else {
      console.warn("Supabase not configured, skipping DB save.");
    }

    // 2. Send Email via ZeptoMail
    const url = "https://api.zeptomail.com/"; // Added https://
    const token = process.env.ZEPTOMAIL_API_KEY;
    const senderEmail = process.env.ZEPTOMAIL_SENDER_EMAIL;
    const senderName = process.env.ZEPTOMAIL_SENDER_NAME || "Zysculpt Team";

    if (!token || !senderEmail) {
        console.error("ZEPTOMAIL_API_KEY or ZEPTOMAIL_SENDER_EMAIL is missing");
        return res.status(500).json({ error: "Server configuration error: Missing ZeptoMail credentials." });
    }

    let client = new SendMailClient({url, token});

    try {
        console.log(`Sending email to ${email} via ZeptoMail...`);
        await client.sendMail({
            "from": {
                "address": senderEmail,
                "name": senderName
            },
            "to": [
                {
                    "email_address": {
                        "address": email,
                        "name": `${firstName} ${lastName}`.trim()
                    }
                }
            ],
            "subject": "Welcome to the Zysculpt Waitlist!",
            "htmlbody": `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                <p>Hi ${firstName},</p>
                
                <p>As a thank-you for joining the waitlist, I’ve added you to my <strong>beta list</strong>, so you’ll get early access to Zysculpt before it opens to the public.</p>
                
                <p>I’m curious how you heard about Zysculpt and what you’re hoping it can help you with. If you reply and tell me, I’ll also add you to another list for <strong>extra AI credits</strong> when we launch. Early supporters get special treatment :)</p>
                
                <h3 style="color: #000; margin-top: 24px;">Why Zysculpt?</h3>
                
                <p>Building Zysculpt was heavily influenced by my own experience with rejection emails and the imposter syndrome that often follows.</p>
                
                <p>Last year, I started using AI as a software development tool. When I began thinking about what to build with it, Zysculpt was an easy choice. I’m creating the productivity tool I wish I had early in my career. Sometimes, it isn’t that you’re unqualified—it’s how you present yourself.</p>
                
                <p>Over the past few months, I’ve studied many of the career productivity tools already in the market. I promise Zysculpt won’t be another platform offering a thousand resume templates when the number of ATS-approved ones that actually matter is fewer than five.</p>
                
                <h3 style="color: #000; margin-top: 24px;">When will Zysculpt launch?</h3>
                
                <p>The first version will be ready for beta testing <strong>before the end of June</strong>, and you’ll receive your early access invite by email.</p>
                
                <p>In the meantime, my team and I will be sharing practical tips to help you move closer to your career goals on <a href="https://www.linkedin.com/company/zysculpt" style="text-decoration: underline; color: #000;">LinkedIn</a>, <a href="https://x.com/zysculpt" style="text-decoration: underline; color: #000;">Twitter</a>, <a href="https://www.instagram.com/zysculpt" style="text-decoration: underline; color: #000;">Instagram</a>, and <a href="https://www.facebook.com/zysculpt/" style="text-decoration: underline; color: #000;">Facebook</a>. Come hang out with us there.</p>
                
                <br>
                <p>Cheers,</p>
                <p><strong>Gbemi</strong><br>Founder</p>
              </div>
            `,
        });
        console.log("Email sent successfully");
        res.json({ success: true });
    } catch (error: any) {
        console.error("ZeptoMail error:", JSON.stringify(error, null, 2));
        // Extract meaningful error message if possible
        const errorMessage = error?.error?.message || error?.message || "Failed to send email";
        res.status(500).json({ error: `ZeptoMail Error: ${errorMessage}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
