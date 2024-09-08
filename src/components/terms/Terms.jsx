import "./terms.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

function Terms() {
  const axiosPrivate = useAxiosPrivate();

  const logout = useLogout();

  const handleAcceptTerms = async (e) => {
    e.preventDefault();
    const res = await axiosPrivate.put(`/auth/accept-terms/`, {
      verified: true,
    });
    console.log(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleDeclineTerms = async (e) => {
    e.preventDefault();
    return logout();
  };

  return (
    <div className="terms__modal">
      <div className="terms">
        <div className="terms__content">
          <h2 className="section__text">
            This election is being conducted by the election me.
          </h2>
          <div className="terms__content-text">
            <p>
              You, as being a member of this group under the constituencies of
              me, are allowed to vote. Please take the following steps in order
              to cast a valid vote. You are requested to cast vote on your own
              decision and not by being presserurized by someone. If someone
              threatens you for making a voting decsion please contact the given
              helpline numbers.
            </p>
            <div className="terms__content-text_steps">
              <h4>Steps</h4>
              <ol type="i">
                <li>
                  Make sure that you are selecting your wanted candidate by
                  confirming the name and symbol on the screen.
                </li>
                <li>
                  Make sure that you are selecting your wanted candidate by
                  confirming the name and symbol on the screen.
                </li>
                <li>
                  Make sure that you are selecting your wanted candidate by
                  confirming the name and symbol on the screen.
                </li>
                <li>
                  Make sure that you are selecting your wanted candidate by
                  confirming the name and symbol on the screen.
                </li>
              </ol>
            </div>
          </div>
          <div className="terms__footnote">
            <form onSubmit={handleSubmit}>
              <div className="terms__footnote-control">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">
                  I have read, understood and will follow the above rules.
                </label>
              </div>
              <div className="terms__footnote-buttons">
                <button onClick={handleDeclineTerms} className="btn">
                  Cancel
                </button>
                <button onClick={handleAcceptTerms} className="btn">
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
