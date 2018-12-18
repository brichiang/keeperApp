const initialState = {
	user_id:'',
	receipt_id:'',
	page: 1,
	tab: 1,
	currency:"",
	budget:0,
	img:null,
	price:0,
	spent:0,
	name:"",
	location:"",
	date:"",
	returndate:"",
	receiptItem:[],
	totalSpent:0
};

export function Page(state = initialState , action){
	let obj = Object.assign({}, state);

	switch(action.type) {
		case "ID":
			obj.user_id = action.user_id;
			obj.receipt_id = action.receipt_id;
			return obj;		

		case "CHANGE_PAGE":
			obj.page = action.curpage;
			return obj;

		case "CHANGE_TAB":
			obj.tab = action.curtab;
			return obj;

		case "SET_BUDGET":
			obj.currency = action.myCurrency;
			obj.budget = action.myBudget;
			return obj;

		case "CREATE_IMAGE":
			obj.img = action.myimg;
			return obj;

		case "CREATE_RECEIPT":
			obj.price = action.myprice;
			obj.name = action.myname;
			obj.location = action.mylocation;
			obj.date = action.mydate;
			obj.returndate = action.myreturndate;
			obj.spent = obj.spent+action.myprice;
			//console.log(obj);
			return obj;
		
		case "CREATE_ITEM":
			obj.receiptItem.push(action.myItem);
			obj.receiptItem = obj.receiptItem.map((obj)=>{return obj});
			//console.log(obj);
			return obj;

		case "SHOW_SPENT":
			obj.totalSpent = action.spent;
			console.log(obj);
			return obj;

		default:
			return state;
	}
}