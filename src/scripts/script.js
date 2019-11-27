import SlimSelect from "slim-select";
import Glide from '@glidejs/glide'

import {initHeaderNavigation} from "./headerNavigation";


document.addEventListener('DOMContentLoaded', function () {

    //SELECTS
    const selectNodelist = document.querySelectorAll('select');
    const selectnNodelistToArray = Array.prototype.slice.call(selectNodelist);

    selectnNodelistToArray.forEach(function(element) {
        new SlimSelect({
            select: element,
            showSearch: false,
            placeholder: " ",
        })
    });

    //HEADER NAVIGATION
    initHeaderNavigation();
});