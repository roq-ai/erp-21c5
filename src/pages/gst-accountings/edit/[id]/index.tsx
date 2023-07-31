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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getGstAccountingById, updateGstAccountingById } from 'apiSdk/gst-accountings';
import { gstAccountingValidationSchema } from 'validationSchema/gst-accountings';
import { GstAccountingInterface } from 'interfaces/gst-accounting';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function GstAccountingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<GstAccountingInterface>(
    () => (id ? `/gst-accountings/${id}` : null),
    () => getGstAccountingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GstAccountingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGstAccountingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gst-accountings');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GstAccountingInterface>({
    initialValues: data,
    validationSchema: gstAccountingValidationSchema,
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
              label: 'Gst Accountings',
              link: '/gst-accountings',
            },
            {
              label: 'Update Gst Accounting',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Gst Accounting
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.gst_number}
            label={'Gst Number'}
            props={{
              name: 'gst_number',
              placeholder: 'Gst Number',
              value: formik.values?.gst_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.accounting_data}
            label={'Accounting Data'}
            props={{
              name: 'accounting_data',
              placeholder: 'Accounting Data',
              value: formik.values?.accounting_data,
              onChange: formik.handleChange,
            }}
          />

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
              onClick={() => router.push('/gst-accountings')}
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
    entity: 'gst_accounting',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GstAccountingEditPage);
