import "./HelpPage.css";

const HelpPage = () => {
  return (
    <div className="help-container">
      <h1>Help Center</h1>

      <section className="help-section">
        <h2>How to Vote</h2>
        <p>To vote in this application, follow these simple steps:</p>
        <ol>
          <li>Log in using your registered account.</li>
          <li>Select the election category (e.g., student president).</li>
          <li>Choose your candidate and click 'Vote'.</li>
          <li>Confirm your vote on the confirmation screen.</li>
        </ol>
      </section>

      <section className="help-section">
        <h2>FAQs</h2>
        <div className="faq">
          <h3>How do I reset my password?</h3>
          <p>
            If you have forgotten your password, click on 'Forgot Password' on
            the login page and follow the instructions.
          </p>
        </div>
        <div className="faq">
          <h3>Can I change my vote?</h3>
          <p>
            No, once a vote is cast, it cannot be changed. Please double-check
            before confirming.
          </p>
        </div>
      </section>

      <section className="help-section">
        <h2>Contact Us</h2>
        <p>If you need further assistance, you can reach us at:</p>
        <p>Email: support@votingapp.com</p>
        <p>Phone: +123 456 7890</p>
      </section>
    </div>
  );
};

export default HelpPage;
