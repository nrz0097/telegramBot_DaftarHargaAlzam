var tokenBot = "5417139577:AAF5D5V12mzVeLWxmVqUSYW1MpKiNlwXDuk"; //token bot telegram
var urlBot = "https://api.telegram.org/bot" + tokenBot; //url api bot
var webAppUrl = "https://script.google.com/macros/s/AKfycbwT155mhyLyolBLdiP6bSYxyYDNAwvqIlZWu5fvjtiLly3LUUQ/exec"; //urlapp
var sheetId = "1KZ1Cq7VbkUB-kEptdT1pQSn8bbE3K7Or_GnUdNRlv4A"; //google sheet id

//fungsi set webhook
function setWebhook() {
    var hookUrl = UrlFetchApp.fetch(urlBot + '/setWebhook?url=' + webAppUrl);
}

//fungsi send text
function sendText(chatId, txtPesan) {
    var data = {
        method: "post",
        payload: {
            parse_mode: "HTML"
        }
    };
    var url = urlBot + "/sendMessage?chat_id=" + chatId + "&text=" + encodeURIComponent(txtPesan);
    var response = UrlFetchApp.fetch(url, data);
}

//fungsi dopost
function doPost(e) {
    var datas = JSON.parse(e.postData.contents);
    var chtId = datas.message.chat.id;
    var text = datas.message.text;
    var cmd = text.toLowerCase();

    //membuat command
    if (cmd.substr(0, 6) == '/start') {
        start(chtId, cmd);
    }
    if (cmd.substr(0, 5) == '/help') {
        help(chtId, cmd);
    }
    if (cmd.substr(0, 7) == '/tambah') {
        tambah(chtId, cmd);
    }
    if (cmd.substr(0, 5) == '/ubah') {
        ubah(chtId, cmd);
    }
    if (cmd.substr(0, 4) == 'edit') {
        edit(chtId, cmd);
    }
    if (cmd.substr(0, 6) == '/hapus') {
        hapus(chtId, cmd);
    }
    if (cmd.substr(0, 10) == 'tambahdata') {
        tambahData(chtId, text);
    }
    if (cmd.substr(0, 8) == 'ubahdata') {
        ubahData(chtId, text);
    }
    if (cmd.substr(0, 9) == 'hapusdata') {
        hapusData(chtId, cmd);
    }
    if (cmd.substr(0, 9) == 'cariharga') {
        cariHarga(chtId, cmd);
    }
    if (cmd.substr(0, 12) == '/tampilharga') {
        tampilHarga(chtId, cmd);
    }
    if (cmd.substr(0, 11) == '/tampildata') {
        tampilData(chtId, cmd);
    }

}
