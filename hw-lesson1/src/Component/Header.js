import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    content: state.appReducer.content
  };
}

export default connect(mapStateToProps)(function Header(props) {
  const { content } = props;

  return (
    <nav class="container-fluid navbar navbar-dark bg-primary nav d-flex justify-content-center text-white">
      <div className="row">
        <div className="row col-12 d-flex text-white">
          <div className="col-1"></div>
          <div className="col-10">
            <span className="h3" >{content.title}</span>
          </div>
          {(content.title === 'List of pictures!!!' || content.title === 'Pictures you chosen') &&
            <div class="nav-item dropdown col-1">
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pictures
        </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link class="dropdown-item" to="./FavoritesPictures">My pictures</Link>
                <Link class="dropdown-item" to="./Pictures">All pictures</Link>
              </div>
            </div>}
        </div>
      </div>
    </nav>


  )
})
