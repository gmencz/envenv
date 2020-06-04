import React from 'react';
import { useQueryParams } from '../../../hooks/use-query-params';
import { Redirect } from 'react-router-dom';
import { AuthScreenInfoContainer } from '../styles';
import { FlexContainer } from '../../../components/flex-container';
import { Logo } from '../../../components/logo';
import { Title } from '../../../components/title';
import { Paragraph } from '../../../components/paragraph';
import { Formik } from 'formik';
import { signupValidationSchema } from '../../../validation/signup';
import { Input, ErrorIcon } from '../../../components/input';
import { Checkbox } from '../../../components/checkbox';
import { AppLink } from '../../../components/link';
// @ts-ignore
import TermsOfServicePDF from '../../../assets/EnvenvTOS.pdf';
// @ts-ignore
import PrivacyPolicyPDF from '../../../assets/EnvenvPrivacyPolicy.pdf';
import { Button } from '../../../components/button';
import { Loader } from '../../../components/loader';
import { useUnexpectedTypename } from '../../../hooks/use-unexpected-typename';
import { StyledInputError } from '../../../components/input/styles';
import { reach, object } from 'yup';
import { generate } from 'generate-password';
import { useSignUpWithGithubMutation } from '../../../generated/graphql';
import { useAuth } from '../../../hooks/use-auth';

type NewUserData = {
  id: string;
  name: string;
  provider: string;
  picture?: string;
  username?: string;
  email?: string;
};

export const AuthFlowLastStep: React.FC = () => {
  const params = useQueryParams();
  const { updateClientCacheForUserLogin } = useAuth();
  const [
    signupWithGithub,
    { data, loading: signingUp, error },
  ] = useSignUpWithGithubMutation();

  const { failedOperationMessage } = useUnexpectedTypename(
    data,
    'SuccessfulSignup'
  );

  /*
  Put the remaining fields we need to complete to signup into an array so we can then map
  over it to generate the fields accordingly.
  */
  const fieldsToFill = React.useMemo(() => {
    const fields = params.get('fill');
    if (!fields) {
      return null;
    }

    return {
      array: fields.split(','),
      object: fields.split(',').reduce((accumulator, property) => {
        return { ...accumulator, [property]: '' };
      }, {} as any),
    };
  }, [params]);

  const validationSchema = React.useMemo(() => {
    if (!fieldsToFill) {
      return null;
    }

    if (
      fieldsToFill.array.some(
        field => !(field in signupValidationSchema.fields!)
      )
    ) {
      return null;
    }

    const fields = {} as any;

    fieldsToFill.array.forEach(field => {
      fields[field] = reach(signupValidationSchema, field);
    });

    return object().shape({
      ...fields,
      agreedToTos: reach(signupValidationSchema, 'agreedToTos'),
    });
  }, [fieldsToFill]);

  // Put new user data from url into object which we can then use to finish signing up.
  const newUserData = React.useMemo(() => {
    const encoded = params.get('newUserData');
    if (!encoded) {
      return null;
    }

    const decoded = encoded
      .split('&')
      .reduce((accumulator, pieceOfUserData) => {
        const [
          pieceOfUserDataName,
          pieceOfUserDataValue,
        ] = pieceOfUserData.split('=');

        if (pieceOfUserDataName !== 'provider') {
          return {
            ...accumulator,
            [pieceOfUserDataName]: pieceOfUserDataValue,
          };
        }

        return { ...accumulator };
      }, {} as NewUserData);

    return decoded;
  }, [params]);

  if (data?.signup.__typename === 'SuccessfulSignup') {
    updateClientCacheForUserLogin.execute({
      variables: { csrfToken: data.signup.csrfToken },
    });
    return <Redirect to='/' />;
  }

  if (!fieldsToFill || !newUserData || !validationSchema) {
    return <Redirect to='/' />;
  }

  return (
    <AuthScreenInfoContainer>
      <FlexContainer margin='0 0 3rem 0' alignItems='center'>
        <Logo margin='0 .75rem 0 0' size='30px' />
        <Title>Envenv</Title>
      </FlexContainer>
      <Title>Hey, {newUserData.name.split(' ')[0]}, you're almost there!</Title>
      <Paragraph>
        We just need you to fill in some details so others can know who you are.
      </Paragraph>
      <FlexContainer flexDirection='column'>
        <Formik
          initialValues={{
            ...(fieldsToFill.object as any),
            agreedToTos: false,
          }}
          onSubmit={values => {
            const clonedValues = { ...values };
            delete clonedValues.agreedToTos;
            signupWithGithub({
              variables: {
                data: {
                  ...newUserData,
                  ...clonedValues,
                  password: generate({
                    length: 19,
                    symbols: true,
                    numbers: true,
                  }),
                },
              },
            });
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {fieldsToFill.object.username === '' && (
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='username'
                  type='text'
                  value={values.username}
                  margin='0 0 1.5rem'
                  label='Username'
                  error={
                    touched.username ? (errors.username as string) : undefined
                  }
                />
              )}
              {fieldsToFill.object.email === '' && (
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name='email'
                  type='text'
                  value={values.email}
                  margin='0 0 1.5rem'
                  placeholder='example@domain.com'
                  label='Email'
                  error={touched.email ? (errors.email as string) : undefined}
                />
              )}

              <FlexContainer margin='0 0 1.5rem'>
                <Checkbox
                  checked={values.agreedToTos}
                  margin='0 .5rem 0 0'
                  error={touched.agreedToTos ? !!errors.agreedToTos : false}
                  onChange={() => {
                    setFieldValue('agreedToTos', !values.agreedToTos);
                  }}
                />
                <span>
                  I have read and agree to the{' '}
                  <AppLink external to={TermsOfServicePDF}>
                    Terms of Service
                  </AppLink>{' '}
                  and{' '}
                  <AppLink external to={PrivacyPolicyPDF}>
                    Privacy Policy
                  </AppLink>
                  .
                </span>
              </FlexContainer>
              <Button
                disabled={signingUp}
                type='submit'
                primary
                margin='0 0 1.5rem'
              >
                {signingUp ? <Loader size='12px' /> : 'Next'}
              </Button>
              {failedOperationMessage && (
                <StyledInputError>
                  <ErrorIcon />
                  <strong>{failedOperationMessage}</strong>
                </StyledInputError>
              )}
              {error && (
                <StyledInputError>
                  <ErrorIcon />
                  <strong>{error.message}</strong>
                </StyledInputError>
              )}
            </form>
          )}
        </Formik>
      </FlexContainer>
    </AuthScreenInfoContainer>
  );
};
