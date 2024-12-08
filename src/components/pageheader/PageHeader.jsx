import "./styles.css";
import useNav from "../../hooks/useNav";
import { IoGrid, IoList } from "react-icons/io5";

function PageHeader() {
  const { toogleGridView, handleGridView, handleListView } = useNav();

  return (
    <div className="dashboard__content-election_header">
      <div className="dashboard__content-election_header-title">
        <h5>Elections</h5>
        <p>These are all the elections you ever created</p>
      </div>
      <div className="dashboard__content-election_header-btns">
        <button
          className={`election__view-btn ${toogleGridView ? "active" : ""}`}
          onClick={handleListView}
        >
          <IoList />
        </button>
        <button
          className={`election__view-btn ${!toogleGridView ? "active" : ""}`}
          onClick={handleGridView}
        >
          <IoGrid />
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
