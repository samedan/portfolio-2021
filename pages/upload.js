import BasePage from "components/BasePage";
import BaseLayout from "components/layouts/BaseLayout";
import Masthead from "components/shared/Masthead";
import PortfolioApi from "lib/api/portfolios";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import { useMutate } from "restful-react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);

  // UPLOAD IMAGE
  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "http://localhost:3001/api/v1/portfolios/image-upload",
  });

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    uploadImage(formData)
      .then((uploadedImage) => {
        console.log(uploadedImage);
        setImages([...images, uploadedImage]);
      })
      .catch((_) => {
        console.log("oops, smth went wrong");
      });
  };

  const displayImages = () =>
    images.map((image) => (
      <div key={image.cloudinaryId} className="col-md-3">
        <a className="d-block mb-4 h-100" target="_blank" href={image.url}>
          <img className="imf-fluid img-thumbnail" src={image.url} />
        </a>
      </div>
    ));

  return (
    <BaseLayout navClass="transparent">
      <Masthead imagePath={"/images/home-bg.jpg"}>
        <h1>Upload Images</h1>
        {/* <span className="subheading">Let's write some nice blog today </span> */}
      </Masthead>

      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <input
              onChange={handleChange}
              accept=".jpg, .png, .jpeg"
              className="file-input mb-2"
              type="file"
            />
            <div>
              <button
                disabled={!selectedImage}
                onClick={handleImageUpload}
                className="btn btn-primary mb-2"
              >
                Upload
              </button>
            </div>
          </Col>
        </Row>
        <Row>{images ? displayImages() : "Please upload images"}</Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Upload;
