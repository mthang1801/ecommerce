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
  Editable,
} from "./register-form.styles";
import AppContext from "../../../context/app-viewport.context";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import {
  getListCities,
  getListDistricts,
  getListWards,
} from "../../../utils/connectDB";
import { selectRegisterForm } from "../../../redux/seller/seller.selectors";
import { FiEdit } from "react-icons/fi";
import { saveRegisterForm } from "../../../redux/seller/seller.actions";
const RegisterForm = ({ user, register, setDisabledNext, save, scroll }) => {
  const {
    address,
    cardNumber,
    cvc,
    disabledEmail,
    expiryDate,
    firstName,
    lastName,
    phone,
    email,
    selectedCity,
    selectedDist,
    selectedWard,
  } = register;
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  useEffect(() => {
    if (user) {
      save({ email: user.email });
    }
  }, [user]);
  const [listCities, setListCites] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);
 
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  
  const [error, setError] = useState(null);
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 660
  );
  const formRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: scroll,
      behavior: "smooth",
    });
  }, [scroll]);
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
    let _mounted = true;
    getListCities()
      .then((listCities) => {
        if (_mounted) {
          setListCites([
            { ID: "", Title: "Chọn thành phố", status: "disabled" },
            ...listCities,
          ]);
        }
      })
      .catch((err) => {
        if (_mounted) {
          setError(err);
        }
      });
    return () => (_mounted = false);
  }, [getListCities]);

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      selectedCity &&
      selectedDist &&
      selectedWard &&
      address &&
      phone &&
      email &&
      cardNumber &&
      expiryDate &&
      cvc
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
    cardNumber,
    expiryDate,
    cvc,
  ]);

  const handleChangeCity = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    save({
      selectedCity: {
        ID: e.target.value,
        SolrID: e.target.childNodes[index].dataset.url,
        Title: e.nativeEvent.target[index].text,
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
    getListDistricts(e.target.value)
      .then((data) => {
        setListDistricts([
          { ID: "", Title: "Chọn Quận Huyện", status: "disabled" },
          ...data,
        ]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChangeDistrict = (e) => {
    const index = e.nativeEvent.target.selectedIndex;

    save({ selectedWard: { ID: "", SolrID: "", Title: "" } });
    save({
      selectedDist: {
        ID: e.target.value,
        SolrID: e.target.childNodes[index].dataset.url,
        Title: e.nativeEvent.target[index].text,
      },
    });
    getListWards(e.target.value)
      .then((data) =>
        setListWards([
          { ID: "", Title: "Chọn Phường, Xã", status: "disabled" },
          ...data,
        ])
      )
      .catch((err) => setError(err));
  };
  const handleChangeWard = (e) => {
    const index = e.nativeEvent.target.selectedIndex;   
    save({
      selectedWard: {
        ID: e.target.value,
        SolrID: e.target.childNodes[index].dataset.url,
        Title: e.nativeEvent.target[index].text,
      },
    });
  };

  const handleChangeCardNumber = (e) => {   
    save({ cardNumber: e.target.value });
  };
  const handleChangeExpiryDate = (e) => {        
    save({ expiryDate: e.target.value });
  };
  const handleChangeCVC = (e) => {  
    save({ cvc: e.target.value });
  };
  return (
    <React.Fragment>
      <Form mobileView={mobileView} tabletView={tabletView}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <FormInline>
          <FormGroup>
            <Label htmlFor="first_name">
              <Required>Họ*</Required>
            </Label>
            <Input
              name="first_name"
              id="first_name"
              value={firstName}
              onChange={(e) => {
                save({ firstName: e.target.value });                
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="last_name">
              <Required>Tên*</Required>
            </Label>
            <Input
              name="last_name"
              id="last_name"
              value={lastName}
              onChange={(e) => {
                save({ lastName: e.target.value });               
              }}
            />
          </FormGroup>
        </FormInline>
        <FormGroup>
          <Label>Thành phố</Label>
          <Select valie={selectedCity.ID} onChange={handleChangeCity}>
            {listCities.map((city) => (
              <Option key={city.ID} value={city.ID} data-url={city.SolrID}>
                {city.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Quận/Huyện</Label>
          <Select value={selectedDist.ID} onChange={handleChangeDistrict}>
            {listDistricts.map((district) => (
              <Option
                key={district.ID}
                value={district.ID}
                data-url={district.SolrID}
              >
                {district.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Phường/Xã</Label>
          <Select value={selectedWard.ID} onChange={handleChangeWard}>
            {listWards.map((ward) => (
              <Option key={ward.ID} value={ward.ID} data-url={ward.SolrID}>
                {ward.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">
            <Required>Đường, số nhà</Required>
          </Label>
          <Input
            id="address"
            name="apartment"
            value={address}
            onChange={(e) => {
              save({ address: e.target.value });              
            }}
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
              onChange={(e) => {
                save({ phone: e.target.value });               
              }}
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
              onChange={(e) => {
                save({ email: e.target.value || email });               
              }}
              disabled={disabledEmail}
            />
            <Editable onClick={() => save({disabledEmail : !disabledEmail})} >
              <FiEdit />
            </Editable>
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
  register: selectRegisterForm,
});
const mapDispatchToProps = (dispatch) => ({
  save: (obj) => dispatch(saveRegisterForm(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
