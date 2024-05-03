import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yell', 'orange', 'green', 'brown', 'blue']

class App extends Component {
  state = {
    list: [],
    isTrue: false,
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }
  listenUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      websiteName: website,
      initialValue: initial,
      userName: username,
      password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      list: [...prevState.list, newValues],
      website: '',
      username: '',
      password:"",
      isTrue: true,
      searchInput: '',
    }))
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {list} = this.state
    const newList = list.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({list: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, isShow, list, searchInput} = this.state
    let {isTrue} = this.state
    const newList = list.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="bg-container1">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="con1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form className="form-container" onSubmit={this.addPassword}>
            <h1>Add New Password</h1>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="imageinput"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="imageinput"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="imageinput"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button className="but" type="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="con-2">
          <div className="headerpart">
            <h1>Your Passwords</h1>
            <p>{newList.length}</p>
            <div className="search-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
            <hr />
            <div className="showpassword-con">
              <input type="checkbox" onChange={this.showPassword} id="check" />
              <label htmlFor="check">Show Passwords</label>
            </div>
            {!isTrue && (
              <div className="empty">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="result-con">
                {newList.map(eachValue => (
                  <li className="items" id={eachValue.id} key={eachValue.id}>
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div>
                      <p>{eachValue.websiteName}</p>
                      <p>{eachValue.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && <p>{eachValue.password}</p>}
                    </div>
                    <button
                      type="button"
                      className="del"
                      onClick={() => this.deleteItem(eachValue.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
