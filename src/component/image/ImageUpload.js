import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    hasProgress = true,
    ...rest
  } = props;
  return (
    <label
      className={`group cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full h-full min-h-[200px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="https://raw.githubusercontent.com/evondev/react-course-projects/6ba186e7c8c84350cd522281e664204404941df8/monkey-blogging/public/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}

      {image && (
        <Fragment>
          <img src={image} className="object-cover w-full h-full" alt="" />
          <div className="absolute items-center justify-center hidden w-full h-full bg-black group-hover:flex bg-opacity-10">
            <button
              onClick={handleDeleteImage}
              className="flex items-center justify-center gap-2 p-2 text-xl text-white bg-gradient-to-r from-[#00a7b4] to-[#a4d96c] rounded-xl"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remove
            </button>
          </div>
        </Fragment>
      )}
      {!image && (
        <div
          className={`absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress ${
            hasProgress ? "" : "hidden"
          }`}
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  process: PropTypes.number,
  image: PropTypes.string,
};
export default ImageUpload;
