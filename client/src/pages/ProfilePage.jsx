import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Upload,
  Typography,
  Row,
  Col,
  Card,
  Avatar,
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';
import assets from '../assets/assets';

const { TextArea } = Input;
const { Title } = Typography;

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    };
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: '100%',
          maxWidth: 700,
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={14}>
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Title level={4} style={{ color: 'white' }}>
                Profile Details
              </Title>

              <Form.Item
                label={<span style={{ color: 'white' }}>Profile Image</span>}
              >
                <Upload
                  beforeUpload={(file) => {
                    setSelectedImg(file);
                    return false;
                  }}
                  showUploadList={false}
                  accept=".png,.jpg,.jpeg"
                >
                  <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label={<span style={{ color: 'white' }}>Name</span>}
                required
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: 'white' }}>Bio</span>}
                required
              >
                <TextArea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write profile bio"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  style={{ background: '#1677ff', border: 'none' }}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col xs={24} md={10} style={{ textAlign: 'center' }}>
            <Avatar
              size={140}
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : authUser?.profilePic || assets.logo_icon
              }
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
