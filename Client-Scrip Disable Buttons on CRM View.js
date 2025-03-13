ZDK.Page.getButtons().map(btn => {
    console.log('btn', btn);
    console.log('btn getApiName', btn.getApiName());
})

const createBtn = ZDK.Page.getButton('create');
console.log('createBtn', createBtn);
createBtn.disable();
createBtn.hide();
