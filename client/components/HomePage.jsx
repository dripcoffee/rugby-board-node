import React from 'react';

import Heading from './Heading.jsx';
import NewsList from './NewsList.jsx';
import HighlightNews from './HighlightNews.jsx';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    const newsHeading = {
      id: 'latest-news',
      title: '新闻',
      more_text: '更多',
      more_link: '#news'
    };

    const resultsHeading = {
      id: 'latest-results',
      title: '比分',
      more_text: '更多',
      more_link: '#results'
    };

    const eventHeading = {
      id: 'event-intro',
      title: '赛事介绍',
      more_text: '更多',
      more_link: '#wiki'
    };

    this.state = {
      newsHeading: newsHeading,
      resultsHeading: resultsHeading,
      eventHeading: eventHeading
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      queryString: nextProps.location.search
    });
      
    this.fetchData(nextProps.location.search);
  }

  componentWillMount() {
    this.fetchData(this.state.queryString);
  }

  fetchData(queries) {
    var self = this;
    var url = '/index';
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      self.setState({
        highlight: json.highlight,
        news: json.news,
        results: json.results
      });
    });
  }

  render() {
    return (
      <div className="columns">
        <div className="column column-2-3">
          <div>
            <Heading data={this.state.newsHeading} />
            <HighlightNews data={this.state.highlight} />
            <NewsList data={this.state.news} />
          </div>
        </div>
        <div className="column column-1-3">
          <div>
            <Heading data={this.state.resultsHeading} />
            <NewsList data={this.state.results} />
          </div>
          <div>
            <Heading data={this.state.eventHeading} />
            <div className="news">
              <div className="news-wrap">
                <div className="news-item">
                  <h3>国家队赛事</h3>
                  <ul>
                    <li>南半球冠军赛 The Rugby Championship</li>
                    <li>欧洲六国赛 Six Nations</li>
                    <li>橄榄球世界杯 Rugby World Cup</li>
                  </ul>
                  <h3>俱乐部赛事</h3>
                  <ul>
                    <li>超级橄榄球 Super Rugby</li>
                    <li>PRO12（凯尔特联赛）</li>
                    <li>英格兰超级联赛 Premiership</li>
                    <li>法国 TOP14 联赛</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
