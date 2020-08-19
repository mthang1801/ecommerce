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
  Editable
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
} from "../../../utils/algorithms";
import {FiEdit} from "react-icons/fi"
const RegisterForm = ({ user, disabledNext, setDisabledNext }) => {  
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
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [listCities, setListCites] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email);
  const [disabledEmail, setDisabledEmail] = useState(true);
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
  const [selectedWard, setSelectedWard] = useState({
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
    let _mounted = true ;
    getListCities()
      .then((listCities) => {
        if(_mounted){
          setListCites(listCities);
        }       
      })
      .catch((err) => {
        if(_mounted){
          setError(err);
        }       
      });
      return () => _mounted = false;
  }, []);

  useEffect( () => {   
    if(firstName&&lastName&&selectedCity&& selectedDist&& selectedWard&& address&& phone&& email&& cardNumber&& expiryDate&& cvc ){
      setDisabledNext(false)
    }else{
      setDisabledNext(true);
    }
  },[firstName,lastName,selectedCity, selectedDist, selectedWard, address, phone, email, cardNumber, expiryDate, cvc])

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
    getListWards(e.target.value)
      .then((data) => setListWards(data))
      .catch((err) => setError(err));
  };
  const handleChangeWard = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    setSelectedWard({
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
            <Required>Họ*</Required>
            </Label>
            <Input name="first_name" id="first_name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="last_name">
              <Required>Tên*</Required>
            </Label>
            <Input name="last_name" id="last_name" value={lastName} onChange={e => setLastName(e.target.value)}/>
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
          <Select
            defaultValue={selectedWard.ID}
            onChange={handleChangeWard}
          >
            <Option value={selectedWard.ID} disabled>
              --Chọn Phường/Xã--
            </Option>
            {listWards.map((ward) => (
              <Option
                key={ward.ID}
                value={ward.ID}
                data-url={ward.SolrID}
              >
                {ward.Title}
              </Option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input name="apartment" placeholder="Đường, Số nhà" value={address} onChange={e => setAddress(e.target.value)}/>
        </FormGroup>
        <FormInline>
          <FormGroup>
            <Label htmlFor="phone"><Required>Số điện thoại*</Required></Label>
            <Input name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label><Required>Email*</Required></Label>
            <Input name="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabledEmail} />
            <Editable onClick={() => setDisabledEmail(!disabledEmail)}><FiEdit/></Editable>
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
  user : selectCurrentUser
})
export default connect(mapStateToProps)(RegisterForm);
