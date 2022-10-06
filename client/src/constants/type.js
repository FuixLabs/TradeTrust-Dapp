import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import FolderZipIcon from '@mui/icons-material/FolderZip';

export const UUIDV4_LENGTH = 37;

export const PRIMITIVE_TYPES = ['string', 'number', 'boolean', 'undefined'];

export const SERVICE = {
  CARDANO: 'cardano',
  ETHERIUM: 'eth',
};

export const IdentityProofType = {
  DNSDid: 'DNS-DID',
  DNSTxt: 'DNS-TXT',
  Did: 'DID',
};

export const SIGNATURE_TYPE = 'SHA3MerkleProof';

export const VERIFICATION_TYPE = {
  DEMO: 'demo',
  CUSTOM: 'custom',
};

export const VALID_DOCUMENT_NAME_TYPE = [
  {
    name: 'Bill of Landing',
    type: 'non-trade',
  },
  {
    name: 'Cover Letter',
    type: 'non-trade',
  },
  {
    name: 'OpenCerts Certificate of Award',
    type: 'trade',
  },
];

export const VALID_NETWORK = ['testnet', 'mainnet'];

export const DOCUMENT_TYPE = {
  trade: 'trade',
  nonTrade: 'non-trade',
};

export const NOTIFICATION_TYPE = [
  {
    name: 'changeHolderShip',
    icon: (
      <SwipeLeftIcon
        sx={{
          color: 'primary.white',
        }}
      />
    ),
    text: 'transfer the Holdership another Holder'
  },
  {
    name: 'nominateChangeOwnership',
    icon: (
      <AccessibilityNewIcon
        sx={{
          color: 'primary.white',
        }}
      />
    ),
    text: 'request to change new owner of the document '
  },
  {
    name: 'changeOwnerShip',
    text: 'transfer the Ownership another Owner',
    icon: (
      <FolderZipIcon
        sx={{
          color: 'primary.white',
        }}
      />
    ),
  },
];
