const CustomSchema = {
  billOfLanding: {
    name: 'BillOfLanding',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        title: { type: 'string' },
        remarks: { type: 'string' },
        fileName: { type: 'string' },
        shippingInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            countryName: { type: 'string' },
            stress: { type: 'string' },
            address: { type: 'string' },
          },
        },
        customInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            additionalAddress: { type: 'string' },
            telephoneNumber: { type: 'string' },
          },
        },
        declarationInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            declarationName: { type: 'string' },
            designation: { type: 'string' },
            date: { type: 'string' },
          },
        },
        certification: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            certificationName: { type: 'string' },
            designation: { type: 'string' },
            date: { type: 'string' },
          },
        },
      },
      required: ['name', 'title', 'fileName'],
      additionalProperties: true,
    },
  },
  openCertsCertificateOfAward: {
    name: 'BillOfLanding',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        title: { type: 'string' },
        remarks: { type: 'string' },
        fileName: { type: 'string' },
        shippingInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            countryName: { type: 'string' },
            stress: { type: 'string' },
            address: { type: 'string' },
          },
        },
        customInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            additionalAddress: { type: 'string' },
            telephoneNumber: { type: 'string' },
          },
        },
        declarationInformation: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            declarationName: { type: 'string' },
            designation: { type: 'string' },
            date: { type: 'string' },
          },
        },
        certification: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            certificationName: { type: 'string' },
            designation: { type: 'string' },
            date: { type: 'string' },
          },
        },
      },
      required: ['name', 'title', 'fileName'],
      additionalProperties: false,
    },
  },
};

export { CustomSchema };
