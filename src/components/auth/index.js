import { Button, Form, Input } from 'antd'
import '../auth/Login.css'
import Logo from '../../asset/Logo-main.png'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../Http'
import { HOME } from '../../config/path'
import { API_LOGIN } from '../../config/endpointAPi'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN, USER_INFO } from '../../config/const'


const Login = () => {
  const history = useHistory()
  const onFinish = (values) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    axios
      .post(API_LOGIN, values)
      .then(function (res) {
        localStorage.setItem(USER_INFO, JSON.stringify(res.data.user))
        localStorage.setItem(AUTH_TOKEN, res.data.access_token)
        console.log(res)
        history.push(HOME)

       
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <div className="login-background">
        <img src="https://i.pinimg.com/564x/8f/8e/63/8f8e634b3b1fad5827903a3fc0ce1d97.jpg"></img>
      </div>
      <div className="login-content">
        <div className="login-container">
          <div className="login-icon">
            <img src={Logo}></img>
          </div>
          <div className="login-title">Login into admin</div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
              <div className="form-input">
                <Input />
              </div>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <div className="form-input">
                <Input.Password />
              </div>
            </Form.Item>
            {/* <div className="login-forgot">Forgot password ?</div> */}
            <div>
              <Link to={HOME}>Link</Link>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="login-btn">
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
