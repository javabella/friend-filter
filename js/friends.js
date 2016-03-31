'use strict';
(function() {

	/**
	 * @constructor
	 * @param {string}	firstName
	 * @param {string}	lastName
	 * @param {string}	photoSrc
	 * @param {number}	userId
	 * @param {boolean}	selected
	 * @param {boolean}	filtered
	 */
	function Friend(firstName, lastName, photoSrc, userId, selected, filtered) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.photoSrc = photoSrc;
		this.userId = userId;
		this.selected = selected;
		this.filtered = filtered;
		this._template = document.querySelector('#li-template');
	}

	Friend.prototype = {

		/**
		 * items' render
		 * @param  {(number|string)} index index in array of initial list of friends
		 */
		render: function(index) {
			if (this.filtered) {
				this.element = null;
				return;
			}
			if ('content' in this._template) {
				this.element = this._template.content.children[0].cloneNode(true);
			} else {
				this.element = this._template.childNodes[0].cloneNode(true);
			}

			this.element.querySelector('img').src = this.photoSrc;
			this.element.querySelector('.name').textContent = this.firstName + ' ' + this.lastName;
			this.element.setAttribute('data-index', index);
			this.element.setAttribute('data-uid', this.userId);

			if (this.selected) {
				this.element.querySelector('.fa').classList.remove('fa-plus');
			} else {
				this.element.querySelector('.fa').classList.remove('fa-times');
			}
		}
	}

	window.Friend = Friend;
})();
