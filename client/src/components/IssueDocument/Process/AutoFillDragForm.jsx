import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function AutoFillDragForm(props) {
  const { classes, loading, handleUploadFile, handleFillSchemma } = props;

  return (
    <div className={classes.dragSchemaForm}>
      <span onClick={handleFillSchemma} className={classes.getSchemaTxt}>
        Download Data Schema
        <KeyboardArrowDownIcon />
      </span>
      {loading ? (
        <Box className={classes.loadingStateContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <UploadFileIcon className={classes.uploadFileIcon} />
          <span>You can either upload data file(.JSON) to pre-fill fields on this</span>
          <span>form or enter the fields manually</span>
          <button onClick={handleUploadFile} className={classes.uploadFileBtn}>
            Update Data File
          </button>
        </>
      )}
    </div>
  );
}
