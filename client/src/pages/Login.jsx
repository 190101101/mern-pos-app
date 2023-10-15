import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import AuthCarousel from '../components/auth/AuthCarousel';
import {setUser} from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try{
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/server/auth/login`,{
        method:'POST',
        body: JSON.stringify(values),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      });

      if(response.status === 200){
        const data = await response.json();

        if(data.status == true){
          // localStorage.setItem('user', JSON.stringify(data.data))
          dispatch(setUser(data.data));

          message.success(data.message);

          setTimeout(() => {
            navigate('/');
          }, 100)
        }
        else{
          message.error(data.message);
        }

      }else{
        message.error('something wrong');
        setLoading(false);
      }

      setLoading(false);

    }catch(error){
      console.log(error);
    }

  }

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col justify-center h-full w-full relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: "email is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true, message: "password is required" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="w-full"
                size="large"
                loading={loading}
              >
                login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            <span>Don't you have an account?</span>
            &nbsp;
            <Link to="/register" className="text-blue-600">
              registration
            </Link>
          </div>
        </div>

        {/*  */}

        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel 
                  image="/images/responsive.svg" 
                  title="Responsive" 
                  text="compatibility with all device sizes"
                />
                <AuthCarousel 
                  image="/images/statistic.svg" 
                  title="Statistic" 
                  text="extensive statistics"
                />
                <AuthCarousel 
                  image="/images/customer.svg" 
                  title="Customer satisfaction" 
                  text="Satisfied customers at the end of the experience"
                />
                <AuthCarousel 
                  image="/images/admin.svg" 
                  title="Admin" 
                  text="Manage from one place"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
