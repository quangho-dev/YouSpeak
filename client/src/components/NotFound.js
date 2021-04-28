import React, { Fragment } from 'react';
import ErrorIcon from '@material-ui/icons/Error';

const NotFound = () => {
  return (
    <Fragment>
      <h1>
        <ErrorIcon /> Không tìm thấy trang.
      </h1>
      <p>Xin lỗi, trang này không tồn tại.</p>
    </Fragment>
  );
};

export default NotFound;
