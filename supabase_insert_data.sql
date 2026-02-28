-- 越野赛能量补给计算器 - 完整数据插入脚本
-- 复制这段 SQL 到 Supabase SQL Editor 并执行

-- 首先清空表（如果需要重新插入）
DELETE FROM supplements;

-- 插入 Maurten 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Maurten 160 能量胶', '能量胶', 106, 40, 0, 0, 400, 60, 0, 0, '100克，40g碳水'),
('Maurten 320 能量胶', '能量胶', 212, 80, 0, 0, 800, 120, 0, 0, '100克，80g碳水'),
('Maurten 能量胶 咖啡因版 100mg', '能量胶', 106, 40, 0, 0, 400, 60, 0, 0, '100克，40g碳水，100mg咖啡因'),
('Maurten 能量胶 咖啡因版 200mg', '能量胶', 106, 40, 0, 0, 400, 60, 0, 0, '100克，40g碳水，200mg咖啡因'),
('Maurten 运动饮料粉 Mix 320', '能量粉', 400, 160, 0, 0, 1600, 480, 0, 0, '160克粉，配500ml水');

-- 插入 SiS 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('SiS GO 能量胶', '能量胶', 87, 22, 0, 0, 300, 50, 0, 0, '60克，22g碳水，等渗配方'),
('SiS GO 能量胶 咖啡因', '能量胶', 87, 22, 0, 0, 350, 100, 0, 0, '60克，等渗配方，含咖啡因'),
('SiS GO Electrolyte 运动饮料粉', '能量粉', 160, 40, 0, 0, 300, 100, 0, 0, '40克粉，配500ml水'),
('SiS REGO 快速恢复粉', '蛋白粉', 360, 20, 20, 5, 300, 400, 120, 80, '60克粉，配500ml水');

-- 插入 GU 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('GU 能量胶', '能量胶', 100, 25, 0, 0, 125, 55, 0, 0, '68克，25g碳水'),
('GU 能量胶 盐味', '能量胶', 100, 25, 0, 0, 320, 55, 0, 0, '68克，高钠配方'),
('GU 能量胶 Roctane 高端版', '能量胶', 100, 25, 0, 0, 310, 120, 0, 0, '68克，含牛磺酸'),
('GU 能量胶 咖啡因版', '能量胶', 100, 25, 0, 0, 125, 55, 0, 0, '68克，20mg或40mg咖啡因'),
('GU 能量胶 Roctane 咖啡因版', '能量胶', 100, 25, 0, 0, 310, 120, 0, 0, '68克，35mg咖啡因，含牛磺酸'),
('GU 电解质粉', '电解质粉', 70, 18, 0, 0, 250, 85, 0, 0, '10克粉，配500ml水，低热量'),
('GU Roctane Energy Drink 粉', '能量粉', 400, 100, 0, 0, 600, 300, 0, 0, '配500ml水，含100g碳水');

-- 插入 Overstims 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Overstims GO 能量胶 柠檬味', '能量胶', 120, 30, 0, 0, 125, 100, 0, 0, '70克，30g碳水'),
('Overstims GO 能量胶 苹果味', '能量胶', 120, 30, 0, 0, 125, 100, 0, 0, '70克，30g碳水'),
('Overstims GO 能量胶 咖啡因版', '能量胶', 120, 30, 0, 0, 125, 100, 0, 0, '70克，30g碳水，含咖啡因'),
('Overstims Go Power 能量粉', '能量粉', 250, 60, 0, 0, 300, 200, 0, 0, '配500ml水，60g碳水'),
('Overstims Hydrixir 电解质粉', '电解质粉', 80, 20, 0, 0, 350, 100, 0, 0, '10克粉，配500ml水');

-- 插入 Amino Vital 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Amino Vital 红胶 能量胶', '能量胶', 100, 25, 0, 0, 210, 45, 0, 0, '55克，含BCAA'),
('Amino Vital BCAA 粉末装', '电解质粉', 0, 0, 0, 0, 0, 0, 0, 0, '含5g BCAA/份'),
('Amino Vital 电解质粉', '电解质粉', 60, 15, 0, 0, 200, 50, 0, 0, '10克粉，配500ml水');

-- 插入康比特数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('康比特 能量胶', '能量胶', 110, 28, 0, 0, 200, 80, 0, 0, '60克，28g碳水'),
('康比特 能量胶 咖啡因版', '能量胶', 110, 28, 0, 0, 200, 80, 0, 0, '60克，28g碳水，含咖啡因'),
('康比特 电解质胶囊 盐丸', '电解质胶囊', 0, 0, 0, 0, 350, 100, 50, 100, '1胶囊'),
('康比特 运动饮料粉', '能量粉', 150, 35, 0, 0, 280, 80, 0, 0, '35克粉，配500ml水'),
('康比特 能量粉', '能量粉', 300, 70, 5, 2, 350, 200, 80, 60, '60克粉，配500ml水');

-- 插入迈胜数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('迈胜 能量胶', '能量胶', 110, 27, 0, 0, 250, 70, 0, 0, '60克，27g碳水'),
('迈胜 能量胶 咖啡因版', '能量胶', 110, 27, 0, 0, 250, 70, 0, 0, '60克，27g碳水，含咖啡因'),
('迈胜 电解质浓缩液 Pro', '电解质胶囊', 5, 1, 0, 0, 400, 150, 80, 100, '25毫升，液体浓缩'),
('迈胜 液体盐丸', '电解质胶囊', 10, 2, 0, 0, 450, 180, 100, 120, '30毫升，液体盐丸'),
('迈胜 清酸片', '电解质胶囊', 0, 0, 0, 0, 0, 0, 0, 0, '支持恢复，含植物提取物'),
('迈胜 能量粉', '能量粉', 320, 75, 5, 1, 380, 200, 100, 80, '60克粉，配500ml水'),
('迈胜 运动饮料粉', '能量粉', 180, 45, 0, 0, 320, 120, 0, 0, '45克粉，配500ml水');

-- 插入植电数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('植电解质液', '运动饮料', 70, 18, 0, 0, 300, 100, 80, 60, '植物基电解质，100毫升'),
('植电解质粉', '电解质粉', 80, 20, 0, 0, 350, 120, 100, 80, '10克粉，配500ml水，植物基');

-- 插入肌鲣强数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('肌鲣强 盐丸', '电解质胶囊', 0, 0, 0, 0, 500, 200, 100, 150, '1胶囊，高钠配方'),
('肌鲣强 排酸片', '电解质胶囊', 0, 0, 0, 0, 0, 0, 0, 0, '支持恢复，含氨基酸'),
('肌鲣强 能量粉', '能量粉', 280, 65, 8, 2, 300, 180, 120, 90, '60克粉，配500ml水');

-- 插入 Win Sports 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Win Sports 能量胶', '能量胶', 100, 25, 0, 0, 180, 70, 0, 0, '60克，25g碳水'),
('Win Sports 能量胶 咖啡因版', '能量胶', 100, 25, 0, 0, 180, 70, 0, 0, '60克，25g碳水，含咖啡因'),
('Win Sports 电解质粉', '电解质粉', 70, 18, 0, 0, 280, 90, 60, 40, '10克粉，配500ml水');

-- 插入 Precision 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Precision 能量胶', '能量胶', 100, 25, 0, 0, 200, 80, 0, 0, '55克，25g碳水'),
('Precision 能量胶 咖啡因版', '能量胶', 100, 25, 0, 0, 200, 80, 0, 0, '55克，25g碳水，含咖啡因'),
('Precision Hydration 电解质粉', '电解质粉', 80, 20, 0, 0, 450, 150, 80, 70, '10克粉，配500ml水，高钠');

-- 插入 Naak 数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('Naak 能量胶', '能量胶', 95, 24, 0, 0, 200, 80, 0, 0, '60克，24g碳水'),
('Naak 电解质粉', '电解质粉', 85, 21, 0, 0, 300, 120, 60, 50, '10克粉，配500ml水');

-- 插入迪卡侬数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('迪卡侬 能量胶', '能量胶', 100, 25, 0, 0, 180, 70, 0, 0, '60克，性价比高'),
('迪卡侬 能量胶 咖啡因版', '能量胶', 100, 25, 0, 0, 180, 70, 0, 0, '60克，含咖啡因'),
('迪卡侬 电解质粉', '电解质粉', 75, 19, 0, 0, 280, 100, 50, 40, '10克粉，配500ml水'),
('迪卡侬 能量粉', '能量粉', 260, 60, 4, 1, 280, 150, 60, 50, '60克粉，配500ml水');

-- 插入宝矿力数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('宝矿力 电解质水', '运动饮料', 80, 20, 0, 0, 280, 100, 20, 10, '500毫升，经典电解质水'),
('宝矿力 粉末装', '能量粉', 160, 40, 0, 0, 560, 200, 40, 20, '20克粉，配500ml水');

-- 插入可乐数据
INSERT INTO supplements (name, type, calories, carbohydrates, protein, fat, sodium, potassium, calcium, magnesium, notes) VALUES
('可乐', '饮料', 140, 39, 0, 0, 15, 0, 0, 0, '355毫升，常温，快速能量补充');

-- 验证插入结果
SELECT COUNT(*) as total_products FROM supplements;
SELECT type, COUNT(*) as count FROM supplements GROUP BY type ORDER BY count DESC;
SELECT name, type, calories FROM supplements ORDER BY name LIMIT 10;
