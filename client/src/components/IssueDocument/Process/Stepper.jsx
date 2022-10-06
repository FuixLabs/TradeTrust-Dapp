// * MUI libraries
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

import { useSelector } from 'react-redux';

export const CREATE_STEPS = [
  {
    id: 1,
    label: 'Choose Document Type to Issue',
  },
  {
    id: 2,
    label: 'Fill and Preview Form',
  },
  {
    id: 3,
    label: 'Issue Document(s)',
  },
];

export const REVOKE_STEPS = [
  {
    id: 1,
    label: 'Upload Document',
  },
  {
    id: 2,
    label: 'Confirm Revoke',
  },
  {
    id: 3,
    label: 'Revoke Document',
  },
];

export default function Steppers({ classes, type }) {
  const { step } = useSelector((state) => state.fileReducer);
  const theme = useTheme();
  const mdBreakpoints = useMediaQuery(theme.breakpoints.up('lg'));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState, index }) => ({
    backgroundColor: index < step ? theme.palette.primary.main : theme.palette.grey[200],
    zIndex: 1,
    color: '#000',
    width: mdBreakpoints ? 24 : 40,
    height: mdBreakpoints ? 24 : 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    marginTop: 5,
    ...(ownerState.active && {
      background: `${theme.palette.primary.main} 0% 0% no-repeat padding-box`,
      color: 'white',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    const stickIcon = icon < step ? <CheckIcon sx={{ height: 15, width: 12, color: 'white' }} /> : icon;
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className} index={icon}>
        {stickIcon}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <div className={classes.stepperContainer}>
      <span className={'bold ' + classes.grayTxt}>{type === 'Revoke' ? '3 STEPS TO REVOKE DOCUMENT' : '3 STEPS TO ISSUE DOCUMENT'}</span>
      <Stepper
        alternativeLabel={mdBreakpoints ? false : true}
        activeStep={step - 1}
        connector={<StepConnector className={classes.customStepConnector}></StepConnector>}
        orientation={mdBreakpoints ? 'vertical' : 'horizontal'}
        className={classes.customConnectorRoot}
      >
        {type === 'Create' &&
          CREATE_STEPS.map((item, index) => (
            <Step key={index}>
              <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>
                {item.label}
              </StepLabel>
            </Step>
          ))}
        {type === 'Revoke' &&
          REVOKE_STEPS.map((item, index) => (
            <Step key={index}>
              <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}>
                {item.label}
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </div>
  );
}
