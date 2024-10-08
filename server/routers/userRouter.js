const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "henDPjehnEDPheh!YuolGN"

const User = require("../models/userModel");


// Register
router.post("/", async (req, res) => {

    try {

        const { email, password, passwordVerify } = req.body;
        console.log("in post route", email, password, passwordVerify)

        if(!email || !password || !passwordVerify) {
            return res.status(400)
                      .json({ errorMessage: "Please enter all required fields."})
        }

        if (password.length < 6) {
            return res.status(400)
                      .json({ errorMessage: "Please enter a passowrd of at least 6 characters."})
        }

        if (password !== passwordVerify) {
            return res.status(400)
                      .json({ errorMessage: "Please enter the same password twice." })
        }

        const existingUser = await User.findOne( { email });
        
        if (existingUser) {
            return res.status(400).json({ errorMessage: "An account with this email already exists." })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save()

        // log the user in
        const token = jwt.sign({
            user: savedUser._id,
        }, JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true 
        }).send()

    } catch(err) {
        console.log(err);
        res.status(500).send(); 
    }
    
    
});



// Login

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400)
                      .json({ errorMessage: "Please enter all required fiedls."})
        }

        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            return res.status(401)
                      .json({ errorMessage: "Wrong email or password."})
        }
        
        const passowrdCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passowrdCorrect) {
            return res.status(401)
                      .json({ errorMessage: "Wrong email or password."})
        }

        const token = jwt.sign({
            user: existingUser._id,
        }, JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true 
        }).send()


    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
})

router.get("/loggedIn", (req, res) => {
    try{
        const token = req.cookies.token;

        if(!token) return res.json(false)

        jwt.verify(token, JWT_SECRET);

        res.send(true)

    } catch(err) {
        console.error(err);
        res.status(401).json({
            errorMessage: "Unauthorized."
        })
    }
})




router.delete("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
})

// TODO: add a put/patch route

module.exports = router;