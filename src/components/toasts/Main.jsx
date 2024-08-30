import "./styles.css";

// message -> toast component
const Main = function ({ closeToast, toastProps }) {
  return (
    <div className="toast__main">
      Lorem ipsum dolor {toastProps.position}
      <button>Retry</button>
      <button onClick={closeToast}>Close</button>
    </div>
  );
};

// error -> toast component
const Error = function ({ message }) {
  return <div className="toast__main">{message}</div>;
};

// Success -> toast component
const Success = function ({ closeToast, toastProps }) {
  return (
    <div className="toast__main">
      Lorem ipsum dolor {toastProps.position}
      <button>Retry</button>
      <button onClick={closeToast}>Close</button>
    </div>
  );
};

export default Main;

export { Error, Success };
