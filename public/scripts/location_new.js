function location_create(obj) {
    var str = prompt("Nome da localização:", "");
    if (str != null) {
        str = str.trim();
        if (str.length > 0) {
            obj.locname.value = str;
            return true;
        }
        else
	    return false;
    }
    else
        return false;
}
