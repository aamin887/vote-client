import "./candidates.css";
import { CandidateCard, Loader } from "../../components";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { BsInbox } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Candidates() {
  const { auth } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, currentPage } = useOutletContext();

  const organisationId = auth.id;
  const getAllCandidates = async function () {
    try {
      const candidatesResponse = await axiosPrivate.get(`/api/v1/voters`);

      console.log(candidatesResponse.data);
      if (candidatesResponse.status === 200) {
        setCandidates([...candidatesResponse.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <div className="candidates section__padding-md">
      {candidates.length === 0 && (
        <div className="candidates__content-empty">
          <p>
            <BsInbox />
          </p>
          <p>
            No candidates added yet. Go ahead create an election and add some
            candidates.
          </p>
        </div>
      )}
      <div className="candidates__content">
        {loading && <Loader />}
        {candidates?.map((candidate, idx) => (
          <CandidateCard data={candidate} key={idx} />
        ))}

        {searchQuery}
      </div>
    </div>
  );
}

export default Candidates;
