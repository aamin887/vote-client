import "./candidatedetails.css";
import photo from "../../assets/User1.png";

function Candidates() {
  return (
    <div className="candidates section__padding">
      <div className="candidates__left">
        <div className="candidates__left-content">
          <h3 className="section__heading title__text">Amin Alhassan</h3>
          <div className="candidates__left-content_img">
            <img src={photo} alt="" />
          </div>
        </div>
      </div>
      <div className="candidates__right">
        <div className="candidates__right-content">
          <div className="candidates__right-content_details">
            <h3>Position :</h3>
            <p>President</p>
          </div>
          <div className="candidates__right-content_details">
            <h3>Department :</h3>
            <p>Health</p>
          </div>
          <div className="candidates__right-content_details">
            <h3>School :</h3>
            <p>Wa Poly</p>
          </div>
          <div className="candidates__right-content_details">
            <h3>Manisfesto :</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              ullam quod temporibus vel omnis officia sed in illum commodi
              itaque nobis modi dolorem, exercitationem neque natus. Quibusdam
              perferendis nihil reprehenderit. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Provident similique eaque magnam
              pariatur nostrum consequatur possimus, temporibus nesciunt tempore
              quibusdam? lorem 50 Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Iusto nostrum veniam incidunt? Repellendus
              accusantium commodi rerum sunt mollitia, dolorem officia molestiae
              alias suscipit necessitatibus beatae quod ex itaque culpa
              voluptatum dignissimos est! Necessitatibus voluptas dolorem
              aspernatur corrupti sit libero sint, reiciendis atque modi
              explicabo, ab deserunt magni facilis facere obcaecati!
            </p>
          </div>
        </div>
        <div className="candidates__right-footer">
          <button className="secondary__btn">Back to all candidates</button>
          <button className="secondary__btn">Votes</button>
        </div>
      </div>
    </div>
  );
}

export default Candidates;
