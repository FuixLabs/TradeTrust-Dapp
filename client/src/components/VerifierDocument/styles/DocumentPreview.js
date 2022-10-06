import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 40,
    width: '100%',
    marginLeft: -100,
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
    },
  },
  transactionInforContainer: {
    boxShadow: `0px 3px 6px #0000001A`,
    width: '80%',
    borderTop: `solid 5px ${theme.palette.primary.main}`,
    borderRadius: 8,
    boxSizing: 'border-box',
    padding: '40px 40px 30px 40px',
    backgroundColor: theme.palette.primary.white,
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  utilsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
  },
  utilBtn: {
    padding: '10px 15px !important',
    marginLeft: '15px !important',
    color: theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: theme.palette.buttonColor.secondary,
    fontWeight: 'bold',
    border: `solid 1px ${theme.palette.buttonColor.secondary}`,
    fontSize: 14,
    [theme.breakpoints.up('lg')]: {
      fontSize: '12px !important'
    }
  },
  utilDiv: {
    color: theme.palette.primary.main,
    borderRadius: 8,
    backgroundColor: theme.palette.buttonColor.secondary,
    padding: '10px 15px',
    fontWeight: 'bold',
    border: `solid 1px ${theme.palette.buttonColor.secondary}`,
    fontSize: 10,
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
      width: 'fit-content'
    }
  },
  previewImageContainer: {
    boxShadow: `0px 3px 6px #0000001A`,
    marginTop: 20,
    width: '80%',
    backgroundColor: theme.palette.primary.white,
    padding: 34,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  companyTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    alignSelf: 'center',
  },
  issuerTxt: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 20,
    whiteSpace: 'nowrap',
    width: 300,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.between('lg', 'xl')]: {
      width: 300,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14
    }
  },
  inforContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 30,
    paddingRight: 100,
    [theme.breakpoints.up('lg')]: {
      paddingRight: 0
    }
  },
  inforTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('lg')]: {
      fontSize: 12
    }
  },
  surrenderTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.primary.error,
  },
  inforTxt: {
    fontSize: 16,
    marginTop: 10,
    whiteSpace: 'nowrap',
    width: 170,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '.MuiTooltip-tooltip': {
      backgroundColor: 'red'
    },
    [theme.breakpoints.up('lg')]: {
      width: 210,
      fontSize: 12
    }
  },
  previewHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  docPreviewImg: {
    alignSelf: 'center',
  },
  funtionalBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '12%',
  },
  funtionalBtn: {
    height: '25px !important',
    width: '25px !important',
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      height: '20px !important',
      width: '20px !important',
    }
  },
  formController: {
    width: 180,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px !important'
  },
  formContainer: {
    marginLeft: 18,
  },
  rightTxt: {
    marginTop: 5
  },
  issuerTooltipTxt: {
    fontSize: 12,
  },
  contentCopyIcon: {
    marginLeft: 15,
    cursor: 'pointer',
    height: '20px !important',
  }
}));

export default styles;
