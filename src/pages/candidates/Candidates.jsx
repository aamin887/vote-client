import "./candidates.css";
import { CandidateCard } from "../../components";

import Usercard from "../../components/usercard/Usercard";
function Candidates() {
  return (
    <div className="candidates section__padding-md">
      <div className="candidates__content">
        <CandidateCard data={{ fullName: "Amin Alhassan" }} />
        <Usercard />
      </div>
    </div>
  );
}

export default Candidates;
