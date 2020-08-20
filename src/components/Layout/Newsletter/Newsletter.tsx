import React from "react";
import "./style.scss";

import addToMailchimp from "gatsby-plugin-mailchimp";

const Newsletter = () => {
  const [email, setEmail] = React.useState("");

  // type....
  const [subscribing, setSubscribing] = React.useState<
    "" | "subscribing" | "success" | "error"
  >("");

  // 1. via `.then`
  const _handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");

    setSubscribing("subscribing");

    // setTimeout(() => {
    //   setSubscribing("subscribed");
    // }, 1000);
    // setTimeout(() => {
    //   setSubscribing("error");
    // }, 2000);

    addToMailchimp(email, {
      URL: window.location.pathname,
    }) // listFields are optional if you are only capturing the email address.
      .then((data) => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)

        setSubscribing(data.result);
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
        setSubscribing("error");
      });
  };

  const _handleChange = (event) => {
    setEmail(event.target.value);
  };

  // return "";
  return (
    <div className="newsletter-wrapper">
      <form autoComplete="on" method="POST" onSubmit={_handleSubmit}>
        <header>
          <h5 style={{ fontSize: "1.51572rem" }}>Subscribe</h5>
          <p>
            Enjoyed this article?
            <br />
            Subscribe to my newsletter to receive my next articles right in your
            email 📧💌
          </p>
        </header>
        <div className="newsletter-form-body">
          <div id="email-ui">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              spellCheck="false"
              placeholder="Email Address"
              required
              value={email}
              onChange={_handleChange}
            />
          </div>
          <div id="submit-wrapper">
            <button type="submit" value="Subscribe!">
              <span>Subscribe!</span>
            </button>
          </div>
        </div>

        <div
          className={`loader ${subscribing === "subscribing" ? "" : "hidden"}`}
        ></div>
        <p className={`thankyou ${subscribing === "success" ? "" : "hidden"}`}>
          Success! <br /> Check your email to confirm. Thank you! 🙇🏻‍♂️
        </p>
        <p className={`email-error ${subscribing === "error" ? "" : "hidden"}`}>
          There was an error subscribing. 😢
        </p>
        <p className="spam">No spam. Ever. Pinky-Promise! 🙏🏻</p>
      </form>
    </div>
  );
};

export default Newsletter;
