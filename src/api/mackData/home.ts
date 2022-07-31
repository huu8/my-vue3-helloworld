export default {
	getHomeData: () => {
		return {
			code: 200,
			data: {
				tableData: [
					{
						name: '张三',
						age: '20',
						address: '北京',
						phone: '13888888888',
						gender: 'male',
						id: 1,
					},
					{
						name: '李四',
						age: '21',
						address: '南京',
						phone: '13888888887',
						gender: 'female',
                        id: 2,
					},
                    {
						name: 'huu8',
						age: '18',
						address: '安徽',
						phone: '13888888886',
						gender: 'male',
                        id: 3,
					},
                    
				],
			},
		}
	},
}
