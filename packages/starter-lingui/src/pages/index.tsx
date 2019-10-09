import * as React from 'react';
import { Link } from 'gatsby';
export default (props: any) => {
  console.log(props);
  return (
    <div>
      Index
      <Link to="product">To Product!</Link>
    </div>
  );
};
