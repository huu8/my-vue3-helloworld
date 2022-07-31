import { MockMethod } from 'vite-plugin-mock'

export default [
	{
		method: 'get',
		url: '/api/tableData',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: {
					tableData: [
						{
							id: 1,
							name: '张三',
							age: 20,
							address: '北京市朝阳区',
							phone: '13888888888',
							gender: 'male',
						},
						{
							id: 2,
							name: '李四',
							age: 21,
							address: '上海市静安区',
							phone: '13888888887',
							gender: 'female',
						},
						{
							id: 3,
							name: 'huu8',
							age: 18,
							address: '安徽省南京市',
							phone: '13888888886',
							gender: 'male',
						},
					],
				},
			}
		},
	},
] as MockMethod[]
