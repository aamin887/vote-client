import "./elections.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ElectionCard, PageHeader } from "../../components";
import { BsInbox } from "react-icons/bs";
import useNav from "../../hooks/useNav";
import { useEffect, useState } from "react";

import { Link, useOutletContext } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Loader } from "../../components";
import { toast } from "react-toastify";

function Elections() {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  const [electionData, setElectionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { toogleGridView } = useNav();

  const { searchQuery, currentPage } = useOutletContext();

  useEffect(() => {
    const getAllElections = async function () {
      try {
        const res = await axiosPrivate.get("/api/v1/elections");
        if (res.status === 200) {
          setElectionData(res.data.results);
          setFilteredData(res.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllElections();
  }, []);

  useEffect(() => {
    const filtered = electionData?.filter((election) =>
      election?.electionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  // alert(show);

  return (
    <div className="elections">
      <div className="elections__header">
        {electionData.length !== 0 && <PageHeader />}
      </div>
      {/* {electionData.length !== 0 && (
        <div className="elections__view">
          <h3 className="section__heading title__text">Elections</h3>
          <p className="section__text">
            This page contains all the election created under this account.
          </p>
          <div className="elections__view-btns">
            <button
              className={`elections__view-icons ${
                toogleGridView ? "active" : ""
              }`}
              onClick={handleListView}
            >
              <IoList />
            </button>
            <button
              className={`elections__view-icons ${
                !toogleGridView ? "active" : ""
              }`}
              onClick={handleGridView}
            >
              <IoGrid />
            </button>
          </div>
        </div>
      )} */}

      {loading && <Loader />}

      {electionData.length === 0 && loading === false && (
        <div className="dashboard__content-election_empty">
          <p>{<BsInbox />}</p>

          <p>
            There are no elections available. Please create a new one to get
            started.
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

      {electionData.length > 0 && loading === false && (
        <div
          className={`elections__content ${
            !toogleGridView ? "grid__view" : ""
          }`}
        >
          {filteredData?.map((election, idx) => {
            return <ElectionCard data={election} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Elections;
