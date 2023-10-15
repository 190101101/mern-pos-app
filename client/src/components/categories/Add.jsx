import { Modal, Form, Input, Button, message } from 'antd';

const Add = ({ isAddModalOpen, setIsAddModalOpen, category, setCategory }) => {
      
  const [form] = Form.useForm();
  
  const onFinish = (data) => {
    try{
      fetch(`${process.env.REACT_APP_SERVER_URL}/server/category/create`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json; charset=UTF-8"}
      })
      .then((response) => response.json())
      .then((newdata) => {
        category.push(newdata.data);
        message.success("category added");
        form.resetFields();
        setCategory([...category])
      });

    }catch(error){
      console.log(error);
    }
  }

  return (
    <Modal 
    title="new category" 
      open={isAddModalOpen} 
      onCancel={() => {setIsAddModalOpen(false)}} 
      footer={false}>
    <Form layout='vertical' onFinish={onFinish} form={form}>
      <Form.Item name="title" label="title" 
        rules={[{required: true, message:'title is required'}]}>
        <Input/>
      </Form.Item>

      <Form.Item className="flex justify-end mb-0">
        <Button htmlType="submit" type="primary">add</Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default Add