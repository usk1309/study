var HelloCountry = React.createClass({
	getInitialState: function() {
		return {
			data: [
				{selected: this.props.selected},
			],		// 追加された文字列を配列として状態を管理
		}
	},
	render: function() {
		var checks = this.state.data.map(function (d) {
			return (
				<li><label><input type="radio" name="list1" value={this.props.country} className="checkedlist" />{this.props.country}</label></li>
			);
		}.bind(this));
		return (
			<ul>{checks}</ul>
		)
	}
});

var CheckedList = React.createClass({
	render: function() {
		return (
			<p>{this.props.list}</p>
		)
	}
});


var Hello = React.createClass({
	getInitialState: function() {
		return {
			text: '',		// テキストの入力内容を管理
			todos: [],	// 入力内容を配列として状態を管理
			lists: [],	// 入力内容を配列として状態を管理
		};
	},
	onTextChange: function(e) {
		this.setState({ text: e.target.value });
	},
	addCountry: function(){ // 追加ボタンが押されたらtextをtodosに追加してthis.setState関数を呼び出し
		if(this.state.text !== "") {
			this.setState({ todos: this.state.todos.concat([this.state.text]) });
			this.state.text = "";
		}
	},
	addList: function(){ // 完了ボタンが押されたらcheckboxの選択された値を完了リストに追加してthis.setState関数を呼び出し
		var num = document.getElementsByClassName('checkedlist').length;
		var tmp_list_lists = [];
		for(var elem=0; elem < num; elem++){
			if(document.getElementsByClassName('checkedlist')[elem].checked) {
				tmp_list_lists = tmp_list_lists.concat([document.getElementsByClassName('checkedlist')[elem].value]);
				if(this.state.todos[elem] == document.getElementsByClassName('checkedlist')[elem].value) {
					document.getElementsByClassName('checkedlist')[elem].checked = false;
					this.state.todos.splice(elem--, 1);
					this.setState({ lists: this.state.lists.concat(tmp_list_lists) });
				}
			}
		}
	},
	delList: function(){ // 削除ボタンが押されたらcheckboxの選択された値をリストから削除
		var num = document.getElementsByClassName('checkedlist').length;
		var tmp_list_lists = [];
		for(var elem=0; elem < num; elem++){
			if(document.getElementsByClassName('checkedlist')[elem].checked) {
				if(this.state.todos[elem] == document.getElementsByClassName('checkedlist')[elem].value) {
					document.getElementsByClassName('checkedlist')[elem].checked = false;
					this.state.todos.splice(elem--, 1);
					this.setState({ lists: this.state.lists.concat(tmp_list_lists) });
				}
			}
		}
	},
	render: function() {
		return (
			<div>
				<div className="comment-form">
					<input type="text" value={this.state.text} onChange={this.onTextChange} />
					<button type="button" onClick={this.addCountry} >追加</button>
				</div>
				<div>
					{this.state.todos.map(country => {
						return (<HelloCountry country={country} />)
					})}
					<button type="button" onClick={this.addList} >完了</button>
					<button type="button" onClick={this.delList} >削除</button>
				</div>
				<div>
					{this.state.lists.map(list => {
						return (<CheckedList list={list} />)
					})}
				</div>
			</div>
		);
	}
});

React.render(
	<Hello />,
	document.getElementById('container')
);

