import "./electioncardlist.css";
import LOGO from "../../../assets/logo.png";
import { useEffect, useState } from "react";
import { RxCaretUp, RxCaretDown } from "react-icons/rx";
import { CandidateCard } from "../../../components";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ElectionCardList({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [voters, setVoters] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const openCard = function () {
    return setIsOpen(!isOpen);
  };

  const getVoters = async function (id) {
    try {
      const res = await axiosPrivate.get(`/api/v1/elections/${id}/voters`);
      console.log(res, "voter");
      if (res?.status === 200) {
        setVoters(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVoters(data?._id);
  }, [isOpen]);

  return (
    <article className="electioncardlist">
      <div className="electioncardlist__title-text" onClick={openCard}>
        <div className="electioncardlist__title">
          <span className="electioncardlist__img">
            <img src={data?.posterUrl || LOGO} alt={`${data?.name} poster`} />
          </span>
          <div className="electioncardlist__heading">
            <h4>{data?.name}</h4>
            <small>{data?.description}</small>
          </div>
        </div>
        <button
          className="electioncardlist__title-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RxCaretUp /> : <RxCaretDown />}
        </button>
      </div>
      <div className={`content ${isOpen ? "show" : ""}`}>
        {voters.length === 0 && <p>No voters registered yet</p>}

        {voters?.map((user, idx) => (
          <CandidateCard data={user} url={`/voters/${user._id}`} key={idx} />
        ))}
      </div>
    </article>
  );
}

export default ElectionCardList;
