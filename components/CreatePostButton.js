import React from 'react';
import $ from 'jquery';
import {Button, Modal, message} from 'antd';
import { WrappedCreatePostForm } from './CreatePostForm';
import { API_ROOT, POS_KEY, AUTH_PREFIX, TOKEN_KEY, LOC_SHAKE} from '../constant';
export class CreatePostButton extends React.Component{
    state = {
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ confirmLoading: true });
        this.form.validateFields((err, values) => {
            if (!err) {
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat + Math.random() * 2 * LOC_SHAKE - LOC_SHAKE);
                formData.set('lon', lon+ Math.random() * 2 * LOC_SHAKE - LOC_SHAKE);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                }).then((response) => {
                    message.success('Created a post successfully!');
                    this.form.resetFields();
                    this.setState({ visible: false, confirmLoading: false });
                    this.props.loadNearbyPosts();
                }, (response) => {
                    message.error(response.responseText);
                    this.setState({ visible: false, confirmLoading: false });
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render(){
      return (
          <div>
              <Button type = "primary" onClick={this.showModal}>create New Post</Button>
              <Modal
                  title="Create New Post"
                  visible={this.state.visible}
                  confirmLoading={this.state.confirmLoading}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
              >
                  <WrappedCreatePostForm ref={this.saveFormRef}/>
              </Modal>
          </div>
      );
    }
}
