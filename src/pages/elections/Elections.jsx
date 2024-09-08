import "./elections.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ElectionCard } from "../../components";
import { IoGrid, IoList } from "react-icons/io5";
import useNav from "../../hooks/useNav";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function Elections() {
  const [electionData, setElectionData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { toogleGridView, setToogleGridView } = useNav();
  const { auth } = useAuth();

  const organisationId = auth.id;

  const handleListView = function () {
    setToogleGridView(false);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  const handleGridView = function () {
    setToogleGridView(true);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  const handleDelete = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 200) {
        setElectionData(electionData.filter((data) => data._id !== id));
      }
      toast.success("deleted");
      console.log(res);
      return;
    } catch (error) {
      console.log(error);
    }
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
  }, [electionData]);

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

      <div
        className={`elections__content ${toogleGridView ? "grid__view" : ""}`}
      >
        {electionData.length === 0 && (
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
              Create an election llll
            </Link>
          </div>
        )}
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
    </div>
  );
}

export default Elections;
