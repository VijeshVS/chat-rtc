import React from 'react'

const NotSupported = () => {
  return (
    <div className="flex h-screen lg:hidden justify-center items-center bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src="./support.svg" alt="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700">Not Supported</h1>
          <p className="text-gray-600 mt-2">
            This website is not supported on your device.
          </p>
        </div>
      </div>
  )
}

export default NotSupported