import "./elections.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ElectionCard } from "../../components";
import { IoGrid, IoList } from "react-icons/io5";
import useNav from "../../hooks/useNav";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Loader } from "../../components";
import { toast } from "react-toastify";

function Elections() {
  const [electionData, setElectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { toogleGridView, handleGridView, handleListView } = useNav();
  const { auth } = useAuth();

  const organisationId = auth.id;

  // delete an election
  const handleDeleteElection = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 204) {
        await axiosPrivate.delete(`/api/v1/positions/elections/${id}`);
        setElectionData(electionData.filter((data) => data._id !== id));
        setLoading(true);
        return toast.success("deleted");
      }
      return;
    } catch (error) {
      const statusCode = error.response.data.status;

      if (statusCode === 404) {
        return toast.error("election does not exit");
      } else if (statusCode === 400) {
        return toast.error("network error");
      } else {
        return toast.error("network error");
      }
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
    <div
      className={`elections section__padding-md ${
        toogleGridView ? "grid __view" : ""
      }`}
    >
      <div className="elections__header">
        <h3 className="section__heading title__text">Elections</h3>
        <p className="section__text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
          veritatis deleniti optio asperiores velit eligendi! Aliquid repellat
          ipsam officiis fugit est architecto! Facere repellendus repudiandae
          magni maiores sapiente, omnis eius!
        </p>
      </div>

      <div className="elections__filter">
        <div className="elections__filter-btns">
          <button
            className={`elections__view-btn ${!toogleGridView ? "active" : ""}`}
            onClick={handleListView}
          >
            <IoList />
          </button>
          <button
            className={`elections__view-btn ${toogleGridView ? "active" : ""}`}
            onClick={handleGridView}
          >
            <IoGrid />
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {electionData.length === 0 && loading === false && (
        <div className="dashboard__content-election_empty">
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
          className={`elections__content ${toogleGridView ? "grid__view" : ""}`}
        >
          {electionData?.map((election, idx) => {
            return (
              <ElectionCard
                data={election}
                handleDelete={handleDeleteElection}
                key={idx}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Elections;
