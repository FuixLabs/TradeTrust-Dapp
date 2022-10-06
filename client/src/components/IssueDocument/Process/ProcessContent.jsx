import React, { useState } from 'react';

// * Redux libraries
import { useSelector, useDispatch } from 'react-redux';
import { onStepChange, onIssueTypeChange, resetFile } from '../../../redux/slices/file';
import {
  updateSuccessDocument,
  resetDocuments,
  onChangeUpdatedDocument,
  updateFetching,
} from '../../../redux/slices/document';
import { alertActions } from '../../../redux/slices/alert';
import {
  onCurrentDocumentChange,
  fillDocument,
  onCurrentUpdatedDocumentChange,
  resetTransactions,
} from '../../../redux/slices/document';
import { ALERT_CONSTANTS } from 'redux/constants/alert.msg';

// * Documentor libraries
import { createDocument } from 'fuixlabs-documentor';

// * Utilities libraries
import { exportTTFile } from 'utils/utils';
import { unsalt } from 'utils/data';
import { _pullTransactions } from 'utils/transaction';

// * Custom components
import { CreateStep1, CreateStep2, CreateStep3 } from './StepContent/Create';

// * Constants libraries

const DOCUMENT_TYPE = ['Bill of Landing', 'Cover Letter', 'OpenCerts Certificate of Award'];

export default function ProcessContent(props) {
  const { step, issueType, configFile } = useSelector((state) => state.fileReducer);
  const { usedAddress, currWallet } = useSelector((state) => state.walletReducer);
  const { currDocuments, successDocuments, updateDocument } = useSelector((state) => state.documentReducer);
  const { classes, update } = props;

  const [issueLoading, setIssueLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [selectedDocument, setSelectedDocument] = useState(currDocuments[0]?.name);
  const dispatch = useDispatch();

  const handleForwardStep = () => {
    if (!issueType) dispatch(alertActions.showErrorNotification(ALERT_CONSTANTS.ERROR.missingIssueType));
    else if (step !== 3) dispatch(onStepChange(step + 1));
  };

  const handlePreviousStep = () => {
    if (step !== 1) dispatch(onStepChange(step - 1));
  };

  const handleIssueTypeClick = (_type) => {
    return () => {
      if (_type === issueType) dispatch(onIssueTypeChange(null));
      else dispatch(onIssueTypeChange(_type));
    };
  };

  const handleUploadNewConfig = () => {
    dispatch(resetFile());
    dispatch(resetDocuments());
  };

  const handleExportWrappedDocument = (document) => {
    const downloadableFileName = unsalt(document.data.fileName);
    return () => exportTTFile(document, downloadableFileName);
  };

  const handleCreateDocument = async (documents, ) => {
    setIssueLoading(true);
    try {
      const { wrappedDocument } = await createDocument(currWallet, documents, usedAddress, update, updateDocument);
      const doc = wrappedDocument;
      setIssueLoading(false);
      dispatch(updateSuccessDocument(doc));
      handleForwardStep();
      dispatch(alertActions.createDocumentSuccessfully());
      dispatch(resetTransactions());
      dispatch(updateFetching(true));
      await _pullTransactions(usedAddress, dispatch);
      dispatch(updateFetching(false));
    } catch (e) {
      console.error(e);
      setIssueLoading(false);
      dispatch(alertActions.showErrorNotification(e));
    }
  };

  const handleOnTextChange = (e, index, prop, formIndex = null) => {
    const value = e.target.value;
    update
      ? dispatch(onCurrentUpdatedDocumentChange({ prop, data: value, formIndex }))
      : dispatch(
          onCurrentDocumentChange({
            index,
            prop,
            data: value,
            formIndex,
          })
        );
  };

  const handleFillForm = (index, data) => {
    if (update) {
      dispatch(onChangeUpdatedDocument({ data }));
      return;
    }
    dispatch(fillDocument({ index, data }));
  };

  const CreateContents = [
    {
      step: 1,
      content: () => (
        <CreateStep1
          classes={classes}
          handleUploadNewConfig={handleUploadNewConfig}
          handleForwardStep={handleForwardStep}
          handleIssueTypeClick={handleIssueTypeClick}
          DOCUMENT_TYPE={DOCUMENT_TYPE}
          issueType={issueType}
        />
      ),
    },
    {
      step: 2,
      content: () => (
        <CreateStep2
          classes={classes}
          handlePreviousStep={handlePreviousStep}
          issueLoading={issueLoading}
          handleCreateDocument={handleCreateDocument}
          update={update}
          updateDocument={updateDocument}
          currDocuments={currDocuments}
          handleOnTextChange={handleOnTextChange}
          handleFillForm={handleFillForm}
          attachments={!update ? configFile.forms[0].attachments : false}
        />
      ),
    },
    {
      step: 3,
      content: () => (
        <CreateStep3
          classes={classes}
          handleUploadNewConfig={handleUploadNewConfig}
          successDocuments={successDocuments}
          handleExportWrappedDocument={handleExportWrappedDocument}
        />
      ),
    },
  ];

  return <div>{CreateContents.find((stepper) => stepper.step === step).content()}</div>;
}
