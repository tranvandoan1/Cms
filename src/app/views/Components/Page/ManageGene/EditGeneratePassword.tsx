import { Form,Button,Input } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { edit, get } from "../../../../API/Auth"
import { editUser } from "../../../../Features/Slide/AuthSlide"
const EditGeneratePassword:React.FC = ()=>{
    const {id} = useParams()
    const [user,setUsers] = useState<any>()
    useEffect(()=>{
        const getUsers = async()=>{
            const {data} = await get(id)
            setUsers(data)
        }
        getUsers()
    },[])
    const dispath:any = useDispatch()
    const navigate = useNavigate()
    const onFinish = async(values:any)=>{
        console.log(values);
        const newUsers ={
            ...user,
            name:values.name,
            images: values.images
        }
        console.log(newUsers);
        
       dispath(editUser(newUsers))
        alert("update thành công")
        navigate("/admin/manage-generate-password")
    }
    // console.log(user);
    return(
        <div>
        <div
          style={{
            paddingBottom: 10,
            borderBottom: "1px solid rgb(228, 228, 228) ",
            marginBottom: 10,
          }}
        >
          <h3>Tài khoản</h3>
        </div>
        {(user !== undefined)?(
            <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              labelAlign="left"
              rules={[
                  {
                    transform(value) {
                      // console.log(value.length);
                        if(value.length === 0){
                         return{ required: true}
                        }
                    },
                  } 
              ]}
            >
              <Input 
                type="text" 
                placeholder="Tên người dùng" 
                defaultValue={user?.name} 
                value={user.name}  
              />
              
            </Form.Item>

            

          
            <Form.Item
              label="Ảnh"
              name="images"
              labelAlign="left"
              // rules={[
              //     {
              //       required: true,
              //       message: "Bạn chưa chọn ảnh đại diện!",
              //     },
              //   ]}
            >
              <Input type="file" />
            </Form.Item>
           
    
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Button type="primary" htmlType="submit">
                update
              </Button>
            </Form.Item>
          </Form>
        ):null}
      </div>
    )
}

export default EditGeneratePassword