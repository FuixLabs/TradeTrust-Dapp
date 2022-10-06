import React from 'react';

// * Custom components
import DragRevokeDocument from 'components/DragDocument/DragRevokeDocument';

// * Redux libraries
import { onChangeRevokedDocument } from 'redux/slices/document';
import { useDispatch } from 'react-redux';

export default function RevokeStep1() {
  const dispatch = useDispatch();

  const handleUpdateRevokeDocument = (document) => {
    dispatch(onChangeRevokedDocument(document));
  };

  return <DragRevokeDocument type="Revoke" setFile={handleUpdateRevokeDocument} />;
}
