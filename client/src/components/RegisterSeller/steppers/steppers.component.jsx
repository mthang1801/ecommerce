import React, { useState, useRef, useEffect } from "react";
import { SteppersContainer, StepperContent, EndStep } from "./steppers.styles";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import RegisterForm from "../register-form/register-form.component";
import TermsAndPrivacy from "../terms-and-privacy/term-and-privacy.component";
import FormCreateProduct from "../form-create-product/form-create-product.component";
import { connect } from "react-redux";
import {
  selectCreateProductForm,
  selectRegisterForm,
} from "../../../redux/seller/seller.selectors";
import { createStructuredSelector } from "reselect";
import { registerAsSeller, createNewProduct } from "../../../utils/algorithms";
import FormComplete from "../form-complete/form-complete.component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Đăng ký kinh doanh",
    "Điều khoản và chính sách",
    "Đăng bán sản phẩm",
  ];
}

function getStepContent(stepIndex, disabledNext, setDisabledNext,scroll) {
  switch (stepIndex) {
    case 0:
      return (
        <RegisterForm
          scroll={scroll}
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );
    case 1:
      return (
        <TermsAndPrivacy
          scroll={scroll}
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );
    case 2:
      return (
        <FormCreateProduct
          scroll={scroll}
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );
    default:
      return "Unknown stepIndex";
  }
}

const Steppers = ({ mobileView, tabletView, register, product, clearAll }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [disabledNext, setDisabledNext] = useState(true);
  const [success, setSuccess] = useState(false);
  const [scroll, setScroll] = useState(0);
  const steps = getSteps();
  const stepRef = useRef(null);
  useEffect(() =>{
    setScroll(stepRef.current.offsetTop);
  },[stepRef.current.offsetTop])
  const handleNext = async () => {
    console.log("call");
    if (activeStep === steps.length - 1) {
      try {
        await registerAsSeller(register);
        await createNewProduct(product);
        setSuccess(true);
        console.log("done")
        setActiveStep((prevActiveStep) => prevActiveStep + 1);       
      } catch (error) {
        console.log("error");
        setSuccess(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }     
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  console.log(activeStep, steps.length)
  return (
    <SteppersContainer >
      <div className={classes.root}>
        <Stepper ref={stepRef} activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep >= steps.length ? (
            <EndStep>
              <FormComplete success={success} scroll={scroll}/>                          
            </EndStep>
          ) : (
            <div>
              <StepperContent>
                {getStepContent(activeStep, disabledNext, setDisabledNext, scroll)}
              </StepperContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem auto",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={disabledNext}
                >
                  {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SteppersContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  product : selectCreateProductForm,
  register : selectRegisterForm
})



export default connect(mapStateToProps)(Steppers);
