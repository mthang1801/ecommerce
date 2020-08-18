import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  FormInline,
  FormGroup,
  Label,
  Input,
  Required,
  Select,
  Option,
} from "./register-form.styles";
import AppContext from "../../../context/app-viewport.context";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { getListCities, getListDistricts } from "../../../utils/algorithms";
import Loader from "../../UI/loader/loader.component";
const RegisterForm = ({ user }) => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [payMethod, setPayMethod] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [listCities, setListCites] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState({
    ID: "",
    SolrID: "",
    Title: "",
  });
  const [selectedDist, setSelectedDist] = useState({
    ID: "",
    SolrID: "",
    Title: "",
  });
  const [error, setError] = useState(null);
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 660
  );
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 660) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 660) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);

  useEffect(() => {
    getListCities()
      .then((listCities) => {
        setListCites(listCities);
      })
      .catch((err) => {
        setError(err);
      });
  }, [getListCities]);

  const handleChangeCity = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    setSelectedCity({
      ID: e.target.value,
      SolrID: e.target.childNodes[index].dataset.url,
      Title: e.nativeEvent.target[index].text,
    });
    getListDistricts(e.target.value)
      .then((data) => {
        setListDistricts(data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChangeDistrict = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    setSelectedDist({
      ID: e.target.value,
      SolrID: e.target.childNodes[index].dataset.url,
      Title: e.nativeEvent.target[index].text,
    });
  };

  const handleChangeCardNumber = (e) => {
    setCardNumber(e.target.value);
  };
  const handleChangeExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };
  const handleChangeCVC = (e) => {
    setCvc(e.target.value);
  };
  return (
    <React.Fragment>
      <Form mobileView={mobileView} tabletView={tabletView}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <FormInline>
          <FormGroup>
            <Label htmlFor="first_name">
              Họ<Required>*</Required>
            </Label>
            <Input name="first_name" id="first_name" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="last_name">
              Tên<Required>*</Required>
            </Label>
            <Input name="last_name" id="last_name" />
          </FormGroup>
        </FormInline>
        <FormGroup>
          <Select defaultValue={selectedCity.ID} onChange={handleChangeCity}>
            <Option value={selectedCity.ID} disabled>
              --Chọn thành phố--
            </Option>
            {listCities.map((city) => (
              <Option key={city.ID} value={city.ID} data-url={city.SolrID}>
                {city.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Select
            defaultValue={selectedDist.ID}
            onChange={handleChangeDistrict}
          >
            <Option value={selectedDist.ID} disabled>
              --Chọn Quận/Huyện--
            </Option>
            {listDistricts.map((district) => (
              <Option key={district.ID} value={district.ID} data-url={district.SolrID}>
                {district.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input name="apartment" placeholder="Đường, Phường Xã, Số nhà" />
        </FormGroup>
        <FormInline>
          <FormGroup>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input name="phone1" id="phone1" />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" value={user.email} disabled />
          </FormGroup>
        </FormInline>
        <PaymentInputsWrapper {...wrapperProps}>
          <svg {...getCardImageProps({ images })} />
          <input
            {...getCardNumberProps({ onChange: handleChangeCardNumber })}
          />
          <input
            {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
          />
          <input {...getCVCProps({ onChange: handleChangeCVC })} />
        </PaymentInputsWrapper>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
export default connect(mapStateToProps)(RegisterForm);
