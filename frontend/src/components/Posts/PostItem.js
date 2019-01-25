import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  handleDelete = id => {
    this.props.deletePost(id);
  };

  handleLike = id => {
    this.props.addLike(id);
  };

  handleUnLike = id => {
    this.props.removeLike(id);
  };

  // findUserLike(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div>
        <div>
          <div>
            <a href="profile.html">
              <img src={post.avatar} alt="" />
            </a>
            <br />
            <p>{post.name}</p>
          </div>
          <div>
            <p>{post.text}</p>
            {showActions ? (
              <span>
                <button onClick={() => this.handleLike(post._id)} type="button">
                  {/* <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  /> */}
                  👍🏼
                  <span>{post.likes.length}</span>
                </button>

                <button
                  onClick={() => this.handleUnLike(post._id)}
                  type="button"
                >
                  👎🏼
                </button>

                <Link to={`/post/${post._id}`}>Comments</Link>

                {post.user === auth.user.id ? (
                  <button
                    onClick={() => this.handleDelete(post._id)}
                    type="button"
                  >
                    ❌
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
