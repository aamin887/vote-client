import "./voters.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useNav from "../../hooks/useNav";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { FaPlus } from "react-icons/fa";
import { BsInbox } from "react-icons/bs";
import { Loader } from "../../components";

import { ElectionCardList } from "../../components";

function Voters() {
  const axiosPrivate = useAxiosPrivate();
  const { toogleGridView, handleGridView } = useNav();
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all elections for the user
  const getAllElections = async function () {
    try {
      const res = await axiosPrivate.get("/api/v1/elections");
      if (res.status === 200) {
        setElectionData(res?.data?.results);
      }
    } catch (error) {
      const errStatus = error?.response?.status;
      if (errStatus === 400) {
        return toast.error("message");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllElections();

    const handleResize = function () {
      if (window.innerWidth <= 620) {
        handleGridView();
      }
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="voters ">
      <div className="voters__content">
        <div className="voters__content-left">
          <div
            className={`voters__content-election ${!toogleGridView ? "" : ""}`}
          >
            {loading && <Loader />}
            {electionData.length > 0 && loading === false && (
              <div className="voters__content-election_header">
                <div className="voters__content-election_header-title">
                  <h5>Elections</h5>
                  <p>Click on an election to see all registered voters</p>
                </div>
              </div>
            )}

            {electionData?.length > 0 && loading === false && (
              <div className="voters__content-election_cards">
                {electionData?.map((election, idx) => {
                  return (
                    <ElectionCardList
                      setLoading={setLoading}
                      data={election}
                      handleDelete={""}
                      key={idx}
                    />
                  );
                })}
              </div>
            )}

            {electionData?.length === 0 && (
              <div className="voters__content-election_empty">
                <p>{<BsInbox />}</p>
                <p>
                  There are no elections available. Please create a new one to
                  get started.
                </p>
                <Link
                  to={"/elections/create"}
                  className="voters__content-election_empty-btn"
                >
                  <FaPlus />
                  Create an election
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voters;
