import { axiosInstance } from './axiosInstance';

// ADD NEW PRODUCT
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/products/add-product',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// GET ALL PRODUCTS
export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      '/api/products/get-products',
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// PRODUCT EDIT
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// GET PRODUCT BY ID
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// PRODUCT DELETE
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// PRODUCT IMAGE UPLOAD
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/products/upload-image-to-product',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// PRODUCT STATUS UPDATE
export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// TO GET ALL BIDS
export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      '/api/bids/get-all-bids',
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// PLACING NEW BID
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/bids/place-new-bid',
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//

// // TO GET ALL BIDS
// export const GetAllBids = async (filters) => {
//   try {
//     const response = await axiosInstance.post(
//       '/api/bids/get-all-bids',
//       filters
//     );
//     return response.data;
//   } catch (error) {
//     return error.message;
//   }
// };
