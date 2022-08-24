/*
- 用于定义HTML中的class、id
_ 用于定义JS中的变量
本人第一次使用jQuery，代码不规范请谅解，不过应该能看懂
*/

//用于储存选中的值
tone_block = "低音块"
tone_block_type = '0'
instrument_block = '鼓'
instrument_block_type = '底鼓'

//用于储存可选的值
tone_block_list = ["低音块", "中音块", "高音块"]
instrument_block_list = ["鼓", "电子", "综合"]
instrument_block_type_list = [
  ["底鼓", "嗵鼓（一、二）", "嗵鼓（三）", "军鼓", "踩镲", "强音镲", "节奏镲", "非洲鼓（木鱼）"],
  ["利物浦（贝斯）", "合成器（chord）", "电风琴", "合成器（pluck音色）", "管风琴", "八音盒", "簧风琴", "电吉他"],
  ["低音钢琴", "金属吉他", "空灵节奏～合成背景音", "弦乐断奏～提琴类音色", "鼓吹唢呐", "长笛、单簧管等", "柳琴、颤音琴等", "钟琴、班卓琴等"]
]

//储存图片路径
icon_path = [
  ["images/block/icon690.png", "images/block/icon691.png", "images/block/icon692.png"],
  ["images/block/icon693.png", "images/block/icon694.png", "images/block/icon695.png"]
]

tables_num = 0 //记录方块的数量
blocks = [] //记录所有方块的数据
selected_block = "" //记录上一个选中的方块
selected_block_id = 0 //记录上一个选中的方块序号

script = ""
music_script1 = `Player:notifyGameInfo2Self(0,"点击任意方块开始生成音乐")Player:notifyGameInfo2Self(0,"生成起点为房主坐标")MusicBlock={bass=690,alto=691,high=692,drum=693,elec=694,synt=695,defaultBlock=667,rhythm=`
music_script2 = `,nowBlockPos={x=0,y=0,z=0}}function MusicBlock:create(music)local a,b=Actor:getFaceYaw(0)local c=""if b>-45 and b<=45 then c="Z-"elseif b>45 and b<=135 then c="X-"elseif b>135 and b<=180 or b<=-135 and b>-180 then c="Z+"elseif b<=-45 and b>-135 then c="X+"else c="X+"end;local function d(e)if c=="Z-"then self.nowBlockPos.z=self.nowBlockPos.z-1 elseif c=="X-"then self.nowBlockPos.x=self.nowBlockPos.x-1 elseif c=="X+"then self.nowBlockPos.x=self.nowBlockPos.x+1 elseif c=="Z+"then self.nowBlockPos.z=self.nowBlockPos.z+1 end end;local a,f,g,h=Actor:getPosition(0)self.nowBlockPos={x=f,y=g,z=h}local i=self.nowBlockPos;for j,k in pairs(music)do i=self.nowBlockPos;if c=="X+"then Block:setBlockAll(i.x,i.y,i.z,702,self.rhythm*4)elseif c=="Z+"then Block:setBlockAll(i.x,i.y,i.z,702,self.rhythm*4+2)elseif c=="Z-"then Block:setBlockAll(i.x,i.y,i.z,702,self.rhythm*4+3)elseif c=="X-"then Block:setBlockAll(i.x,i.y,i.z,702,self.rhythm*4+1)end;d()if music[5]~=-1 then if k[1]==0 then Block:setBlockAll(i.x,i.y,i.z,self.bass,k[2])elseif k[1]==1 then Block:setBlockAll(i.x,i.y,i.z,self.alto,k[2])elseif k[1]==2 then Block:setBlockAll(i.x,i.y,i.z,self.high,k[2])end;if k[3]==0 then Block:setBlockAll(i.x,i.y+1,i.z,self.drum,k[4])elseif k[3]==1 then Block:setBlockAll(i.x,i.y+1,i.z,self.elec,k[4])elseif k[3]==2 then Block:setBlockAll(i.x,i.y+1,i.z,self.synt,k[4])else error("DataError! at "..j)end else Block:replaceBlock(self.defaultBlock,i.x,i.y,i.z,0)end;d()threadpool:wait(0.01)Player:setPosition(0,i.x,i.y,i.z)end;Player:setPosition(0,f,g,h)Player:notifyGameInfo2Self(0,"#G音乐生成完成！")end;HasCreated=false;function CreateMusic(l)if HasCreated~=true then HasCreated=true;MusicBlock:create(music)else Player:notifyGameInfo2Self(0,"#R音乐已经生成过了！")end end;ScriptSupportEvent:registerEvent([=[Player.ClickBlock]=],CreateMusic)`
//初始禁用选项
function disabled_block() {
  $("#tone-block").attr("disabled", "disabled");
  $("#tone-block-type").attr("disabled", "disabled");
  $("#instrument-block").attr("disabled", "disabled");
  $("#instrument-block-type").attr("disabled", "disabled");
}
disabled_block()

function disabled_block_false() {
  $("#tone-block").attr("disabled", false);
  $("#tone-block-type").attr("disabled", false);
  $("#instrument-block").attr("disabled", false);
  $("#instrument-block-type").attr("disabled", false);
}

//编辑方块
//音块改变
$("#tone-block").change(function() {
  tone_block = $(this).val() //储存音块
  for (i in tone_block_list) { //判断音块的序号
    if (tone_block == tone_block_list[i]) { //如果对应上
      blocks[selected_block_id - 1][0] = parseInt(i) //将更改的数据更新到总方块数据里
      $("#block-table" + selected_block_id).children("div:last").children("p").text(tone_block + " | " + blocks[selected_block_id - 1][1]) //更新显示的文本
      $("#block-table" + selected_block_id).children("div:last").children("img").attr("src", icon_path[0][i]) //更新显示的图片
      break
    }
  }
});

//音块类型改变
$("#tone-block-type").change(function() {
  tone_block_type = $(this).val()
  blocks[selected_block_id - 1][1] = parseInt(tone_block_type)
  $("#block-table" + selected_block_id).children("div:last").children("p").text(tone_block_list[blocks[selected_block_id - 1][0]] + " | " + tone_block_type) //更新显示的文本
  $("#block-table" + selected_block_id).children("div:last").children("img").attr("src", icon_path[0][blocks[selected_block_id - 1][0]]) //更新显示的图片
});

//乐器改变
$("#instrument-block").change(function() {
  instrument_block = $(this).val() //储存乐器
  for (i in instrument_block_list) { //判断乐器的序号
    if (instrument_block == instrument_block_list[i]) { //如果对应上
      blocks[selected_block_id - 1][2] = parseInt(i) //将更改的数据更新到总方块数据里
      $("#instrument-block-type").empty(); //清空乐器可选类型，因为三种乐器的可选类型都不同，需要先将选项清空，再重新添加进去
      for (j = 0; j < 8; j++) {
        $("#instrument-block-type").append('<option>' + instrument_block_type_list[blocks[selected_block_id - 1][2]][j] + '</option>')
      }
      $("#instrument-block-type").val(instrument_block_type_list[blocks[selected_block_id - 1][2]][blocks[selected_block_id - 1][3]]); //更新乐器可选类型
      $("#block-table" + selected_block_id).children("div:first").children("p").text(instrument_block + " | " + instrument_block_type_list[i][blocks[selected_block_id - 1][3]]) //更新显示的文本
      $("#block-table" + selected_block_id).children("div:first").children("img").attr("src", icon_path[1][i]) //更新显示的图片
      break
    }
  }
});

//乐器类型改变
$("#instrument-block-type").change(function() {
  instrument_block_type = $(this).val()
  for (i = 0; i < 8; i++) { //判断乐器的序号
    if (instrument_block_type == instrument_block_type_list[blocks[selected_block_id - 1][2]][i]) { //如果对应上
      blocks[selected_block_id - 1][3] = parseInt(i) //将更改的数据更新到总方块数据里
      $("#block-table" + selected_block_id).children("div:first").children("p").text(instrument_block_list[blocks[selected_block_id - 1][2]] + " | " + instrument_block_type) //更新显示的文本
      $("#block-table" + selected_block_id).children("div:first").children("img").attr("src", icon_path[1][blocks[selected_block_id - 1][2]]) //更新显示的图片
    }
  }
});

//更新序号
function updata_num(num) {
  for (i = num; i <= tables_num; i++) {
    $("#app").children('.block-table').eq(i - 1).attr('id', 'block-table' + i)
    $("#app").children('.block-table').eq(i - 1).children("p").text(i)
  }
}

//删除方块
$("#delete-block").click(function() { //算法部分，最好别改
  if (selected_block != "") {
    blocks.splice(selected_block_id - 1, 1)
    if (tables_num > 1) {
      $(selected_block).remove()
      updata_num(selected_block_id - 1)
      if (selected_block_id == tables_num) {
        block_select($("#app").children('.block-table').eq(selected_block_id - 2))
      } else if (selected_block_id == 1) {
        block_select($("#app").children('.block-table').eq(0))
      } else {
        block_select($("#app").children('.block-table').eq(selected_block_id - 1))
      }
      tables_num -= 1
      $.growl.notice({ title: "", message: "删除成功", size: "small" });
    } else {
      $(selected_block).remove()
      disabled_block()
      tables_num -= 1
      selected_block = ""
      selected_block_id = 0
    }
  } else {
    $.growl.warning({ title: "", message: "你还未选中方块！", size: "medium" });
  }
});

//插入方块
$("#insert-block").click(function() {
  if (selected_block_id != 0) {
    add_block(selected_block_id)
    block_select($("#app").children('.block-table').eq(selected_block_id))
  } else {
    $.growl.warning({ title: "", message: "你还未选中方块！", size: "medium" });
  }
});

//取消方块
$("#cancel-block").click(function() {
  if (selected_block_id != 0) {
    if (blocks[selected_block_id - 1][4] == -1) {
      $.growl.warning({ title: "", message: "此方块已经取消过了！", size: "medium" });
    } else {
      blocks[selected_block_id - 1][4] = -1
      $("#block-table" + selected_block_id).children("div:last").children("img").attr("src", "images/block/icon667.png") //更新显示的图片
      $("#block-table" + selected_block_id).children("div:first").children("img").attr("src", "images/block/icon667.png") //更新显示的图片
      disabled_block()
      $.growl.notice({ title: "", message: "取消成功", size: "small" });
    }
  } else {
    $.growl.warning({ title: "", message: "你还未选中方块！", size: "medium" });
  }
});

//恢复方块
$("#recover-block").click(function() {
  if (selected_block_id != 0) {
    if (blocks[selected_block_id - 1][4] != -1) {
      $.growl.warning({ title: "", message: "此方块未被取消！", size: "medium" });
    } else {
      blocks[selected_block_id - 1].pop()
      $("#block-table" + selected_block_id).children("div:last").children("img").attr("src", icon_path[0][blocks[selected_block_id - 1][0]]) //更新显示的图片
      $("#block-table" + selected_block_id).children("div:first").children("img").attr("src", icon_path[1][blocks[selected_block_id - 1][2]]) //更新显示的图片
      disabled_block_false()
      $.growl.notice({ title: "", message: "恢复成功", size: "small" });
    }
  } else {
    $.growl.warning({ title: "", message: "你还未选中方块！", size: "medium" });
  }
});

//生成脚本
$("#create-script").click(function() {
  if (tables_num == 0) {
    $.growl.warning({ title: "", message: "你还未编辑音乐！", size: "medium" });
  } else {
    rhythm = $("#rhythm").val()
    script = ("music = " + JSON.stringify(blocks).replaceAll("[", "{").replaceAll("]", "}")+music_script1+rhythm+music_script2)
    $("#code").text(script)
    Prism.highlightAll(true, null)
    $.growl.notice({ title: "", message: "脚本生成成功！", size: "medium" });
  }
});

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


//复制脚本
$("#copy-script").click(function() {
  if (script == "") {
    $.growl.warning({ title: "", message: "你还未生成脚本！", size: "medium" });
  }
  else {
    copyToClipboard(script)
    $.growl.notice({ title: "", message: "脚本复制成功！", size: "medium" });
  }
});

//添加方块
function add_block(pos, data) {
  tables_num += 1 //方块总数+1
  if (pos == null) { pos = tables_num }
  if (data == null) { data = [0, 0, 0, 0] }
  blocks.splice(pos - 1, 0, data); //在方块表中插入默认数据
  if (pos == tables_num) {
    $("#add-block-table").before('<div class="block-table" id="block-table' + pos + '" ><p>' + pos + '</p><div class="blocks" block-type="instrument"><img src="images/block/icon693.png"><p>鼓 | 0</p></div><div class="blocks" block-type="tone"><img src="images/block/icon690.png"><p>低音块 | 0</p></div></div>'); //插入新的方块
    $.growl.notice({ title: "", message: "添加成功", size: "small" });
    $("#app").animate({ scrollLeft: '+=100' }, 0); //平移到末尾
  } else {
    if (pos == 1) {
      $("#app").children('.block-table').eq(pos - 1).before('<div class="block-table" id="block-table' + pos + '" ><p>' + pos + '</p><div class="blocks" block-type="instrument"><img src="images/block/icon693.png"><p>鼓 | 0</p></div><div class="blocks" block-type="tone"><img src="images/block/icon690.png"><p>低音块 | 0</p></div></div>'); //插入新的方块
      updata_num(pos - 1)
      $.growl.notice({ title: "", message: "插入成功", size: "small" });
    } else {
      $("#app").children('.block-table').eq(pos - 2).after('<div class="block-table" id="block-table' + pos + '" ><p>' + pos + '</p><div class="blocks" block-type="instrument"><img src="images/block/icon693.png"><p>鼓 | 0</p></div><div class="blocks" block-type="tone"><img src="images/block/icon690.png"><p>低音块 | 0</p></div></div>'); //插入新的方块
      updata_num(pos - 1)
      $.growl.notice({ title: "", message: "插入成功", size: "small" });
    }
  }
}

$("#add-block").click(function() {
  add_block()
});

function block_select(object) {
  disabled_block_false()
  if (selected_block != "") { //判断是否有已经选中的方块，如果有则取消选中
    $(selected_block).css("transition", "all 0.3s ease-in-out")
    $(selected_block).css("box-shadow", "none")
  }
  selected_block = object //记录选中的方块
  $(object).css("transition", "all 0.3s ease-in-out") //选中动画
  $(object).css("box-shadow", "0 0 12px #ffeb3b")
  selected_block_id = parseInt($(object).children("p").text()) //获取选中方块的序号 @int
  $("#tone-block").val(tone_block_list[blocks[selected_block_id - 1][0]]); //更新音块
  $("#tone-block-type").val(blocks[selected_block_id - 1][1]); //更新音调
  $("#instrument-block").val(instrument_block_list[blocks[selected_block_id - 1][2]]); //更新乐器
  $("#instrument-block-type").empty(); //清空乐器可选类型，因为三种乐器的可选类型都不同，需要先将选项清空，再重新添加进去
  for (i = 0; i < 8; i++) {
    $("#instrument-block-type").append('<option>' + instrument_block_type_list[blocks[selected_block_id - 1][2]][i] + '</option>')
  }
  $("#instrument-block-type").val(instrument_block_type_list[blocks[selected_block_id - 1][2]][blocks[selected_block_id - 1][3]]); //更新乐器可选类型
  if (blocks[selected_block_id - 1][4] == -1) {
    disabled_block()
  }
}

//选中方块
$("#app").on("click", ".block-table", function() {
  block_select(this)
});