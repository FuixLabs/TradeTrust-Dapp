import { CustomSchema } from './documentConfig';

const CONFIG_SCHEMA = {
  type: 'object',
  properties: {
    logo: { type: 'string' },
    extension: { type: 'string' },
    attachments: { type: 'boolean' },
    data: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        fileName: { type: 'string' },
      },
      required: ['name', 'fileName'],
    },
    style: {
      type: 'object',
      properties: {
        backgroundColor: { type: 'string' },
        titleColor: { type: 'string' },
        descriptionColor: { type: 'string' },
      },
    },
  },
  required: ['data', 'extension', 'attachments'],
};

export {
  CONFIG_SCHEMA,
  CustomSchema
}
