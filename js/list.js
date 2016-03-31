'use strict';
(function() {

	/* global filterAll:true */
	/* global filterSelected:true */

	/**
	 * @param {Array<Friend>} data array of friends
	 */
	function List(data) {
		this.data = data;
		this._containerOfAll = document.querySelector('.list-of-all');
		this._containerOfSelected = document.querySelector('.list-of-selected');
		this._container = document.querySelector('.window');
		this._onItemClick = this._onItemClick.bind(this);
		this._onSaveClick = this._onSaveClick.bind(this);
		this._onItemDrop = this._onItemDrop.bind(this);
	}

	List.prototype = {
		show: function() {
			this.clear();
			var fragmentForAll = document.createDocumentFragment();
			var fragmentForSelected = document.createDocumentFragment();
			this.data.forEach(function(item) {
				if (!item.element) {
					return;
				}
				if (item.selected) {
					fragmentForSelected.appendChild(item.element);
				} else {
					fragmentForAll.appendChild(item.element);
				}
			});
			this._containerOfAll.appendChild(fragmentForAll);
			this._containerOfSelected.appendChild(fragmentForSelected);
		},
		clear: function() {
			this._containerOfAll.innerHTML = '';
			this._containerOfSelected.innerHTML = '';
		},
		listenItemActions: function() {
			this._container.addEventListener('click', this._onItemClick);
			this._container.addEventListener('dragstart', this._onItemDrag);
			this._container.addEventListener('dragover', this._allowDrop);
			this._containerOfSelected.addEventListener('drop', function(e) {
				this._onItemDrop(e, true);
			}.bind(this));
			this._containerOfAll.addEventListener('drop', this._onItemDrop);
		},
		_onItemClick: function(e) {
			var target = e.target;
			if (target.classList.contains('fa-plus') || target.classList.contains('fa-times')) {
				var index = target.parentNode.getAttribute('data-index');
				this.data[index].selected = target.classList.contains('fa-plus');
				this._filterCheck(this.data[index]);
				this.data[index].render(index);
				this.show();
			}
		},

		/**
		 * send item to filters for check
		 * @param  {Friend} item
		 */
		_filterCheck: function(item) {
			if (item.selected) {
				filterSelected.check(item);
			} else {
				filterAll.check(item);
			}
		},
		_onItemDrag: function(e) {
			var target = e.target.closest('li[draggable="true"]');
			if (target) {
				e.dataTransfer.setData('index', target.getAttribute('data-index'));
			}
		},
		_allowDrop: function(e) {
			e.preventDefault();
		},
		_onItemDrop: function(e, isSelectedArea) {
			e.preventDefault();
			var index = e.dataTransfer.getData('index');
			this.data[index].selected = isSelectedArea;
			this._filterCheck(this.data[index]);
			this.data[index].render(index);
			this.show();
		},
		listenSaveClick: function() {
			if (typeof localStorage !== 'undefined') {
				this._container.addEventListener('click', this._onSaveClick);
			} else {
				throw new Error('Браузер не поддерживает localStorage');
			}
		},
		_onSaveClick: function(e) {
			var target = e.target;
			var selected = [];
			if (target.classList.contains('save')) {
				this.data.forEach(function(item) {
					if (item.selected) {
						selected.push(item.userId);
					}
				});
				localStorage.setItem('selected', selected);
				alert('Сохранено');
			}
		}
	}

	window.List = List;

})();
