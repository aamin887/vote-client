import "./addcandidate.css";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

function AddCandidate() {
  const location = useLocation();
  const [positions, setPositions] = useState([]);

  const { state } = location;
  const descRef = useRef();

  const handleFocus = function (e) {
    const desValue = descRef.current;

    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  const [offices, setOffices] = useState([
    { name: "", position: "", manifesto: "" },
  ]);

  const handleCreatePosition = async (data) => {
    try {
      const res = await axiosPrivate.post("/api/v1/candidates", data);
      if (res.status === 204) {
        setOffices([{ fullName: "", position: "", manifesto: "" }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add candidate
  const handleAddOffice = () => {
    setOffices([...offices, { fullName: "", position: "", manifesto: "" }]);
  };

  //👇🏻 removes a selected item from the list
  const handleRemoveOffice = (index) => {
    const list = [...offices];
    list.splice(index, 1);
    setOffices(list);
  };
  //👇🏻 updates an item within the list
  const handleUpdateOffices = (e, index) => {
    const { name, value } = e.target;
    const list = [...offices];
    list[index][name] = value;
    setOffices(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(offices);

    handleCreatePosition(offices);

    setOffices([{ fullName: "", position: "", manifesto: "" }]);
  };

  useEffect(() => {
    const ge = async () => {
      const res = await axiosPrivate.get(`/api/v1/positions/${state._id}`);
      console.log(res);
      if (res.status === 200) {
        setPositions(res.data);
      }
    };

    ge();
  }, []);

  const positionSelectionOptions = positions.map((data, idx) => (
    <option value={data._id} key={idx}>
      {data.positionName}
    </option>
  ));

  return (
    <div>
      <div className="addcandidate">
        <div className="addcandidate__content">
          <div className="addcandidate__modal-title">
            <h2 className="section__heading">
              You are about add a candidate to {state.electionName}
            </h2>
            <p className="section__text lead__text">
              Fill in all required field to create election
            </p>
          </div>

          <form onSubmit={handleSubmit} className="addcandidate__form">
            <div className="addcandidate__top">
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Name of election</span>
                  <p>{state.electionName}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Organisation</span>
                  <p>{state.organisation}</p>
                </div>
              </div>
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Start date</span>
                  <p>{state.startDate}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Close date</span>
                  <p>{state.endDate}</p>
                </div>
              </div>
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Organiser</span>
                  <p>{state.organisation}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Is active</span>
                  <p>{state.isActive.toString(true)}</p>
                </div>
              </div>
              <div className="createelection__form-details-fl">
                {/* candidate message */}
                <div className="createelection__form-details_control">
                  <span className="details">Manifesto</span>
                  <p>{state.description}</p>
                </div>
              </div>
            </div>
            {/* positions */}
            <div className="addcandidate__form-candidates">
              <div className="addcandidate__form-candidates_header">
                <h4>Adding a candidate</h4>
                <small>Go ahead and add some candidates</small>
              </div>
              <div className="addcandidate__form-categories-content">
                {offices.map((office, idx) => {
                  return (
                    <div key={idx}>
                      <div className="addcandidate__form-categories-control">
                        <div className="addcandidate__form-categories-control_details">
                          <span className="details">Name</span>
                          {idx >= 0 && idx !== offices.length - 1 && (
                            <p>{office.name}</p>
                          )}
                          <input
                            type="text"
                            placeholder="eg. Amin Alhassan"
                            required
                            name="fullName"
                            value={office.fullName}
                            onChange={(e) => handleUpdateOffices(e, idx)}
                          />
                        </div>

                        <div className="addcandidate__form-categories-control_details">
                          <span className="details">Position</span>
                          <select
                            name="position"
                            value={office.position}
                            onChange={(e) => handleUpdateOffices(e, idx)}
                          >
                            {[
                              <option value={""} key={idx}>
                                {"Select a position"}
                              </option>,
                              ...positionSelectionOptions,
                            ]}
                          </select>
                        </div>
                      </div>
                      <div className="createelection__form-details-fl">
                        {/* candidate message */}
                        <div className="createelection__form-details_control">
                          <span className="details">Manifesto</span>
                          <textarea
                            name="manifesto"
                            onBlur={handleFocus}
                            ref={descRef}
                            placeholder="What is their message?"
                            onChange={(e) => handleUpdateOffices(e, idx)}
                            value={office.manifesto}
                          ></textarea>
                        </div>
                      </div>
                      {idx >= 0 && offices.length > 1 && (
                        <button
                          className="addcandidate__form-categories-btn"
                          onClick={() => handleRemoveOffice(idx)}
                        >
                          <RiDeleteBin4Fill size={20} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="btn" onClick={handleAddOffice}>
                Add a candidate
              </button>
            </div>
            <div className="button">
              <button className="btn" type="submit">
                Submit
              </button>
              <button className="btn" type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCandidate;
