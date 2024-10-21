import "./home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Card = function ({ card }) {
  console.log(card);
  return (
    <Link to={`elections/${card._id}`}>
      <article className="card">
        <div className="card__header">
          <h4>{card?.title}</h4>
        </div>
        <div className="card__content">
          <p>test description</p>
        </div>
        <div className="card__footer">
          <small>{card?.endDate}</small>
        </div>
      </article>
    </Link>
  );
};

function Home() {
  const { auth } = useAuth();
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const organisationId = auth.id;

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllElections = async function () {
      try {
        const res = await axiosPrivate.get(
          `/api/v1/elections/?org=${organisationId}`
        );
        console.log(res.data, "ss");
        if (res.status === 200) {
          setElectionData(res.data.elections);
        }
      } catch (error) {
        if (error.response.status === 400) {
          return toast.error("Network error");
        }
      } finally {
        setLoading(false);
      }
    };
    getAllElections();
  }, []);
  return (
    <div className="voteresult__home">
      <div className="voteresult__content">
        {electionData?.map((card, idx) => {
          return <Card card={card} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default Home;
