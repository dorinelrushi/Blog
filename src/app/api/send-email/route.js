import nodemailer from "nodemailer";

export async function POST(request) {
  // Destructure the required fields from the request body
  const { name, lastname, email, url, description } = await request.json();

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dorinelrushi8@gmail.com", // Your email address
      pass: process.env.NEXT_SECRET_PASSWORD, // Your email password or app-specific password
    },
  });

  try {
    // Set up email options
    let mailOptions = {
      from: email, // Sender's email
      to: "dorinel253@gmail.com", // Your receiving email
      subject: `New Portfolio Submission from ${name} ${lastname}`,
      text: `You have a new portfolio submission.\n\nName: ${name} ${lastname}\nEmail: ${email}\nPortfolio Link: ${url}\nDescription: ${description}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error sending email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
