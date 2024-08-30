import "./dashboard.css";
import { useState, useEffect } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import { PiUsersThreeFill } from "react-icons/pi";
import { GiVote } from "react-icons/gi";
import { LuUserSquare2 } from "react-icons/lu";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Terms } from "../../components";

import useAuth from "../../hooks/useAuth";
import useNav from "../../hooks/useNav";
import InforCard from "../../components/cards/inforCard/InforCard";
import CustomAdd from "../../components/customAdd/CustomAdd";
import ElectionCard from "../../components/cards/ElectionCard/ElectionCard";

function Dashboard() {
  const { toogleGridView, setToogleGridView } = useNav();
  const [electionData, setElectionData] = useState([]);
  const [addElection, setAddElection] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  const organisationId = auth.id;

  // const axiosPrivate = useAxiosPrivate();
  // if (!auth?.verified) return <Terms id={auth.id} />;

  const handleListView = function () {
    setToogleGridView(false);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  const handleGridView = function () {
    setToogleGridView(true);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  useEffect(() => {
    const getAllElections = async function () {
      const res = await axiosPrivate.get(
        `/api/v1/elections/?org=${organisationId}`
      );

      console.log(res.data);
      if (res.status === 200) {
        setElectionData(res.data.elections);
      }
    };

    getAllElections();
  }, []);

  return (
    <div className="dashboard section__padding-md">
      {/* {!auth?.verified && <Terms />} */}
      {/* {addElection && <CreateElection setAddElection={setAddElection} />} */}
      <div className="dashboard__content">
        <div className="dashboard__content-left">
          <div className="dashboard__stats">
            <CustomAdd />
            <InforCard />
            <InforCard />
            <InforCard />
          </div>
          <div
            className={`dashboard__content-election ${
              toogleGridView ? "grid__view" : ""
            }`}
          >
            <div className="dashboard__content-election_header">
              <div className="dashboard__content-election_header-title">
                <h5>Elections</h5>
                <p>These are all the elections you ever created</p>
              </div>
              <div className="dashboard__content-election_header-btns">
                <button
                  className={`election__view-btn ${
                    !toogleGridView ? "active" : ""
                  }`}
                  onClick={handleListView}
                >
                  <IoList />
                </button>
                <button
                  className={`election__view-btn ${
                    toogleGridView ? "active" : ""
                  }`}
                  onClick={handleGridView}
                >
                  <IoGrid />
                </button>
              </div>
            </div>

            <div className="dashboard__content-election_cards">
              {/* <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard />
              <ElectionCard /> */}

              {electionData?.map((election, idx) => {
                return <ElectionCard data={election} key={idx} />;
              })}
            </div>
          </div>
        </div>
        <div className="dashboard__content-right">
          <div className="dashboard__content-logs">
            <div className="logs__card">
              <div className="logs__card-title">
                <h5>Recent Activities</h5>
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
