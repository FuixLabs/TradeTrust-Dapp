export const CONFIG_MANDATORY_PROPERTIES = ["network", "forms"];

export const EXCEPTION_EDITED_PROPERTIES = ["companyName", "issuers", "did", "attachment"];

export const SORT_PROPERTIES = [
  {
    name: "title",
    value: "fileName",
    comparator: function (a, b) {
      return a["fileName"].localeCompare(b["fileName"]);
    },
  },
  {
    name: "hash",
    value: "documentHash",
    comparator: function (a, b) {
      return a["documentHash"].localeCompare(b["documentHash"]);
    },
  },
  {
    name: "status",
    value: "status",
    comparator: function (a, b) {
      return a["status"] === "Revoked" ? 1 : -1;
    },
  },
];

export const USER_REVIEW_INFORMATION = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Address',
    field: 'address'
  },
  {
    label: 'Organization Name',
    field: 'organizationName'
  },
  {
    label: 'Organization Mail',
    field: 'organizationMail'
  },
  {
    label: 'Organization Phone number',
    field: 'organizationPhoneNumber'
  },
  {
    label: 'Organization Address',
    field: 'organizationAddress'
  },
  {
    label: 'Website',
    field: 'website'
  },
]
