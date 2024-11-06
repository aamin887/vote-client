import "./home.css";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import ElectionCard from "../components/electioncard/ElectionCard";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { auth } = useAuth();
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const organisationId = auth.id;
  // const { searchQuery, currentPage } = useOutletContext();

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
      {loading && <Loader />}
      <div className="voteresult__content">
        {electionData?.map((card, idx) => {
          return <ElectionCard key={idx} data={card} />;
        })}
      </div>
    </div>
  );
}

export default Home;
