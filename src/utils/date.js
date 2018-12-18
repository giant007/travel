function getDate (sDay, type) {
	let d, year, month, day, week
	d = new Date()
	d.setDate(d.getDate() + sDay)
	year = d.getFullYear()
	month = d.getMonth() + 1
	month = month < 10 ? '0' + month : month
	day = d.getDate()
	day = day < 10 ? '0' + day : day
	week = d.getDay()
	switch (week) {
		case 0:
				week = '周日'
				break
		case 1:
				week = '周一'
				break
		case 2:
				week = '周二'
				break
		case 3:
				week = '周三'
				break
		case 4:
				week = '周四'
				break
		case 5:
				week = '周五'
				break
		case 6:
				week = '周六'
				break
	}
	if (type == 'standard') {
		return year + '-' + month + '-' + day
	} else {
		return year + '年' + month + '月' + day + '日' + ' ' + week
	}
}

export function getCurDate () {
	return getDate(0, 'complex')
}

export function getNextDate () {
	return getDate(1, 'complex')
}

export function getCurDateValue () {
	return getDate(0, 'standard')
}

export function getNextDateValue () {
	return getDate(1, 'standard')
}
