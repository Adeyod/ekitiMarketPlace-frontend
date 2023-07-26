import { Button, Upload, message } from 'antd';
import React from 'react';
import { SetLoader } from '../../../redux/loadersSlice';
import { useDispatch } from 'react-redux';
import { EditProduct, UploadProductImage } from '../../../apicalls/products';
import { AiOutlineDelete } from 'react-icons/ai';

function Images({ selectedProduct, setShowProductForm, getData }) {
  const [showPreview, setShowPreview] = React.useState(true);
  const [images = [], setImages] = React.useState(selectedProduct.images);
  const [file = null, setFile] = React.useState(null);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      // UPLOAD IMG TO CLOUDINARY
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      const updatedImagesArray = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImagesArray };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      if (response.success) {
        message.success(response.message);
        setImages(updatedImagesArray);
        setFile(null);
        getData();
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoader(true));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-5 mb-3">
        {images.map((image) => {
          return (
            <div className="flex items-end border border-solid border-gray-300 rounded p-2 ">
              <img className="h-20 w-20 object-cover" src={image} alt="" />

              <AiOutlineDelete onClick={() => deleteImage(image)} />
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        fileList={file ? [file] : []}
        showUploadList={showPreview}
      >
        <Button type="default">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>

        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;
