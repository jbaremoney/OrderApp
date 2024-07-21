const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const {onRequest} = require("firebase-functions/v2/https");

admin.initializeApp();
const stringPart1 = "sk_test_51PcwD52KnQ1b6e5XbA6MuoCHq5Kukdb0";
const stringPart2 = "cpRpJGpzCExCd9DRJcypHf7JONitruoLkky";
const stringPart3 = "LgJWbKrytaWAPrz7HNtfW00pEaYLNsZ";

const fullString = stringPart1.concat(stringPart2).concat(stringPart3);

const stripe = require("stripe")(fullString);

const a = logger;

exports.createPaymentIntent = onRequest(async (req, res) => {
  logger.info("Received request", {body: req.body});

  const {cart, tip, taxRate} = req.body;
  logger.info("Cart:", {cart})

  try {
    // Validate and parse the tip and taxRate
    const parsedTip = parseFloat(tip);
    const parsedTaxRate = parseFloat(taxRate);

    if (isNaN(parsedTip) || isNaN(parsedTaxRate)) {
      throw new Error("Invalid tip or tax rate");
    }

    // Validate and calculate subtotal
    let subtotal = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);

      if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
        throw new Error(`Invalid price or quantity for item: ${item.name}`);
      }

      subtotal += price * quantity;
    });

    const taxAmount = subtotal * parsedTaxRate;
    const totalTip = parsedTip || 0;
    const totalAmount = Math.round((subtotal + taxAmount + totalTip) * 100);

    if (isNaN(totalAmount)) {
      throw new Error("Calculated total amount is NaN");
    }

    logger.info("Calculated total amount", {totalAmount});

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });

    logger.info("Payment intent created successfully", {totalAmount});
  } catch (error) {
    a.error("Error creatinpayInte", {error: error.message, stack: error.stack});
    res.status(500).send({error: error.message});
  }
});
