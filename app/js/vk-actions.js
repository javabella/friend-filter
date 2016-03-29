'use strict';
(function() {

	/* global VK:true */
	/* global friends:true */
	/* global Friend:true */
	/* global List:true */
	/* global list:true */

	VK.init({
		apiId: 5385217
	});

	var LOGIN_SETTINGS = 2;
	VK.Auth.login(function(response) {
		if (response.session) {
			setFriendsList(response.session.mid);
		} else {
			throw new Error('Пользователь нажал кнопку Отмена в окне авторизации');
		}
	}, LOGIN_SETTINGS);

	/**
	 * set friends array
	 * @param {string} userId VK user id
	 */
	function setFriendsList(userId) {
		VK.Api.call('friends.get', {
			user_id: userId,
			fields: 'nickname, photo_50'
		}, function(r) {
			if (r.response) {
				r.response.forEach(function(man) {
					var friend = new Friend(man.first_name, man.last_name, man.photo_50);
					friends.push(friend);
					friend.render();
				});
				list = new List(friends);
				list.show();
			}
		});
	}
})();
