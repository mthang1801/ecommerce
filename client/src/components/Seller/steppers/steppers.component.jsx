import React from "react";
import { SteppersContainer, StepperContent } from "./steppers.styles";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisterForm from "../register-form/register-form.component";
import TermsAndPrivacy from "../terms-and-privacy/term-and-privacy.component";
import FormCreateProduct from "../../UI/form-create-product/form-create-product.component";
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

function getStepContent(stepIndex) { 
  
  switch (stepIndex) {
    case 0:
      return <RegisterForm />;
    case 1:
      return <TermsAndPrivacy />;
    case 2:
      return <FormCreateProduct/>;
    default:
      return "Unknown stepIndex";
  }
}

const Steppers = ({mobileView, tabletView}) => {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <SteppersContainer>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <StepperContent>
                {getStepContent(activeStep)}
              </StepperContent>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SteppersContainer>
  );
};

export default Steppers;
