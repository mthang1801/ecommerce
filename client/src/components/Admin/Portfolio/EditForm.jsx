import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FormGroup,
  Input,
  Title,
  Label,
  Error,
} from "../../Custom/styles/CustomFormAdmin.styles";
import Button from "@material-ui/core/Button";
import {
  EditFormWrapper,
  FormWrapper,
  DisplayImage,
  Image,
} from "./styles/EditForm.styles";
import Backdrop from "../../UI/Backdrop";
import { generateBase64Image } from "../../../utils/image";
import { connect } from "react-redux";
import { editAdminPortfolio } from "../../../redux/admin-portfolio/admin-portfolio.actions";
import removeVietnameseTones from "../../../utils/removeVietnameseTones";
const EditForm = ({ edit, setEdit, editPortfolio }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const formRef = useRef(null);
  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setSlug(edit.slug);
      setImage(edit.image);
    }
  }, [edit]);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  const postInputChangeHandler = (e) => {
    const fileData = e.target.files[0];
    console.log(fileData);
    setImage(fileData);
    generateBase64Image(fileData)
      .then((res) => setImageBase64(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    function trackUserClickForm(e) {
      if (
        formRef.current &&
        !formRef.current.contains(e.target) &&
        Object.keys(edit).length
      ) {
        setEdit({});
      }
    }
    window.addEventListener("click", trackUserClickForm);
    return () => window.removeEventListener("click", trackUserClickForm);
  }, [formRef, edit]);

  const onChangePortfolioName = (e) => {
    const { value } = e.target;
    const newSlug = removeVietnameseTones(value).replace(/[^a-zA-Z0-9]+/g, "-");
    setName(value);
    setSlug(newSlug);
  };

  useEffect(() => {
    if (name === edit.name && slug === edit.slug && !imageBase64) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [name, slug,imageBase64]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setError(null);
    if (!name || name.length < 3 || !slug || !image) {
      setError("You must fill all fields and name at least 3 characters");
      return;
    }
    let formData = new FormData();
    formData.append("_id", edit._id);
    formData.append("image", image);
    formData.append("name", name);
    formData.append("slug", slug);
    editPortfolio(formData).then(res => {
      setEdit({});
    }).catch((error) => setError(error));
  };

  const showForm = Object.keys(edit).length > 0;

  return (
    <EditFormWrapper onSubmit={handleSubmitForm}>
      <Backdrop show={showForm} close={() => setEdit({})} />
      <FormWrapper show={showForm} ref={formRef}>
        <Form>
          <Title>Cập nhật Category</Title>
          {error && <Error>{error}</Error>}
          <FormGroup>
            <Label>Tên Portfolio</Label>
            <Input
              type="text"
              name="name"
              value={name || ""}
              onChange={onChangePortfolioName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Liên kết</Label>
            <Input type="text" name="slug" value={slug} disabled />
          </FormGroup>
          <FormGroup>
            <Label>Hình ảnh</Label>
            <Input
              type="file"
              name="edit-image"
              onChange={postInputChangeHandler}
            />
          </FormGroup>
          <Button variant="contained" color="primary" disabled={disabledButton} onClick={handleSubmitForm}>
            Cập nhật
          </Button>
        </Form>
        <DisplayImage>
          {imageBase64 ? (
            <Image src={imageBase64} />
          ) : image ? (
            <Image src={`data:${image.mimetype};base64,${image.data}`} />
          ) : null}
        </DisplayImage>
      </FormWrapper>
    </EditFormWrapper>
  );
};
const mapDispatchToProps = (dispatch) => ({
  editPortfolio: (data) => dispatch(editAdminPortfolio(data)),
});
export default connect(null, mapDispatchToProps)(EditForm);
