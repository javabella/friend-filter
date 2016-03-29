'use strict';
(function() {

	/**
	 * @type {?List}
	 */
	window.list = null;

	/**
	 * @param {Array<Friend>} data array of friends
	 */
	function List(data) {
		this._data = data;
		this._containerOfAll = document.querySelector('.list-of-all');
	}

	List.prototype = {
		show: function() {
			this.clear();
			var fragment = document.createDocumentFragment();
			this._data.forEach(function(item) {
				fragment.appendChild(item.element);
			});
			this._containerOfAll.appendChild(fragment);
		},
		clear: function() {
			this._containerOfAll.innerHTML = '';
		}
	}

	window.List = List;

})();
