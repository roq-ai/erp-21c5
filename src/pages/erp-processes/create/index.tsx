import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createErpProcess } from 'apiSdk/erp-processes';
import { erpProcessValidationSchema } from 'validationSchema/erp-processes';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ErpProcessInterface } from 'interfaces/erp-process';

function ErpProcessCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ErpProcessInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createErpProcess(values);
      resetForm();
      router.push('/erp-processes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ErpProcessInterface>({
    initialValues: {
      process_name: '',
      automation_status: false,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: erpProcessValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Erp Processes',
              link: '/erp-processes',
            },
            {
              label: 'Create Erp Process',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Erp Process
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.process_name}
            label={'Process Name'}
            props={{
              name: 'process_name',
              placeholder: 'Process Name',
              value: formik.values?.process_name,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="automation_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.automation_status}
          >
            <FormLabel htmlFor="switch-automation_status">Automation Status</FormLabel>
            <Switch
              id="switch-automation_status"
              name="automation_status"
              onChange={formik.handleChange}
              value={formik.values?.automation_status ? 1 : 0}
            />
            {formik.errors?.automation_status && (
              <FormErrorMessage>{formik.errors?.automation_status}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/erp-processes')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'erp_process',
    operation: AccessOperationEnum.CREATE,
  }),
)(ErpProcessCreatePage);
