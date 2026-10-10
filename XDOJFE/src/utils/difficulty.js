// 洛谷风格难度标签：红/橙/黄/绿/蓝 色阶（难度由低到高）
// 优先从题目标签中识别难度关键词，识别不到时按通过率（AC/提交）估算

export function getDifficulty(tags, acnum, submitnum) {
	const list = Array.isArray(tags) ? tags : []
	for (const t of list) {
		const s = String(t)
		if (/入门|简单|基础|新手/.test(s)) return { label: '入门', level: 1 }
		if (/普及-/.test(s)) return { label: '普及-', level: 2 }
		if (/提高-/.test(s)) return { label: '普及/提高-', level: 3 }
		if (/提高\+|省选-/.test(s)) return { label: '提高+/省选-', level: 4 }
		if (/省选|NOI|CTSC|困难|专家/.test(s)) return { label: '省选/NOI', level: 5 }
		if (/普及|提高/.test(s)) return { label: '普及+/提高', level: 3 }
	}
	// 兜底：按通过率估算难度（越高越简单）
	const total = Number(submitnum)
	const ac = Number(acnum)
	const rate = total > 0 ? ac / total : 0
	if (rate >= 0.8) return { label: '入门', level: 1 }
	if (rate >= 0.6) return { label: '普及-', level: 2 }
	if (rate >= 0.4) return { label: '普及/提高-', level: 3 }
	if (rate >= 0.2) return { label: '提高+/省选-', level: 4 }
	return { label: '省选/NOI', level: 5 }
}

export function getDifficultyColor(level) {
	const colors = ['', '#FE4C61', '#F39C11', '#FFC116', '#52C41A', '#3498DB']
	return colors[level] || '#909399'
}
