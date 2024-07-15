const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 4444;

mongoose.connect(`mongodb+srv://nikhilsengar7012:8WmbD7qSjnI4mFql@registration-form.rkyehsp.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname+"/form/index.html");
})

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const RegisteredUser = await Registration.findOne({ email: email });
        if (!RegisteredUser) {
            const registrationData = new Registration({
                name,
                email,
                password,
            });
            await registrationData.save();
            console.log("Successfully Registered.");
            res.redirect("/Success");
        }
        else {
            console.log("User Already exist");
            res.redirect("/Registered");
        }
    }
    catch (error) {
        console.log(error);
        res.redirect("Registered");
    }
})

app.get("/Success", (req, res) => {
    res.sendFile(__dirname+"/form/Success.html");
});

app.get("/Registered", (req, res) => {
    res.sendFile(__dirname+"/form/Registered.html");
});

app.listen(port, () => {
    console.log(`Server is running at ${port} port.`);
});
