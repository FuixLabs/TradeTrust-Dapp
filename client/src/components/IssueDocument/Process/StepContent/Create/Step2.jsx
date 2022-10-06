import React, { useState } from 'react';

// * Custom components
import DocumentDetail from '../../DocumentDetail';
import CreationProgress from './CreationProgress/CreationProgress.jsx';

// * MUI libraries
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Zoom from '@mui/material/Zoom';

// * Utilities libraries
import { unsalt } from 'utils/data';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';

export default function CreateStep2(props) {
  const {
    classes,
    handlePreviousStep,
    issueLoading,
    handleCreateDocument,
    update,
    updateDocument,
    currDocuments,
    handleOnTextChange,
    handleFillForm,
    attachments,
  } = props;
  const [bottomScroll, setBottomScroll] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(currDocuments[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [privateFields, setPrivateFields] = useState([]);
  const {configFile} = useSelector(state => state.fileReducer);

  const handleChange = (e) => {
    const tmpDocument = currDocuments.find((item, index) => index === e.target.value);
    setCurrentDocument(tmpDocument);
    setCurrentIndex(e.target.value);
  };

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  window.onscroll = function (ev) {
    setBottomScroll(false);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setBottomScroll(true);
    }
  };

  return (
    <>
      <div className={classes.modifyDocInforContainer}>
        <div className={classes.uploadConfigDiv}>
          <Box className="flexRowCenter">
            <button onClick={handlePreviousStep} className={classes.backBtn}>
              <ArrowBackIcon sx={{ width: 16, height: 16, marginRight: 1 }} />
              Back
            </button>
          </Box>
          {issueLoading ? (
            <LoadingButton loading={issueLoading} variant="contained" className={classes.issueBtn}>
              Issue Document(s)
            </LoadingButton>
          ) : (
            <button
              className={classes.issueBtn}
              onClick={() => handleCreateDocument(update ? [...[], updateDocument.data] : currDocuments, privateFields)}
            >
              Issue Document(s)
            </button>
          )}
        </div>
        <div className={classes.choosenTypeDiv}>
          <span className={classes.bigBoldTxt}>
            Fill and Preview Form
            <span className={classes.quantityTxt}>{update ? 1 : currDocuments.length} Document(s)</span>
          </span>
          <div className={classes.modifyDocsDiv}>
            <FormControl className={classes.formControle}>
              <TextField
                id="outlined-name"
                label="Document Title"
                value={update ? unsalt(updateDocument.data.title) : currDocuments[0].title}
                onChange={handleChange}
                disabled={true}
                inputProps={{
                  style: {
                    fontSize: 14
                  },
                }}
              />
            </FormControl>
            {currDocuments?.length > 1 && (
              <>
                <FormControl className={classes.formControle}>
                  <InputLabel id="select-label">Document Type</InputLabel>
                  <Select
                    labelId="select-label"
                    value={update ? updateDocument.data.title : currentDocument.title}
                    label="Document type"
                    onChange={handleChange}
                  >
                    {currDocuments.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <button className={classes.addBtn + ' ' + classes.modifyBtn}>
                  <NoteAddIcon className={classes.noteAddIcon} />
                  <span>Add new</span>
                </button>
                <button className={classes.deleteBtn + ' ' + classes.modifyBtn}>
                  <DeleteForeverIcon className={classes.deleteIcon} />
                  <span>Delete all</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {issueLoading && <CreationProgress issueLoading={issueLoading} />}
      <DocumentDetail
        issueLoading={issueLoading}
        privateFields={privateFields}
        setPrivateFields={setPrivateFields}
        classes={classes}
        document={update ? updateDocument.data : currDocuments[currentIndex]}
        index={currentIndex}
        handleOnTextChange={handleOnTextChange}
        handleFillForm={handleFillForm}
        update={update}
        attachments={attachments}
      />
      {bottomScroll && (
        <Zoom in={true} style={{ transitionDelay: '30ms' }}>
          <button onClick={handleScrollTop} className={classes.scrollBtn} variant="contained">
            <KeyboardDoubleArrowUpIcon />
          </button>
        </Zoom>
      )}
    </>
  );
}
