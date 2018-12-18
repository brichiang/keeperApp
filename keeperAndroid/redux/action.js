export function Id(id,r_id){
  return{
    type:"ID",
    user_id:id,
    receipt_id:r_id
  }
}

export function ChangePage(page){
  return{
    type:"CHANGE_PAGE",
    curpage:page 
  }
}

export function ChangeTab(tab){
  return{
    type:"CHANGE_TAB",
    curtab:tab 
  }
}

export function SetBudget(currency, budget){
  return{
    type:"SET_BUDGET",
    myCurrency:currency,
    myBudget:budget
  }
}

export function CreateImage(img){
  return{
    type:"CREATE_IMAGE",
    myimg:img
  }
}

export function CreateReceipt(price, name, location, date, returndate){
  return{
    type:"CREATE_RECEIPT",
    myprice:price,
    myname:name,
    mylocation:location,
    mydate:date,
    myreturndate:returndate
  }
}

export function CreateItem(item){
  return{
    type:"CREATE_ITEM",
    myItem:item
  }
}

export function ChangeSpent(spent){
  return{
    type:"SHOW_SPENT",
    spent:spent
  }
}