import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option,
  ListAPI,
  ItemAPI,
  Placeholder,
  SelectIcon,
  Editable,
} from "./styles/RegisterFormAsSeller.styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { FaChevronDown } from "react-icons/fa";
import {
  getListCities,
  getListDistricts,
  getListWards,
} from "../../utils/connectDB";
import { selectRegisterForm } from "../../redux/seller/seller.selectors";
import { FiEdit } from "react-icons/fi";
import { saveRegisterForm } from "../../redux/seller/seller.actions";
import { Scrollbars } from "react-custom-scrollbars";
const RegisterForm = ({ user, register, setDisabledNext, save, scroll }) => {
  const {
    address,
    disabledEmail,
    firstName,
    lastName,
    phone,
    email,
    selectedCity,
    selectedDist,
    selectedWard,
  } = register;

  useEffect(() => {
    if (user) {
      save({ email: user.email });
    }
  }, [user]);
  const [listCities, setListCites] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [error, setError] = useState(null);
  const [showListCities, setShowListCities] = useState(false);
  const [showListDistricts, setShowListDistricts] = useState(false);
  const [showListWards, setShowListWards] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
  }, [scroll]);

  useEffect(() => {
    let _mounted = true;
    getListCities()
      .then((listCities) => {
        if (_mounted) {
          setListCites([...listCities]);
        }
      })
      .catch((err) => {
        if (_mounted) {
          setError(err);
        }
      });
    return () => (_mounted = false);
  }, []);

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      selectedCity.Title &&
      selectedDist.Title &&
      selectedWard.Title &&
      address &&
      phone &&
      email
    ) {
      setDisabledNext(false);
    } else {
      setDisabledNext(true);
    }
  }, [
    firstName,
    lastName,
    selectedCity,
    selectedDist,
    selectedWard,
    address,
    phone,
    email,
  ]);

  const handleChangeCity = (SolrID, ID, Title) => {
    console.log(SolrID, ID, Title);
    save({
      selectedCity: {
        ID,
        SolrID,
        Title,
      },
    });
    save({ selectedDist: { ID: "", SolrID: "", Title: "" } });
    save({
      selectedWard: {
        ID: "",
        SolrID: "",
        Title: "",
      },
    });

    setListWards([]);
    getListDistricts(ID)
      .then((data) => {
        setListDistricts([...data]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChangeDistrict = (SolrID, ID, Title) => {
    save({ selectedWard: { ID: "", SolrID: "", Title: "" } });
    save({
      selectedDist: {
        ID,
        SolrID,
        Title,
      },
    });
    getListWards(ID)
      .then((data) => setListWards([...data]))
      .catch((err) => setError(err));
  };
  const handleChangeWard = (SolrID, ID, Title) => {
    save({
      selectedWard: {
        ID,
        SolrID,
        Title,
      },
    });
  };

  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    save({ [name]: value });
  };

  return (
    <Form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <FormInline>
        <FormGroup>
          <Label htmlFor="first_name">
            <Required>Họ*</Required>
          </Label>
          <Input
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="last_name">
            <Required>Tên*</Required>
          </Label>
          <Input
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChangeInput}
          />
        </FormGroup>
      </FormInline>
      <FormGroup
        style={{zIndex : showListCities ? 10 : 1}}
        onClick={() => setShowListCities((prevState) => !prevState)}
      >
        <Label>Thành phố</Label>
        <Select>
          {selectedCity.ID ? (
            <span>{selectedCity.Title}</span>
          ) : (
            <Placeholder>Thành phố</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListCities}>
            {listCities.map((city) => (
              <ItemAPI
                key={city.SolrID}
                onClick={() =>
                  handleChangeCity(city.SolrID, city.ID, city.Title)
                }
              >
                {city.Title}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      <FormGroup
        style={{zIndex : showListDistricts ? 11 : 1}}
        onClick={() => setShowListDistricts((prevState) => !prevState)}
      >
        <Label>Quận/Huyện</Label>
        <Select>
          {selectedDist.ID ? (
            <span>{selectedDist.Title}</span>
          ) : (
            <Placeholder>Quận huyện</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListDistricts}>
            {listDistricts.map((dist) => (
              <ItemAPI
                key={dist.SolrID}
                onClick={() =>
                  handleChangeDistrict(dist.SolrID, dist.ID, dist.Title)
                }
              >
                {dist.Title}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>
      <FormGroup
        style={{zIndex : showListWards ? 12 : 1}}
        onClick={() => setShowListWards((prevState) => !prevState)}
      >
        <Label>Phường/Xã</Label>
        <Select>
          {selectedWard.ID ? (
            <span>{selectedWard.Title}</span>
          ) : (
            <Placeholder>Phường xã</Placeholder>
          )}
          <SelectIcon>
            <FaChevronDown />
          </SelectIcon>

          <ListAPI show={showListWards}>
            {listWards.map((ward) => (
              <ItemAPI
                key={ward.SolrID}
                onClick={() =>
                  handleChangeWard(ward.SolrID, ward.ID, ward.Title)
                }
              >
                {ward.Title}
              </ItemAPI>
            ))}
          </ListAPI>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="address">
          <Required>Đường, số nhà</Required>
        </Label>
        <Input
          id="address"
          name="address"
          value={address}
          onChange={onChangeInput}
        />
      </FormGroup>
      <FormInline>
        <FormGroup>
          <Label htmlFor="phone">
            <Required>Số điện thoại*</Required>
          </Label>
          <Input
            name="phone"
            id="phone"
            value={phone}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">
            <Required>Email*</Required>
          </Label>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={onChangeInput}
            disabled={disabledEmail}
          />
          <Editable onClick={() => save({ disabledEmail: !disabledEmail })}>
            <FiEdit />
          </Editable>
        </FormGroup>
      </FormInline>
    </Form>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  register: selectRegisterForm,
});
const mapDispatchToProps = (dispatch) => ({
  save: (obj) => dispatch(saveRegisterForm(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
