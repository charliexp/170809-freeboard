import React from 'react';

const Paging = () => {
  return (
    <div id="paging" className="">
      <nav aria-label="Page navigation example" className="d-inline-block">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
      <button type="button" className="btn btn-primary float-right">write</button>
    </div>
  );
};

export default Paging;
