import React from 'react';
import { Link } from 'react-router-dom';

export default class Pagination extends React.Component {
  render() {
    return (
      <div className="pagination-wrapper" id="pagination">
        <div className="pagination-page">
          { this.props.data.cur_page !== 1 &&
            <span className="pagination-item"><Link to={'/' + this.props.prefix + '?page=' + (this.props.data.cur_page - 1)}>上一页</Link> </span>
          }
          { this.props.data.total_page !== this.props.data.cur_page &&
            <span className="pagination-item"><Link to={'/' + this.props.prefix + '?page=' + (this.props.data.cur_page + 1)}>下一页</Link></span>
          }
        </div>
        <div className="pagination-info">
          <span className="pagination-item">总共: {this.props.data.total}</span>
          <span className="pagination-item">当前页: {this.props.data.cur_page}</span>
        </div>
      </div>
    );
  }
}
