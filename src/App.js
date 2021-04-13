import { Component } from 'react';
import apiHits from './api';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from 'react-loader-spinner';
import './App.css';


class App extends Component {
  state = {
    hits: [],
    page: 1,
    query: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalImg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchHits();
    }
  }
  handleChangeQuery = searchQuery => {
    this.setState({ query: searchQuery, page: 1, hits: [], error: null });
  };

  fetchHits = () => {
    const { page, query } = this.state;
    const options = {
      page,
      query,
    };

    this.setState({ isLoading: true });

    apiHits
      .fetchHits(options)
      .then(data => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = (url, alt) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImg: { url, alt },
    }));
  };

  render() {
    const {
      hits,
      isLoading,
      error,
      showModal,
      modalImg: { url, alt },
    } = this.state;
    const onLoadButton = hits.length > 0 && !isLoading;
    
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleChangeQuery} />
        {isLoading && (
          <div className="Loader">
            <Loader
              type="Rings"
              color="#00BFFF"
              height={200}
              width={200}         
            />
          </div>
        )}
        <ImageGallery hits={hits} onToggleModal={this.toggleModal} />

        {onLoadButton && <Button onClick={this.fetchHits} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt={alt} />
          </Modal>
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
      </div>
    );
  }
}

export default App;
