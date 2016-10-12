var table=$.table;
table.addEventListener('click',function(e){
    if(e.source.click=='no')
    {
        e.source.click='yes';
        var row = Ti.UI.createTableViewRow();
        var nestedTab= Alloy.createController('tableView').getView();
        row.add(nestedTab);
        table.insertRowAfter(e.index,row);
    }
    else{
        if(e.source.click=='yes')
        {
            e.source.click='no';
            table.deleteRow(e.index+1);    
        }
    }
});