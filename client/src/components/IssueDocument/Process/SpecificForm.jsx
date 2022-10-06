import React from 'react';

// * Constants libraries
import { EXCEPTION_EDITED_PROPERTIES } from '../../../constants/property';
import { FORMS_LABEL } from '../../../constants/form';

export default function SpecificForm(props) {
  const { document, label, classes } = props;
  const forms = [];
  for (const field in document.data) {
    if (!EXCEPTION_EDITED_PROPERTIES.find((item) => item === field)) {
      forms.push(document.data[field]);
    }
  }
  return (
    <div className="flexColumn">
      <span className={classes.formLabel}>{FORMS_LABEL[label]}</span>
      {forms.map((form, index) => (
        <React.Fragment key={index}>{form}</React.Fragment>
      ))}
    </div>
  );
}
