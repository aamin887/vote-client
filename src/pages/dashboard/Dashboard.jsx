import "./dashboard.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useNav from "../../hooks/useNav";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { IoGrid, IoList } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { BsInbox } from "react-icons/bs";
import { Loader } from "../../components";

import InforCard from "../../components/cards/inforCard/InforCard";
import CustomAdd from "../../components/customAdd/CustomAdd";
import ElectionCard from "../../components/cards/ElectionCard/ElectionCard";

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const { toogleGridView, handleGridView, handleListView } = useNav();
  const [electionData, setElectionData] = useState([]);
  const [stats, setStats] = useState([]);
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

  // fetch all elections for the user
  const getStats = async function () {
    try {
      const res = await axiosPrivate.get("/api/v1/stats");
      setStats(res?.data);
    } catch (error) {
      const errStatus = error?.response?.status;
      if (errStatus === 400) {
        return toast.error("message");
      }
    }
  };

  useEffect(() => {
    getAllElections();
    getStats();

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
    <div className="dashboard ">
      <div className="dashboard__content">
        <div className="dashboard__content-left">
          <div className="dashboard__stats">
            <CustomAdd />
            <InforCard
              icon={<GiVote size={26} />}
              title="Elections"
              stats={stats.elections}
            />
            {/* all voters */}
            <InforCard
              icon={<GiVote size={26} />}
              title="Candidates"
              stats={stats.candidates}
            />
            {/* all candidates */}
            <InforCard
              icon={<GiVote size={26} />}
              title="Voters"
              stats={stats.voters}
            />
          </div>

          <div
            className={`dashboard__content-election ${
              !toogleGridView ? "grid__view" : ""
            }`}
          >
            {loading && <Loader />}
            {electionData.length > 0 && loading === false && (
              <div className="dashboard__content-election_header">
                <div className="dashboard__content-election_header-title">
                  <h5>Elections</h5>
                  <p>These are all the elections you ever created</p>
                </div>
                <div className="dashboard__content-election_header-btns">
                  <button
                    className={`election__view-btn ${
                      toogleGridView ? "active" : ""
                    }`}
                    onClick={handleListView}
                  >
                    <IoList />
                  </button>
                  <button
                    className={`election__view-btn ${
                      !toogleGridView ? "active" : ""
                    }`}
                    onClick={handleGridView}
                  >
                    <IoGrid />
                  </button>
                </div>
              </div>
            )}

            {electionData?.length > 0 && loading === false && (
              <div className="dashboard__content-election_cards">
                {electionData?.map((election, idx) => {
                  return (
                    <ElectionCard
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
              <div className="dashboard__content-election_empty">
                <p>{<BsInbox />}</p>
                <p>
                  There are no elections available. Please create a new one to
                  get started.
                </p>
                <Link
                  to={"/elections/create"}
                  className="dashboard__content-election_empty-btn"
                >
                  <FaPlus />
                  Create an election
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard__content-right">
          <div className="dashboard__content-logs">
            <div className="logs__card">
              <div className="logs__card-title">
                <h5>Upcoming Elections</h5>
              </div>
              <div className="logs__card-content">
                <ul>
                  <li>
                    <h6>Amin</h6>
                    <p>Created a new election</p>
                  </li>
                  <li>
                    <h6>Amin</h6>
                    <p>Created a new election</p>
                  </li>
                  <li>
                    <h6>Amin</h6>
                    <p>Created a new election</p>
                  </li>
                  <li>
                    <h6>Amin</h6>
                    <p>Created a new election</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
