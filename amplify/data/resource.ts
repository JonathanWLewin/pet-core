import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Pet: a
    .model({
      name: a.string(),
      breed: a.string(),
      sex: a.enum(['male', 'female']),
      currentConditions: a.string(),
      status: a.string().array(),
      medication: a.string().array(),
      notes: a.string().array(),
      weight: a.integer(),
      uri: a.string()
    })
    .authorization(allow => [allow.owner()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});