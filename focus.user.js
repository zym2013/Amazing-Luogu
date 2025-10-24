// ==UserScript==
// @name         洛谷强专注模式 - Amazing Luogu
// @namespace    http://zym2013.dpdns.org/
// @version      0.1.2
// @description  洛谷强专注模式，但还是要靠自觉呀！
// @author       zhangyimin12345
// @match        *://www.luogu.com.cn/*
// @match        *://help.luogu.com.cn/*
// @match        *://www.luogu.com/*
// @match        *://www.luogu.me/*
// @match        *://www.lglg.top/*
// @icon         https://cdn.luogu.com.cn/upload/usericon/3.png
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
	'use strict';
	/*
		蒟蒻第一次纯手写插件，有不足之处请私信洛谷 1393230！
		页面禁用写完了。
		已去除多余元素完成页面：主页、题库
		本功能已经加入 Amazing Luogu！
		转载请标明出处！感谢！
	*/

	// 如果你使用了 Amazing Luogu 并开启了备忘录功能，请将下面变量的值设为 1
	let isaml = 0;

	// 勿动，全局变量
	let path = window.location.pathname;

	// 设置项
	// 暂时没有给出界面来设置，请手动设置
	// 至于为什么有 GM_getValue，预留的~
	let settings = {
		// 隐藏私信
		"hideChat": GM_getValue("hideChat", true),
		// 隐藏消息
		"hideNotification": GM_getValue("hideNotification", true),
		// 隐藏专栏
		"hideArticle": GM_getValue("hideArticle", true),
		// 隐藏剪贴板
		"hidePaste": GM_getValue("hidePaste", true),
		// 隐藏题解
		"hideSolution": GM_getValue("hideSolution", true),
		// 隐藏比赛
		"hideContest": GM_getValue("hideContest", true),
		// 隐藏用户主页、设置
		"hideUser": GM_getValue("hideUser", true),
		// 隐藏工单
		"hideTicket": GM_getValue("hideTicket", true),
		// 隐藏帮助中心
		"hideHelp": GM_getValue("hideHelp", true),
		// 隐藏页脚多余部分
		"hideFooter": GM_getValue("hideFooter", true),
		// 隐藏首页部分内容
		"hideHome": GM_getValue("hideHome", true),
		// 隐藏广告但不隐藏运势
		"hideAD": GM_getValue("hideAD", true),
		// 隐藏广告与运势
		"hidePunchAndAd": GM_getValue("hidePunchAndAd", false),
		// 隐藏讨论
		"hidediscuss": GM_getValue("hidediscuss", true),
		// 隐藏友情链接
		"hideFriendLinks": GM_getValue("hideFriendLinks", true),
		// 隐藏团队
		"hideTeam": GM_getValue("hideTeam", true),
		// 隐藏标签
		"hideTag": GM_getValue("hideTag", true),
		// 隐藏主题商店
		"hideThemeList": GM_getValue("hideThemeList", true),
		// 隐藏图床
		"hideImageHosting": GM_getValue("hideImageHosting", true),
		// 隐藏排名
		"hideRank": GM_getValue("hideRank", true),
		"hideRank2": GM_getValue("hideRank", true), // 这个别管
		// 隐藏桃片
		"hideJudgement": GM_getValue("hideJudgement", true),
	}

	settings.hideRank2 = settings.hideRank;

	// 隐藏页面映射
	let hidepages = {
		"hideChat": "/chat",
		"hideNotification": "/user/notification",
		"hideArticle": "/article",
		"hidePaste": "/paste",
		"hideSolution": "/problem/solution",
		"hideContest": "/contest",
		"hideUser": "/user",
		"hideTicket": "/ticket",
		"hidediscuss": "/discuss",
		"hideThemeList": "/theme/list",
		"hideImageHosting": "/image",
		"hideTeam": "/team",
		"hideRank": "/ranking",
		"hideJudgement": "/judgement"
	}

	// 隐藏链接、按钮映射
	let hidebuttons = {
		"hideChat": "/chat",
		"hideNotification": "/user/notification",
		"hideArticle": "/article",
		"hidePaste": "/paste",
		"hideSolution": "/problem/solution",
		"hideContest": "/contest/list",
		"hideTicket": "/ticket",
		"hidediscuss": "/discuss",
		"hideThemeList": "/theme/list",
		"hideImageHosting": "/image",
		"hideRank": "/ranking",
		"hideRank2": "/ranking/elo",
		"hideJudgement": "/judgement"
	}

	// 帮助中心
	if (settings.hideHelp && window.location.href.includes('help.luogu.com')) {
		hidepage();
		return;
	}

	// 帖子保存站
	if (window.location.href.includes('lglg.top')) {
		hidepage();
		return;
	}

	// 保存站
	if (window.location.href.includes('luogu.me')) {
		let flag = true;
		// 特殊处理
		if (!settings.hidePaste && path.startsWith('/paste')) flag = false;
		if (!settings.hideArticle && path.startsWith('/article')) flag = false;
		if (!settings.hideUser && path.startsWith('/user')) flag = false;
		if (flag) hidepage();
		return;
	}

	// 广告去除
	GM_addStyle(`
		[data-v-0a593618],
        [data-v-fdcd5a58] {
            display: none;
        }
	`);

	// 链接、按钮去除
	setInterval(function () {
		for (const [key, val] of Object.entries(hidebuttons))
			if (settings[key] && document.querySelector('a[href="' + val + '"]'))
				document.querySelector('a[href="' + val + '"]').remove();

		for (const [key, val] of Object.entries(hidebuttons))
			if (settings[key] && document.querySelector('button[href="' + val + '"]'))
				document.querySelector('button[href="' + val + '"]').remove();
	}, 200);

	// 页脚多余部分去除
	if (settings.hideFooter) {
		GM_addStyle(`
			.weixin,
			.qr-img,
			.info[data-v-95701c92],
			.content-wrap .links[data-v-1bb3d6f7] {
				display: none !important;
			}
        `);
	}

	// 下拉菜单多余部分去除
	if (settings.hideUser) {
		GM_addStyle(`
			.ops {
				display: none !important;
			}
        `);
	}

	// 左侧边栏多余部分去除
	let tmp = document.querySelector('nav.sidebar');
	if (tmp) {
		let targetdiv = tmp.querySelectorAll('div.nav-group');
		if (targetdiv.length > 3) targetdiv[3].remove();
	}

	// 右侧边栏多余部分去除
	let setIntervaldiv = setInterval(function () {
		let tmp = document.querySelector('div.rside');
		// 动态加载的，得打开再执行
		if (tmp && tmp.classList.contains('show')) {
			setTimeout(() => {
				if (tmp) {
					let targetdiv = tmp.querySelectorAll('div.nav-group');
					if (settings.hideUser && targetdiv.length) targetdiv[0].style.setProperty("display", "none", "important");
					if (settings.hideTeam && targetdiv.length > 1) targetdiv[1].style.setProperty("display", "none", "important");
					if (settings.hideContest && targetdiv.length > 2) targetdiv[2].style.setProperty("display", "none", "important");
				}
			}, 300);
			clearInterval(setIntervaldiv);
		}
	}, 300);

	// 主页多余部分去除
	if (path == '/' && settings.hideHome) {
		// 运势与广告布局一：去除广告并将运势居中，Mr_罗 提供的代码，感谢。
		if (settings.hideAD && !settings.hidePunchAndAd) {
			document.getElementsByClassName('am-u-md-8')[0].remove();
			var Fortune = document.getElementsByClassName('am-u-md-4 lg-punch am-text-center')[0];
			Fortune.style = 'left: 50%; transform: translateX(-50%);';
		}

		// 运势与广告布局二：隐藏运势与广告。
		if (settings.hidePunchAndAd) {
			let targetdiv = document.querySelector('div.am-g');
			if (targetdiv) targetdiv.style.setProperty("display", "none", "important");
		}

		let targetdiv = document.querySelector('div.lg-right');
		if (targetdiv) {
			let lgArticles = targetdiv.querySelectorAll('.lg-article');

			// 隐藏本站公告
			if (lgArticles.length) {
				let tmp = lgArticles[0];
				tmp.style.setProperty("display", "none", "important");
			}

			// 隐藏友情链接
			if (lgArticles.length >= 3 && settings.hideFriendLinks) {
				let tmp = lgArticles[2];
				tmp.style.setProperty("display", "none", "important");
			}
		}

		let targetdiv2 = document.querySelector('div.lg-index-benben');
		if (targetdiv2) {
			let lgArticles = targetdiv2.querySelectorAll('.lg-article');

			// 隐藏最近比赛
			if (lgArticles.length && settings.hideContest) {
				let tmp = lgArticles[0];
				tmp.style.setProperty("display", "none", "important");
			}

			// 隐藏最新讨论
			if (lgArticles.length >= 2 && settings.hidediscuss) {
				let tmp = lgArticles[1];
				tmp.style.setProperty("display", "none", "important");
			}

			// 隐藏犇犇发送块与按钮块
			let tmp2 = lgArticles[2 + isaml];
			tmp2.style.setProperty("display", "none", "important");
			let tmp3 = lgArticles[3 + isaml];
			tmp3.style.setProperty("display", "none", "important");
			let tmp4 = lgArticles[4 + isaml];
			tmp4.style.setProperty("display", "none", "important");
		}

		// 犇犇去除
		document.querySelector('ul.am-comments-list').remove();

		// 隐藏犇犇展开按钮
		GM_addStyle(`
			#feed-more {
				display: none !important;
			}
		`);
	}

	let flag = 1;

	// 题库页面多余内容去除
	if (path.startsWith('/problem/list')) {
		GM_addStyle(`
			span.lfe-caption a {
				display: none !important;
			}
		`);
		flag = 0;
	}

	// 题目页面多余内容去除
	if (path.startsWith('/problem/') && flag) {
		setTimeout(function () {
			setInterval(function () {
				let targetdiv = document.querySelector('div.l-card');
				if (targetdiv) {
					let targetdiv2 = targetdiv.querySelectorAll('a');
					// 隐藏查看题解
					if (settings.hideSolution && targetdiv2.length > 3) targetdiv2[4].style.setProperty("display", "none", "important");

					// 隐藏题目反馈
					if (settings.hideTicket && targetdiv2.length > 4) targetdiv2[5].style.setProperty("display", "none", "important");
					targetdiv2 = targetdiv.querySelectorAll('div.l-flex-info-row');

					// 隐藏提供者
					if (targetdiv2.length > 2) targetdiv2[1].style.setProperty("display", "none", "important");
				}

				// 隐藏提交、通过
				targetdiv = document.querySelector('div.color-inv');
				if (targetdiv) {
					let targetdiv2 = targetdiv.querySelectorAll('div.field');
					targetdiv2[0].style.setProperty("display", "none", "important");
					if (targetdiv2.length > 1) targetdiv2[1].style.setProperty("display", "none", "important");
				}

				// 隐藏复制题目
				targetdiv = document.querySelectorAll('button.lform-size-middle');
				if (targetdiv.length > 2) {
					targetdiv[2].style.setProperty("display", "none", "important");
				}
				// 隐藏加入个人题单
				targetdiv = Array.from(document.querySelectorAll('label')).find(label => label.textContent.trim() === '加入个人题单');
				targetdiv.style.setProperty("display", "none", "important");

				// 隐藏加入团队题单
				targetdiv = Array.from(document.querySelectorAll('label')).find(label => label.textContent.trim() === '加入团队题单');
				targetdiv.style.setProperty("display", "none", "important");

				// 隐藏题目讨论与标签
				targetdiv = document.querySelectorAll('div.l-card');
				if (settings.hideTag && targetdiv.length > 1) targetdiv[1].style.setProperty("display", "none", "important");
				if (settings.hidediscuss && targetdiv.length > 2) targetdiv[2].style.setProperty("display", "none", "important");
			}, 500);
		}, 50);
	}

	// 题单页面多余内容去除
	if (path.startsWith('/training/')) {
		setTimeout(function () {
			setInterval(function () {
				let tmp = document.querySelector('section.side');
				let targetdiv = tmp.querySelector('div.padding-default');
				targetdiv.style.setProperty("display", "none", "important");

				targetdiv = document.querySelector('div.operation');
				targetdiv.style.setProperty("display", "none", "important");
			}, 500);
		}, 50);
	}

	// 提交记录列表页面多余内容去除
	if (path.startsWith('/record/list')) {
		GM_addStyle(`
			div.mobile-body div.dropdown {
				display: none !important;
			}
		`);
	}

	// 页面禁用
	function hidepage() {
		document.body.innerHTML = '';
		document.body.style = '';
		document.head.innerHTML = '';
		const newdiv = document.createElement('div');
		newdiv.style.display = 'flex';
		newdiv.style.flexDirection = 'column';
		newdiv.style.justifyContent = 'center';
		newdiv.style.alignItems = 'center';
		newdiv.style.height = '100vh';
		newdiv.style.textAlign = 'center';
		newdiv.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
		const message = document.createElement('h1');
		message.textContent = '请认真学习哦！';
		message.style.marginBottom = '20px';
		message.style.fontWeight = 'bold';
		message.style.color = '#333';
		message.style.fontSize = '2em';
		const newcount = document.createElement('p');
		newcount.style.fontSize = '1.5em';
		newcount.style.color = '#666';
		let cnt = 3;
		newcount.textContent = `页面关闭倒计时：${cnt} 秒`;
		newdiv.appendChild(message);
		newdiv.appendChild(newcount);
		document.body.appendChild(newdiv);
		const setIntervaldiv = setInterval(() => {
			cnt--;
			if (cnt > 0) newcount.textContent = `页面关闭倒计时：${cnt}秒`;
			else {
				newcount.textContent = '即将关闭……';
				clearInterval(setIntervaldiv);
				setTimeout(() => { window.location.href = 'about:blank'; window.close(); }, 500);
			}
		}, 1000);
	}
	for (const [key, val] of Object.entries(hidepages))
		if (settings[key] && path.startsWith(val)) {
			hidepage();
			break;
		}

	// 弱智控制台提示
	document.addEventListener("DOMContentLoaded", () => {
		let cnt = 0;
		setInterval(function () {
			console.log('请认真学习哦！快关闭控制台吧！');
			cnt++;
			if (cnt > 100) cnt = 0, console.clear();
		}, 1000);
	});
})();
