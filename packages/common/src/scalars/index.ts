import { createIntScalar, createStringScalar } from 'graphql-scalar';

export const Integer = createIntScalar({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  name: 'Integer',
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  description:
    'Custom int type, use this instead of the native Int. It has security protections such as min and max values.',

  minimum: 1,
  maximum: 100,
});

export const Str = createStringScalar({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  name: 'Str',
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  description:
    'Custom string type, use this instead of the native String. It has security protections such as min length, max length, lowercasing, serializing and more.',
  lowercase: true,
  minLength: 1,
  maxLength: 200,
  trim: true,
  nonEmpty: true,
});
