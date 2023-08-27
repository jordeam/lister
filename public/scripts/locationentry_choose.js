function on_supergroup_changed(obj) {
    const req = new Request('/group/select/'+obj.value);
    fetch(req)
    .then(res => {return res.text();})
    .then(data => {
        const elem = document.getElementById('group');
        console.log(`body=${data}`);
        console.log(`elem=${elem}`);
        elem.innerHTML = data;
    });
}

function on_group_changed(obj) {
    const req = new Request('/component/select/'+obj.value);
    fetch(req)
    .then(res => {return res.text();})
    .then(data => {
        const elem = document.getElementById('comp');
        console.log(`body=${data}`);
        console.log(`elem=${elem}`);
        elem.innerHTML = data;
    });
}
