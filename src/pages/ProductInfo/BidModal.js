import { Form, Input, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";
import { AddNotification } from "../../apicalls/notifications";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success("Bid placed successfully");

        // TO SEND NOTIFICATION TO SELLER
        await AddNotification({
          title: "New bid has been placed",
          message: `${user.name} has place a new bid on ${product.name} for $${values.bidAmount}`,
          user: product.seller._id,
          onClick: "/profile",
          read: false,
        });
        reloadData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };
  return (
    <Modal
      centered
      width={600}
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-3 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Place a Bid
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
            <Input />
          </Form.Item>

          <Form.Item rules={rules} label="Message" name="message">
            <Input.TextArea />
          </Form.Item>

          <Form.Item rules={rules} label="Mobile" name="mobile">
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;
