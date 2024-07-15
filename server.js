// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PAjEdBPsf5aXDOUGWSouLZsqG59rbpqHHRl0Z3t2CLSN2Jpuci3bmzPk8L6UTtgVtVMh8BfkZSrabBIbR3s26ip00K3VRukSZ"
);
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/Success",(req,res)=>{
  res.json({'message':"Payment sucess"});
})

app.get("/Cancel",(req,res)=>{
  res.json({'message':"Payment Failed"});
})


// app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:8080";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    // customer_email: "customer@example.com",
    // submit_type: "donate",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Modify Quantity Below",
          },
          unit_amount: 2000,
          tax_behavior: "exclusive",
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:8080/Success`,
    cancel_url: `http://localhost:8080/Cancel`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

app.listen(8080, () => console.log("Running on port 8080"));
