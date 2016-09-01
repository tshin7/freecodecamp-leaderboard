"use strict";

var allTimeUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
var recentUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var highlightColor = "yellow";

var LeaderRow = React.createClass({
  displayName: "LeaderRow",

  render: function render() {
    var index = this.props.index;
    var name = this.props.data.username;
    var recentPoints = this.props.data.recent;
    var allTimePoints = this.props.data.alltime;
    var img = this.props.data.img;
    var profileUrl = "http://www.freecodecamp.com/" + name;

    var rowId = "evenRow";
    if (index % 2 == 1) {
      rowId = "oddRow";
    }

    return React.createElement(
      "tr",
      { id: rowId },
      React.createElement(
        "td",
        null,
        index
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: profileUrl },
          React.createElement("img", { src: img, height: "35", width: "35" }),
          name
        )
      ),
      React.createElement(
        "td",
        null,
        recentPoints
      ),
      React.createElement(
        "td",
        null,
        allTimePoints
      )
    );
  }
});

var LeaderTable = React.createClass({
  displayName: "LeaderTable",

  getInitialState: function getInitialState() {

    return {
      index: 0,
      data: null,
      recentColor: {
        backgroundColor: "white"
      },
      allTimeColor: {
        backgroundColor: highlightColor
      }
    };
  },

  componentDidMount: function componentDidMount() {

    var a = this;
    $.getJSON(this.props.url, function (obj) {
      a.setState({
        data: obj
      });
    });
  },

  handleRecent: function handleRecent() {
    var a = this;
    $.getJSON(recentUrl, function (obj) {
      a.setState({
        data: obj,
        recentColor: {
          backgroundColor: highlightColor
        },
        allTimeColor: {
          backgroundColor: "white"
        }
      });
    });
  },

  handleAllTime: function handleAllTime() {
    var a = this;
    $.getJSON(allTimeUrl, function (obj) {
      // console.log(obj[0]);
      a.setState({
        data: obj,
        recentColor: {
          backgroundColor: "white"
        },
        allTimeColor: {
          backgroundColor: highlightColor
        }
      });
    });
  },

  render: function render() {
    var rows = [];
    var temp = "a";
    if (this.state.data != null) {
      for (var i = 0; i < this.state.data.length; i++) {
        var currentData = this.state.data[i];
        rows.push(React.createElement(LeaderRow, { data: currentData,
          key: currentData.username,
          index: i + 1 }));
      }
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              { id: "numCol" },
              "#"
            ),
            React.createElement(
              "th",
              { id: "nameCol" },
              "Camper Name"
            ),
            React.createElement(
              "th",
              { id: "recentCol" },
              React.createElement("input", {
                type: "button",
                onClick: this.handleRecent,
                value: "Points in past 30 days",
                style: this.state.recentColor })
            ),
            React.createElement(
              "th",
              { id: "allTimeCol" },
              React.createElement("input", {
                type: "button",
                onClick: this.handleAllTime,
                value: "All time points",
                style: this.state.allTimeColor })
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(LeaderTable, { url: allTimeUrl }), document.getElementById('app'));