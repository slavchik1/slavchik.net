function copyText(element, notification=undefined, text=undefined, do_alert_notification=true, do_title_notification=true) {
    let txt;

    if (text == undefined) {
        txt = element.innerText;
    } else {
        txt = text;
    }
    navigator.clipboard.writeText(txt).then(() => {
        if (notification != undefined) {
            if (do_title_notification) element.title = notification;
            if (do_alert_notification) alert(notification);
        }
    });
}
