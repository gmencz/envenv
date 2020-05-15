import { QueryResolvers } from '../../generated';

const requestPasswordResetEmail: QueryResolvers['requestPasswordResetEmail'] = (
  _,
  { email }
) => {
  console.log(email);
  return true;
};

export default requestPasswordResetEmail;
