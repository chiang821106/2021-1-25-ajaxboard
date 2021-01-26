$(document).ready(function () {

    var employeeList = [
        // {
        //     boardname: "IamBoss",
        //     boardsex: "男",
        //     boardsubject: "可樂",
        //     boardcontent: "123",
        //     boardtime: Date(),
        //     checked: "1",
        //     boardid: "111",
        // } 
    ];

    //  生成列表
    function createTable() {

        // 先清除列表
        $('#employeeTable').empty();
        $.each(employeeList, function (key, data) {
            // 編號
            number = key + 1;

            // 各欄位產生
            var td = "",
                tr = "";
            // 序號

            // td += '<td>' + number + '</td>';

            // 姓名

            td += '<td width="10%" class="td1">' + employeeList[key].boardname + '</td>';

            // 性別

            switch (employeeList[key].boardsex) {

                case "男":
                    td += '<td width="5%" class="text-center td2 ">' + '<img src="../../public/images/male.gif"  width="49" height="49" alt="男"></td>';
                    break;
                case "女":
                    td += '<td width="5%" class="text-center td2 ">' + '<img src="../../public/images/female.gif" width="49" height="49" alt="女"></td>';
                    break;
                default:
                    break;
            }

            // 主題

            td += '<td class="td3">' + employeeList[key].boardsubject + '</td>';

            // 內容

            td += '<td class="td4">'+'<textarea style="background:transparent;border-style:none;overflow:hidden;" cols="30" rows="2" disabled wrap={physical}/>'+employeeList[key].boardcontent+'</textarea>'+'</td>';
            // 時間

            td += '<td class="td5" style="font-size:14px;">' + employeeList[key].boardtime + '</td>';

            // 修改與刪除按鈕

            td += '<td>' + '<a class="btn btn-success text-white myModifyBtn">修改</a>' +
                '&nbsp;&nbsp;' + '<a class="btn btn-danger text-white myDeleteBtn delete" data-id="'+ employeeList[key].boardid +'">刪除</a>';

            // 已讀狀態

            switch (employeeList[key].checked) {

                case "0":
                    td += '<td class="text-center">' + '<button align="right" class="btn btn-light check" data-id="'+ employeeList[key].boardid +'">' + '<img src="../../public/images/unlove.gif" width="35" height="35" alt="未讀">' + '</button>' + '</td>';
                    break;
                case "1":
                    td += '<td class="text-center">' + '<button align="right" class="btn btn-light checked" data-id="'+ employeeList[key].boardid +'">'+'<img src="../../public/images/love.gif" width="35" height="35" alt="已讀">' + '</button>' + '</td>';
                    break;
                default:
                    break;
            }

            // ID
            td += '<input type="hidden" class="inputVal" value="' + employeeList[key].boardid + '">';

            tr += '<tr class="text-center">' + td + '</tr>';
            td = "";

            // 抓表單顯示
            $('#employeeTable').append(tr);
            // // 顯示共有幾筆資料
            // $('#totalData').text(number);
            // console.log(tr);
        });

        // 呼叫修改對話框
        $(".myModifyBtn").click(function () {
            $("#myModifyModal").modal('show');
            var boardname, boardsex, boardsubject, boardcontent, inputVal = "";

            // 當再次點擊修改時清空值
            $('#boardname').val("");
            $('#boardsex').val("");
            $('#boardsubject').val("");
            $('#boardcontent').val("");

            // 讓修改對話框帶值
            // 姓名
            boardname = $(this).parent().parent().children('td.td1').text();
            $('#boardname').val(boardname);

            // 性別
            boardsex = $(this).parent().parent().children('td.td2').text();
            $('#boardsex').val(boardsex);

            // 主題
            boardsubject = $(this).parent().parent().children('td.td3').text();
            $('#boardsubject').val(boardsubject);

            // 內容
            boardcontent = $(this).parent().parent().children('td.td4').text();
            $('#boardcontent').val(boardcontent);

            // ID
            inputVal = $(this).parent().parent().children('input.inputVal').val();
            $('#inputVal').val(inputVal);
            // console.log(inputVal);
        });

        // 愛心已讀功能
        $(".checked").click(function () {
            alert("已經已讀囉!");
        })
        
        $('.check').click(function () {
            var ele = $(this);
            //抓取boardid-------
            var boardid = ele.attr("data-id");
            // alert(boardid);
            // alert(ele.attr("data-id"));
            if (confirm("是否標註為已讀?")) {
                jQuery.ajax({
                    url: '../../controllers/admin/checked.php?=' + boardid,
                    method: 'post',
                    data: {
                        boardid
                    },
                    success: function () {
                        downloadAndUpateTable();
                        alert('標註已讀囉!');
                    },
                    error: function () {
                        alert('fail');
                    }
                })
            }
        });
        //刪除留言資料
        $('.delete').click(function () {
            var ele = $(this);
            //抓取boardid-------
            var boardid = ele.attr("data-id");
            // alert(boardid);
            // alert(ele.attr("data-id"));
            if (confirm("是否移除此筆資料?")) {
                jQuery.ajax({
                    url: '../../controllers/admin/delete.php?id=' + boardid,
                    method: 'post',
                    data: {
                        boardid
                    },
                    success: function () {
                        downloadAndUpateTable();
                        alert('已刪除成功!');
                    },
                    error: function () {
                        alert('fail');
                    }
                })
            }
        });
    };

    //先呼叫一次更新畫面
    createTable();

    //向後端抓資料顯示頁面
    // //取得最新資料且更新
    function downloadAndUpateTable() {
        
        // $.get('test.php', function (dataFromServer) {
        //     // employeeList = JSON.parse(dataFromServer); //將取得的字串改為陣列
        //     // createTable();
        //     var array = Object.keys(dataFromServer).map(function (_) {
        //         return dataFromServer[_];
        //     });
        //     employeeList = array; //將取得的字串改為陣列
        //     console.log(employeeList);
        //     createTable();
        // });

        jQuery.ajax({
            url: '../../controllers/admin/j-index.php',
            method: 'get',
            data:{
                page:$('select[name="page"]').val()
            },
            success: function (dataFromServer) {
                var array = Object.keys(dataFromServer).map(function (_) {
                    return dataFromServer[_];
                });
                employeeList = array; //將取得的字串改為陣列
                console.log(employeeList);
                createTable();
            }
        });
    }
    // 先呼叫一次
    downloadAndUpateTable();

    // 傳送修改資料至後端php
    $("#editFormID").on('submit', function (e) {

        // 紀錄要修改的資料
        var dataToServer = {
            // ID
            boardid: $("#inputVal").val(),
            // 姓名
            boardname: $("#boardname").val(),
            // 性別
            boardsex: $("#boardsex").val(),
            // 主題
            boardsubject: $("#boardsubject").val(),
            // 內容
            boardcontent: $("#boardcontent").val(),
        };
        var id = $('#inputVal').val();
        // console.log(boardname);
        // console.log(dataToServer);

        e.preventDefault();

        //傳送給後端更新資料
        if (document.editFormID.boardname.value != "" && document.editFormID.boardsex.value != "" &&
            document.editFormID.boardsubject.value != "" && document.editFormID.boardcontent.value != "") {
            if(document.editFormID.boardsex.value == "男" || document.editFormID.boardsex.value == "女"){
                $.ajax({
                    type: "post",
                    url: "../../controllers/admin/edit.php",
                    data: dataToServer,
                }).then(function () {
                    //呼叫產生畫面
                    downloadAndUpateTable();
                    $("#myModifyModal").modal("hide");
                    alert('修改成功!');
                })
            }else{
                alert("請不要亂改程式碼唷!");
            }
            
        } else if (document.editFormID.boardname.value == "") {
            alert("姓名不得為空唷!");
            return false;
        }
        else if (document.editFormID.boardsex.value == "") {
            alert("性別不得為空唷!");
            return false;
        }
        else if (document.editFormID.boardsubject.value == "") {
            alert("主題不得為空唷!");
            return false;
        }
        else if (document.editFormID.boardcontent.value == "") {
            alert("內容不得為空唷!");
            return false;
        }
    });





})

