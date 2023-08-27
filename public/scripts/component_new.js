function insert_component(obj) {
    var str = prompt("Nome do componente:", "");
    if (str != null) {
        str = str.trim();
        if (str.length > 0) {
            obj.name.value = str;
            return true;
        }
        else
	    return false;
    }
    else
        return false;
}

function insert_with_msg(msg, obj) {
    var str = prompt(msg, "");
    if (str != null) {
        str = str.trim();
        if (str.length > 0) {
            obj.value = str;
            return true;
        }
        else
	    return false;
    }
    else
        return false;
}
