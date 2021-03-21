import React, { useState, useRef, useEffect } from "react";
import {
  SteppersContainer,
  StepperContent,
  EndStep,
  WrapperContent
} from "./styles/Steppers.styles";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import FormRegisterAsSeller from "./FormRegisterAsSeller";
import PaymentForm from "./PaymentForm";
import FormComplete from "./form-complete/form-complete.component";
import TermsAndPrivacy from "./terms-and-privacy/term-and-privacy.component";
import FormCreateProduct from "../Product/form-create-product/form-create-product.component";
import { connect } from "react-redux";
import useLanguage from "../Global/useLanguage";
import {
  selectCreateProductForm,
  selectRegisterForm,
} from "../../redux/seller/seller.selectors";
import { createStructuredSelector } from "reselect";
import { registerAsSeller, createNewProduct } from "../../utils/connectDB";

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

function getSteps(seller) {
  return [
    seller.regsiterAsSeller,
    seller.registerPayment,
    seller.termsAndPolicies,
  ];
}

function getStepContent(stepIndex, disabledNext, setDisabledNext, scroll) {
  switch (stepIndex) {
    case 0:
      return (
        <FormRegisterAsSeller
          scroll={scroll}
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );
    case 1:
      return (
        <PaymentForm
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );
    case 2:
      return (
        <TermsAndPrivacy
          scroll={scroll}
          disabledNext={disabledNext}
          setDisabledNext={setDisabledNext}
        />
      );

    default:
      return "Unknown stepIndex";
  }
}

const Steppers = ({ register, product }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [disabledNext, setDisabledNext] = useState(true);
  const [success, setSuccess] = useState(false);
  const [scroll, setScroll] = useState(0);
  const { i18n, lang } = useLanguage();
  const { seller } = i18n.store.data[lang].translation;
  const steps = getSteps(seller);
  const stepRef = useRef(null);

  useEffect(() => {
    if (stepRef.current) {
      setScroll(stepRef.current.offsetTop);
    }
  }, [stepRef]);
  const handleNext = async () => {
    
    if (activeStep === steps.length - 1) {
      try {        
        await registerAsSeller(register);
        // await createNewProduct(product);
        setSuccess(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        setSuccess(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <SteppersContainer>
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
              <FormComplete success={success} scroll={scroll} />
            </EndStep>
          ) : (
            <WrapperContent>
              <StepperContent>
                {getStepContent(
                  activeStep,
                  disabledNext,
                  setDisabledNext,
                  scroll
                )}
              </StepperContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem auto",
                  maxWidth : "600px"
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                  color="secondary"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={disabledNext}
                >
                  {activeStep === steps.length - 1 ? "Hoàn tất" : "Tiếp theo"}
                </Button>
              </div>
            </WrapperContent>
          )}
        </div>
      </div>
    </SteppersContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCreateProductForm,
  register: selectRegisterForm,
});

export default connect(mapStateToProps)(Steppers);
