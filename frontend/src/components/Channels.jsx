import React from 'react';

const Channels = () => {
  const foo = 456;
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" style={{ width: '20px', height: '20px' }}>
          <span>+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
            <span className="me-1">#</span>
            general
          </button>
        </li>
        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
            <span className="me-1">#</span>
            {foo}
          </button>
        </li>
      </ul>
    </>
  );
};

export default Channels;
