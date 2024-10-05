import "./dashboard.css";
import { useState, useEffect } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import { GiVote } from "react-icons/gi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useNav from "../../hooks/useNav";
import InforCard from "../../components/cards/inforCard/InforCard";
import CustomAdd from "../../components/customAdd/CustomAdd";
import ElectionCard from "../../components/cards/ElectionCard/ElectionCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Loader } from "../../components";
import { BsInbox } from "react-icons/bs";

function Dashboard() {
  const { toogleGridView, handleGridView, handleListView } = useNav();
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  const organisationId = auth.id;

  const handleDelete = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 204) {
        setElectionData(electionData.filter((data) => data._id !== id));
        await axiosPrivate.delete(`/api/v1/positions/elections/${id}`);
      }
      setLoading(true);
      toast.success("deleted");
      console.log(res);
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllElections = async function () {
      try {
        const res = await axiosPrivate.get(
          `/api/v1/elections/?org=${organisationId}`
        );
        console.log(res.data);
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
    <div className="dashboard section__padding-md">
      <div className="dashboard__content">
        <div className="dashboard__content-left">
          <div className="dashboard__stats">
            <CustomAdd />
            <InforCard
              icon={<GiVote size={26} />}
              title="Elections"
              stats={electionData.length}
            />
            {/* all voters */}
            <InforCard
              icon={<GiVote size={26} />}
              title="Elections"
              stats={electionData.length}
            />
            {/* all candidates */}
            <InforCard
              icon={<GiVote size={26} />}
              title="Elections"
              stats={electionData.length}
            />
          </div>

          <div
            className={`dashboard__content-election ${
              toogleGridView ? "grid__view" : ""
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
            )}
            {electionData.length > 0 && loading === false && (
              <div className="dashboard__content-election_cards">
                {electionData?.map((election, idx) => {
                  return (
                    <ElectionCard
                      data={election}
                      handleDelete={handleDelete}
                      key={idx}
                    />
                  );
                })}
              </div>
            )}

            {electionData.length === 0 && (
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
