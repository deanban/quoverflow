import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Article extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <article className="content">
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>

          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
        <div className="jumbotron">
          <h1 className="display-3">Main article area</h1>
          <h1>Main article area</h1>
          <p className="lead">
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Learn more
            </a>
          </p>
        </div>
      </article>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

export default Article;
// connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )();
