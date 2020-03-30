import React from 'react'
import { Feed, Segment, Dimmer, Image, Loader, Pagination, Grid } from 'semantic-ui-react'
import Message from './Message'

class TwitFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activePage: 1,
      numberPages:1
    };
  }

  fetchData(pageNumber) {
    fetch("https://minitwit-api.herokuapp.com/public?p="+pageNumber)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("success fetching api", result)
          this.setState({
            isLoaded: true,
            items: result.messages,
            numberPages: result.pageCount,
            activePage: result.page
          });
        },

        (error) => {
          this.setState({
            isLoaded: true
          });
            console.log("fail fetching api", error)
        }
      )
  }

  componentDidMount() {
    this.fetchData(1);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.fetchData(activePage);
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <div>
      {
        this.state.isLoaded ?
        <div>
          <Feed size="large">
              {
                items.map(item => (
                  <Message key={item.message_id.toString()}
                  name={item.author_username}
                  text={item.text}
                  date={item.pub_date}
                  />
                ))
              }
          </Feed>

          <Grid>
            <Grid.Column textAlign="center">
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={this.state.numberPages}
              style={{ marginBottom: '2em'}}
            />
            </Grid.Column>
          </Grid>
        </div>
        

        : 

        <Segment>
          <Dimmer active style={{ height: '15vh' }}>
            <Loader size="big" inverted>Loading</Loader>
          </Dimmer>
    
          <Image src='/images/wireframe/short-paragraph.png' />
        </Segment>
      }
      </div>

    )

  }
}

export default TwitFeed
