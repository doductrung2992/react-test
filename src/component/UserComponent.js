import React from 'react';

export class UserComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(result => {
      this.setState({
        users: result,
      });
    });
  }

  loadMore() {
    if (!this.state) {
      return;
    }
    let newIndex = 0;
    if (this.state.currentIndex + 1 >= this.state.users) {
      newIndex =  0;
    } else {
      newIndex = this.state.currentIndex + 1;
    }
    this.setState({
      currentIndex: newIndex,
    });
    this.setState({
      filteredUsers: this.state.users.slice(0, newIndex),
    });
  }

  render () {
    return (
        <>
          <button onClick={this.loadMore.bind(this)}>Show more</button>
          <ul>
            {this.state.filteredUsers.map(x => (
                <li>{x?.name}</li>
            ))}
          </ul>
        </>
    );
  }
}
