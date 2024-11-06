import {Cloudinary} from "@cloudinary/url-gen";
// Create a Cloudinary instance and set your cloud name.
const cl = new Cloudinary({
  cloud: {
      cloudName: 'dr1jbzn9r',
      secure: true,
    }
  });
export default cl;
