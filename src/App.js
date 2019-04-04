import React, {Component} from 'react';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA';

YTSearch({key: API_KEY, term: 'react'}, function (data) {
    console.log(data);
});

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
        this.onVideoSelect = this.onVideoSelect.bind(this)
    }


    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]

            });

        });
        console.log(term);
    }

    onVideoSelect(selectedVideo) {
        this.setState({selectedVideo})
    }


    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={this.onVideoSelect}
                />
            </div>
        );
    }
};

export default App;
