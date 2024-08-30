import "./profileimage.css";

const ProfileImages = ({ images = [] }) => {
  return (
    <div className="profile-images-container">
      {images?.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Profile ${index}`}
          className="profile-image"
          style={{ zIndex: images.length + index }}
        />
      ))}
    </div>
  );
};

export default ProfileImages;
