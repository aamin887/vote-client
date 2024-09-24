// src/components/FAQ.js
import React, { useState } from "react";
import "./faq.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is this application for?",
      answer: "This application helps users to manage their tasks efficiently.",
    },
    {
      question: "How can I create an account?",
      answer:
        "Click on the 'Sign Up' button on the homepage and follow the instructions.",
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, our app is available for both iOS and Android devices.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via email at support@example.com.",
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-header">Frequently Asked Questions</h1>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className="faq-answer"
              style={{
                maxHeight: activeIndex === index ? "200px" : "0",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
