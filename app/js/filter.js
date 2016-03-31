'use strict';
(function() {

	/* global list:true */

	function Filter(selector, forSelectedArea) {
		this.selector = selector;
		this.forSelectedArea = forSelectedArea;
		this.filter = this.filter.bind(this);
		this.check = this.check.bind(this);
	}

	Filter.prototype = {
		request: '',
		init: function() {
			var input = document.querySelector(this.selector);
			input.addEventListener('input', function(e) {
				this.request = e.target.value.toLowerCase();
				this.filter();
			}.bind(this));
		},
		filter: function() {
			list.data.forEach(function(current, index) {
				this.check(current);
				current.render(index);
			}.bind(this));
			list.show();
		},

		/**
		 * @param  {Friend} item
		 */
		check: function(item) {
			if (!this.forSelectedArea && !item.selected || this.forSelectedArea && item.selected) {
				var itemLC = (item.firstName + ' ' + item.lastName).toLowerCase();
				item.filtered = !(itemLC.indexOf(this.request) > -1);
			}
		}
	}

	window.Filter = Filter;
})();
