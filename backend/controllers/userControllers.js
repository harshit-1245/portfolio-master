const asyncHandler = require('express-async-handler');
const nodemailer=require('nodemailer');
const User = require('../models/userModel');

const getUser = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

const sendInfo = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Please fill in the name and email section" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            name,
            email,
            message,
        });

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

const sendEmail = asyncHandler(async (req, res) => {
    const { email, subject, body } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'harshitsingh50621@gmail.com', // Replace with your email
                pass: 'Harshit_1245', // Replace with your password or use environment variables
            },
        });

        const mailOptions = {
            from: 'harshitsingh50621@gmail.com', // Replace with your email
            to: email,
            subject: subject || 'New submission from your website',
            text: body || 'Received a new submission from your website!',
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).send('Error sending email');
    }
});



module.exports = { getUser, sendInfo,sendEmail};
