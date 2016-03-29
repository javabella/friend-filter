'use strict';
(function() {

	/**
	 * Array of users' VK friends
	 * @type {Array<Friend>}
	 */
	window.friends = [];

	/**
	 * @constructor
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} photoSrc
	 */
	function Friend(firstName, lastName, photoSrc) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.photoSrc = photoSrc;
		this._template = document.querySelector('#li-template');
	}

	Friend.prototype = {
		render: function() {
			if ('content' in this._template) {
				this.element = this._template.content.children[0].cloneNode(true);
			} else {
				this.element = this._template.childNodes[0].cloneNode(true);
			}

			this.element.querySelector('img').src = this.photoSrc;
			this.element.querySelector('.name').textContent = this.firstName + ' ' + this.lastName;
		}
	}

	window.Friend = Friend;
})();
