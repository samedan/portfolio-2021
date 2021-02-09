import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutate } from "restful-react";
import { data } from "data";

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: initialData,
  });
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // UPLOAD IMAGE
  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "http://localhost:3001/api/v1/portfolios/image-upload",
  });

  useEffect(() => {
    register({ name: "startDate" });
    register({ name: "images" });
    register({ name: "endDate" });
  }, [register, images]);

  useEffect(() => {
    const { startDate, endDate } = initialData;
    if (startDate) {
      setStartDate(new Date(startDate));
    }
    if (endDate) {
      setEndDate(new Date(endDate));
    }
    if (images) {
      setValue("images", images);
    }
  }, [initialData]);

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(dateType, date);

    setDate(date);
  };

  // const onSubmit = (data) => {
  //   console.log(data);

  //   // data["images"] = [images];
  // };

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);

    uploadImage(formData)
      .then((uploadedImage) => {
        console.log(uploadedImage);
        // data["images"] = [uploadedImage];
        setImages([...images, uploadedImage]);

        console.log("images", images);
        // setValue("images", images);
        // setValue("images", [uploadedImage]);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          ref={register}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          ref={register}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="images">Image upload:</label>
        <input
          name="images"
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
        {images ? displayImages() : "Please upload images"}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange("startDate", setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <DatePicker
            disabled={!endDate}
            showYearDropdown
            selected={endDate}
            onChange={handleDateChange("endDate", setEndDate)}
          />
        </div>
      </div>

      <div className="form-group">
        {endDate && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange("endDate", setEndDate)(null)}
          >
            No End Date
          </button>
        )}
        {!endDate && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() =>
              handleDateChange(
                "endDate",
                setEndDate
              )(
                new Date(
                  // remove any hour/minute of the day
                  new Date().setHours(0, 0, 0, 0)
                )
              )
            }
          >
            Set End Date
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PortfolioForm;
