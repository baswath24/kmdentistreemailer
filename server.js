
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

async function wrapped_send_mail(data) {
    return new Promise((resolve, reject)=>{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kmdentistreetest@gmail.com', // Domain gmail user
                pass: 'Test@123' // Domain gmail password
            }
        }); 
    
        let mailOptions = {
            from: 'kmdentistreetest@gmail.com', // sender address
            subject: "Dentistree Appointment", // Subject line
            // to: "gurukarthik3@gmail.com", // list of receivers
            to: "kmdentistreetest@gmail.com", // list of receivers
            text: JSON.stringify(data), // plain text body
        };
            // send mail with defined transport object
        let info = transporter.sendMail(mailOptions, (err, info)=>{
            if(err){
                console.log(err);
                resolve(false);
            }else{
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                resolve(true);
            }
        });
    })
}


send_mail = async(data) => {
    let response = await wrapped_send_mail(data);
    return response;
}
app.post('/form', async(req,res)=>{
    const a = await send_mail(req.body);
    console.log("after sending ", a);
    res.json(a);
});

app.listen(process.env.PORT || 3000, ()=>{console.log("running on 3000");})

