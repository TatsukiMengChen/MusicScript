--[[
 *  音乐方块生成
 *  点击方块，在房主位置上开始生成（通过脚本）
 *  @author   Create by 夜水 on 2022-8-22
 *  @changer   Change by 梦辰 on2022-8-24
 *  @version  1.1.2
--]]
Player:notifyGameInfo2Self(0, "点击任意方块开始生成音乐")
Player:notifyGameInfo2Self(0, "生成起点为房主坐标")
MusicBlock = {
    bass = 690, --Blockid: 低音块
    alto = 691, --Blockid: 中音块
    high = 692, --Blockid: 高音块
    drum = 693, --Blockid: 乐器-鼓
    elec = 694, --Blockid: 乐器-电子
    synt = 695, --Blockid: 乐器-综合
    defaultBlock = 667, --Blockid: 默认方块
    rhythm = 0, --节奏 0/1/2/3
nowBlockPos = {x = 0, y = 0, z = 0}}

function MusicBlock:create(music)
    --------生成方向--------
    local result, yaw = Actor:getFaceYaw(0);
    local POS = ""
    if (yaw > -45 and yaw <= 45) then --Z-方向
        POS = "Z-"
    elseif (yaw > 45 and yaw <= 135) then --X-方向
        POS = "X-"
    elseif ((yaw > 135 and yaw <= 180) or (yaw <= -135 and yaw > -180)) then --X-方向
        POS = "Z+"
    elseif (yaw <= -45 and yaw > -135) then --X-方向
        POS = "X+"
    else
        POS = "X+"
    end
    local function setPos(id) --偏移位置
        if (POS == "Z-") then
            self.nowBlockPos.z = self.nowBlockPos.z - 1
        elseif (POS == "X-") then
            self.nowBlockPos.x = self.nowBlockPos.x - 1
        elseif (POS == "X+") then
            self.nowBlockPos.x = self.nowBlockPos.x + 1
        elseif (POS == "Z+") then
            self.nowBlockPos.z = self.nowBlockPos.z + 1
        end
    end
    --------生成方块--------
    local result, x, y, z = Actor:getPosition(0)
    self.nowBlockPos = {x = x, y = y, z = z}
    local pos = self.nowBlockPos
    for k, v in pairs(music) do
        pos = self.nowBlockPos
        if (POS == "X+") then
            Block:setBlockAll(pos.x, pos.y, pos.z, 702, self.rhythm * 4) --E
        elseif (POS == "Z+") then
            Block:setBlockAll(pos.x, pos.y, pos.z, 702, self.rhythm * 4 + 2) --N
        elseif (POS == "Z-") then
            Block:setBlockAll(pos.x, pos.y, pos.z, 702, self.rhythm * 4 + 3) --S
        elseif (POS == "X-") then
            Block:setBlockAll(pos.x, pos.y, pos.z, 702, self.rhythm * 4 + 1) --W
        end
        setPos()
        if music[5] ~= -1 then
            if (v[1] == 0) then --低音
                Block:setBlockAll(pos.x, pos.y, pos.z, self.bass, v[2])
            elseif (v[1] == 1) then --中音
                Block:setBlockAll(pos.x, pos.y, pos.z, self.alto, v[2])
            elseif (v[1] == 2) then --高音
                Block:setBlockAll(pos.x, pos.y, pos.z, self.high, v[2])
            end
            if (v[3] == 0) then --鼓
                Block:setBlockAll(pos.x, pos.y + 1, pos.z, self.drum, v[4])
            elseif (v[3] == 1) then --电子
                Block:setBlockAll(pos.x, pos.y + 1, pos.z, self.elec, v[4])
            elseif (v[3] == 2) then --综合
                Block:setBlockAll(pos.x, pos.y + 1, pos.z, self.synt, v[4])
            else
                error("DataError! at "..k)
            end
        else
            Block:replaceBlock(self.defaultBlock, pos.x, pos.y, pos.z, 0) --方块被取消时用其他方块替换
        end
        setPos()
        threadpool:wait(0.01)
        Player:setPosition(0, pos.x, pos.y, pos.z) --玩家跟随，加载区块
    end
    Player:setPosition(0, x, y, z)
    Player:notifyGameInfo2Self(0, "#G音乐生成完成！")

end
HasCreated = false
function CreateMusic(e)
    if HasCreated ~= true then
        HasCreated = true
        MusicBlock:create(music)
    else
        Player:notifyGameInfo2Self(0, "#R音乐已经生成过了！")
    end
end
ScriptSupportEvent:registerEvent([=[Player.ClickBlock]=],CreateMusic)