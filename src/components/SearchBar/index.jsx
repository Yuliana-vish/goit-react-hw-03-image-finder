    import { Component } from 'react';
    import PropTypes from 'prop-types';
    import styles from './SearchBar.module.css';

    class SearchBar extends Component {
      state = { query: '' };

      handleChange = evt => {
        this.setState({ query: evt.currentTarget.value });
      };

      handleSubmit = evt => {
        evt.preventDefault();

        this.props.onSubmit(this.state.query);

        this.setState({ query: '' });
      };

      render() {
        const { query } = this.state;

        return (
          <header className={styles.SearchBar}>
            <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
              <button type="submit" className={styles.SearchFormButton}>
                <span className={styles.SearchFormLabel}></span>
              </button>

              <input
                className={styles.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={query}
                onChange={this.handleChange}
              />
            </form>
          </header>
        );
      }
    }

    SearchBar.propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    export default SearchBar;