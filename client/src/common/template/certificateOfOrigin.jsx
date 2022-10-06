/* eslint-disable no-mixed-operators */
import React from 'react';
import { Grid } from '@mui/material';
import styles from './styles/BillOfLanding';
import sampleSignature from 'assets/images/sampleSignature.png';
import sampleImage from 'assets/images/sampleImage.png';

// * MUI libraries
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// * Redux libraries
import { useSelector } from 'react-redux';

const formDetail = (form) => {
  const items = [];
  for (const i in form) {
    items.push({
      name: i,
      value: form[i],
    });
  }
  return items;
};

export default function CertificateOfOrigin(props) {
  const {
    historyReview,
    verifierPreview,
    preview,
    billInformation,
    printer,
    privateFields,
    setPrivateFields,
    didDoc,
    attachment,
  } = props;
  const { certification, shippingInformation, customInformation, declarationInformation, signature } = billInformation;
  const { usedAddress } = useSelector((state) => state.walletReducer);

  const handleUpdatePrivateField = (item) => {
    const currentKey = item[0];
    if (privateFields.includes(currentKey)) {
      let tmpArray = privateFields.filter((i) => i !== currentKey);
      setPrivateFields(tmpArray);
    } else {
      let tmpArray = [...privateFields];
      tmpArray.push(currentKey);
      setPrivateFields(tmpArray);
    }
  };

  const classes = styles();
  return (
    <>
      {billInformation ? (
        <div className={preview ? classes.previewModeContainer : classes.container + ' tableStyle'}>
          <Grid container className="flexRow titleStyle">
            {shippingInformation && (
              <Grid item xs={printer ? 6 : 12} md={6} className="rowItemStyle">
                <div className={classes.rowItem}>
                  <div className={classes.titleDiv}>
                    <div className={classes.titleTxt}>
                      {shippingInformation.title}{' '}
                      {didDoc &&
                        didDoc.controller &&
                        didDoc.controller.find((_address) => _address === usedAddress) &&
                        (preview || verifierPreview) && (
                          <div onClick={() => handleUpdatePrivateField(Object.keys({ shippingInformation }))}>
                            {(preview || verifierPreview) &&
                            privateFields.includes(Object.keys({ shippingInformation })[0]) ? (
                              <AddCircleIcon className={classes.removeIcon} sx={{ color: 'primary.success' }} />
                            ) : (
                              <RemoveCircleIcon className={classes.removeIcon} sx={{ color: 'primary.error' }} />
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  {((privateFields && !privateFields.includes(Object.keys({ shippingInformation })[0])) ||
                    printer ||
                    historyReview) &&
                    formDetail(shippingInformation).map((item, index) => (
                      <div key={index}>
                        {item.name}:&ensp;{item.value}
                      </div>
                    ))}
                </div>
              </Grid>
            )}
            {customInformation && (
              <Grid item xs={printer ? 6 : 12} md={6}>
                <div className={classes.rowItem}>
                  <div className={classes.titleDiv}>
                    <div className={classes.titleTxt}>
                      {customInformation.title}{' '}
                      {didDoc &&
                        didDoc.controller &&
                        didDoc.controller.find((_address) => _address === usedAddress) &&
                        (preview || verifierPreview) && (
                          <div onClick={() => handleUpdatePrivateField(Object.keys({ customInformation }))}>
                            {preview ||
                            (verifierPreview && privateFields.includes(Object.keys({ customInformation })[0])) ? (
                              <AddCircleIcon className={classes.removeIcon} sx={{ color: 'primary.success' }} />
                            ) : (
                              <RemoveCircleIcon className={classes.removeIcon} sx={{ color: 'primary.error' }} />
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  {((privateFields && !privateFields.includes(Object.keys({ customInformation })[0])) ||
                    printer ||
                    historyReview) &&
                    formDetail(customInformation).map((item, index) => (
                      <div key={index}>
                        {item.name}:&ensp;{item.value}
                      </div>
                    ))}
                </div>
              </Grid>
            )}
          </Grid>
          {declarationInformation && (
            <Grid className="titleStyle" container style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={classes.titleTxt + ' rowStyle'}>
                <div className={classes.rowItem}>
                  {declarationInformation.title}{' '}
                  {didDoc &&
                    didDoc.controller &&
                    didDoc.controller.find((_address) => _address === usedAddress) &&
                    (preview || verifierPreview) && (
                      <div onClick={() => handleUpdatePrivateField(Object.keys({ declarationInformation }))}>
                        {preview ||
                        (verifierPreview && privateFields.includes(Object.keys({ declarationInformation })[0])) ? (
                          <AddCircleIcon className={classes.removeIcon} sx={{ color: 'primary.success' }} />
                        ) : (
                          <RemoveCircleIcon className={classes.removeIcon} sx={{ color: 'primary.error' }} />
                        )}
                      </div>
                    )}
                </div>
              </div>
              {((privateFields && !privateFields.includes(Object.keys({ declarationInformation })[0])) ||
                printer ||
                historyReview) && (
                <>
                  <div className={classes.rowItem}>
                    <span style={{ display: 'block' }}>
                      I/We undertake that <br />
                      a. the goods indicated, when transhipped via Singapore, will not undergo operations beyond the
                      following: <br />
                      &ensp;i. ensuring the preservation of goods in good condition for the purpose of transport or
                      storage; <br />
                      &ensp;ii. facilitating shipment or transportation; and <br />
                      &ensp;iii. packaging or presenting goods for sale.
                      <br />
                      b. all the information provided is true and correct.
                    </span>
                  </div>
                  <div className={classes.rowItem}>
                    {formDetail(declarationInformation).map((item, index) => (
                      <div key={index}>
                        {item.name}: &emsp;{item.value}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Grid>
          )}
          {certification && (
            <Grid container style={{ display: 'flex' }}>
              <div className={classes.rowItem}></div>
              <div style={{ display: 'flex', width: '100%' }} className={classes.titleTxt + ' rowStyle'}>
                <div className={classes.rowItem}>{certification.title}</div>
              </div>
              <div className={classes.rowItem}>
                We certify that, to the best of our knowledge, the declaration by the shipping agent/ freight forwarder
                is true and correct. This Certificate is issued without any prejudice or liability whatsoever on our
                part arising from any circumstances.
              </div>
              <Grid className="" item xs={printer ? 8 : 12} md={8}>
                <div className={classes.rowItem}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    Authorised Signature:
                    {!signature && (
                      <img
                        alt="signature"
                        src={attachment ? attachment : sampleSignature}
                        className={classes.signatureImage}
                      />
                    )}
                  </div>
                  {formDetail(certification).map((item, index) => (
                    <div key={index}>
                      {item.name}: {item.value}
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid
                item
                xs={printer ? 4 : 12}
                md={4}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img alt="logo" src={sampleImage} className={classes.sampleStampImage} />
              </Grid>
            </Grid>
          )}
        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
