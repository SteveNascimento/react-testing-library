import { validationSchema } from './formSchema';

import 'antd/dist/antd.css';

import { Card, Input, Form, Layout, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

const { Content } = Layout

function App({
  onSubmit = async (data) => alert(JSON.stringify(data))
}) {

  const reg = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {},
    resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  })

  const EmailInput = (props) => {
    const { label, name } = props;
    return (
      <Controller
        control={reg.control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label={label}
              validateStatus={error ? 'error' : ''}
              help={error ? error.message : ''}
              hasFeedback
            >
              <Input placeholder={label} {...field} />
            </Form.Item>
          )
        }}
      >
      </Controller>
    )
  }

  const PasswordInput = (props) => {
    const { label, name } = props;
    return (
      <Controller
        control={reg.control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label={label}
              validateStatus={error ? 'error' : ''}
              help={error ? error.message : ''}
              hasFeedback
            >
              <Input.Password placeholder={label} {...field} />
            </Form.Item>
          )
        }}
      >
      </Controller>
    )
  }

  return (
    <Content style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Card>
        <Form
          layout='vertical'
          onFinish={reg.handleSubmit(onSubmit)}
        >
          <EmailInput name='email' label='Email' />
          <PasswordInput name='password' label='Password' />
          <Button htmlType='submit' type='primary'>Submit</Button>
        </Form>
      </Card>
    </Content>
  );
}

export default App;
