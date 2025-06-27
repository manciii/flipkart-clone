import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto"; 

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
    retry: { enabled: false }

});

export const createOrder = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount) * 100, 
            currency: "INR",
            receipt: "receipt_order_" + Date.now()
        };

        const order = await instance.orders.create(options);
        console.log(" Razorpay order created:", order);
        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ message: "Order creation failed" });
    }
};

export const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    console.log("Razorpay Order ID:", razorpay_order_id);
    console.log(" Razorpay Payment ID:", razorpay_payment_id);
    console.log(" Signature from Razorpay:", razorpay_signature);
    console.log(" Expected Signature (Generated):", expectedSignature);

    if (expectedSignature === razorpay_signature) {
        console.log("Signature Matched! Payment Verified.");
        res.status(200).json({ status: "Payment verified" });
    } else {
        console.log(" Signature Mismatch! Payment verification failed.");
        res.status(400).json({ status: "Payment verification failed" });
    }
};

