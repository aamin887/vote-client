import "./createElection.css";
import { useRef, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";

const CreateElectionForm = ({ closeModal, setAddElection }) => {
  const modalRef = useRef();

  const [offices, setOffices] = useState([{ title: "", description: "" }]);

  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add office

  const handleAddOffice = () =>
    setOffices([...offices, { title: "", description: "" }]);

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

  // close modal when click outside of form
  const close = function (e) {
    if (!modalRef.current.contains(e.target) && modalRef.current) {
      setAddElection(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(offices);
    // closeModal();
  };

  return (
    <div>
      <div className="createelection" onClick={close}>
        <div className="createelection__modal" ref={modalRef}>
          <div className="createelection__modal-title">
            <h2 className="section__heading">Create an election</h2>
            <p className="section__text lead__text">
              Fill in all required field to create election
            </p>
          </div>

          <form onSubmit={handleSubmit} className="createelection__form">
            <div className="createelection__form-details">
              <div className="createelection__form-details_control">
                <span className="details">Name of election</span>
                <input
                  type="text"
                  placeholder="E.g: 2020 Academic year"
                  required
                />
              </div>
              <div className="createelection__form-details_control">
                <span className="details">Description</span>
                <input
                  type="text"
                  placeholder="write a brief description of election..."
                  required
                />
              </div>
            </div>
            <div className="createelection__form-details">
              <div className="createelection__form-details_control">
                <span className="details">Name</span>
                <input
                  type="text"
                  placeholder="E.g: 2020 Academic year"
                  required
                />
              </div>
              <div className="createelection__form-details_control">
                <span className="details">Description</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
            </div>
            <div className="createelection__form-details">
              <div className="createelection__form-details_control">
                <span className="details">Name</span>
                <input
                  type="text"
                  placeholder="E.g: 2020 Academic year"
                  required
                />
              </div>
              <div className="createelection__form-details_control">
                <span className="details">Description</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
            </div>

            {/* positions */}
            <div className="createelection__form-candidates">
              <div className="createelection__form-candidates_header">
                <h4>Add a category</h4>
                <small>Add atleast one category to proceed.</small>
              </div>
              <div className="createelection__form-categories-content">
                {offices.map((office, idx) => {
                  return (
                    <div
                      key={idx}
                      className="createelection__form-categories-control"
                    >
                      <div className="createelection__form-categories-control_details">
                        <span className="details">Title</span>
                        <input
                          type="text"
                          placeholder="Enter a title"
                          required
                          name="title"
                          value={office.title}
                          onChange={(e) => handleUpdateOffices(e, idx)}
                        />
                      </div>

                      <div className="createelection__form-categories-control_details">
                        <span className="details">Description</span>
                        <input
                          type="text"
                          value={office.description}
                          placeholder="Description"
                          required
                          name="description"
                          onChange={(e) => handleUpdateOffices(e, idx)}
                        />
                      </div>

                      {idx > 0 && (
                        <button
                          className="createelection__form-categories-btn"
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
                Add Office
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
};

export default CreateElectionForm;
