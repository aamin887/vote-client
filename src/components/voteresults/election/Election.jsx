import { useParams, Link } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import useAuth from "../../../hooks/useAuth";
import "./election.css";
import PositionCard from "../components/positioncard/PositionCard";

function Election() {
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [positions, setPositions] = useState([]);

  const { auth } = useAuth();

  console.log(auth.id);

  const organisationId = auth?.id;

  useEffect(() => {
    const getPositions = async function () {
      try {
        const res = await axiosPrivate.get(
          `/api/v1/elections/${id}?org=${organisationId}`
        );

        console.log(res?.data?.election);

        if (res.status === 200) {
          const resPosition = await axiosPrivate.get(
            `/api/v1/positions/?election=${id}`
          );

          setPositions([...resPosition?.data]);
          console.log(resPosition);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };

    console.log(positions);

    getPositions();
  }, []);
  console.log(id);
  return (
    <div>
      {load && <Loader />}

      <div className="election__content">
        {positions?.map((position, idx) => {
          return <PositionCard data={position} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default Election;
