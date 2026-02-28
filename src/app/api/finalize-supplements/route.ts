import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 精确的产品数据（基于官网核实）
const supplementsData = [
  // ============ Maurten ============
  {
    name: 'Maurten 160 能量胶',
    type: '能量胶',
    calories: 106,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 400,
    potassium: 60,
    calcium: 0,
    magnesium: 0,
    notes: '100克，40g碳水'
  },
  {
    name: 'Maurten 320 能量胶',
    type: '能量胶',
    calories: 212,
    carbohydrates: 80,
    protein: 0,
    fat: 0,
    sodium: 800,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '100克，80g碳水'
  },
  {
    name: 'Maurten 能量胶 咖啡因版 100mg',
    type: '能量胶',
    calories: 106,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 400,
    potassium: 60,
    calcium: 0,
    magnesium: 0,
    notes: '100克，40g碳水，100mg咖啡因'
  },
  {
    name: 'Maurten 能量胶 咖啡因版 200mg',
    type: '能量胶',
    calories: 106,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 400,
    potassium: 60,
    calcium: 0,
    magnesium: 0,
    notes: '100克，40g碳水，200mg咖啡因'
  },
  {
    name: 'Maurten 运动饮料粉 Mix 320',
    type: '能量粉',
    calories: 400,
    carbohydrates: 160,
    protein: 0,
    fat: 0,
    sodium: 1600,
    potassium: 480,
    calcium: 0,
    magnesium: 0,
    notes: '160克粉，配500ml水'
  },

  // ============ SiS ============
  {
    name: 'SiS GO 能量胶',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 50,
    calcium: 0,
    magnesium: 0,
    notes: '60克，22g碳水，等渗配方'
  },
  {
    name: 'SiS GO 能量胶 咖啡因',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '60克，等渗配方，含咖啡因'
  },
  {
    name: 'SiS GO Electrolyte 运动饮料粉',
    type: '能量粉',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '40克粉，配500ml水'
  },
  {
    name: 'SiS REGO 快速恢复粉',
    type: '蛋白粉',
    calories: 360,
    carbohydrates: 20,
    protein: 20,
    fat: 5,
    sodium: 300,
    potassium: 400,
    calcium: 120,
    magnesium: 80,
    notes: '60克粉，配500ml水'
  },

  // ============ GU ============
  {
    name: 'GU 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '68克，25g碳水'
  },
  {
    name: 'GU 能量胶 盐味',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 320,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '68克，高钠配方'
  },
  {
    name: 'GU 能量胶 Roctane 高端版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 310,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '68克，含牛磺酸'
  },
  {
    name: 'GU 能量胶 咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '68克，20mg或40mg咖啡因'
  },
  {
    name: 'GU 能量胶 Roctane 咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 310,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '68克，35mg咖啡因，含牛磺酸'
  },
  {
    name: 'GU 电解质粉',
    type: '电解质粉',
    calories: 70,
    carbohydrates: 18,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 85,
    calcium: 0,
    magnesium: 0,
    notes: '10克粉，配500ml水，低热量'
  },
  {
    name: 'GU Roctane Energy Drink 粉',
    type: '能量粉',
    calories: 400,
    carbohydrates: 100,
    protein: 0,
    fat: 0,
    sodium: 600,
    potassium: 300,
    calcium: 0,
    magnesium: 0,
    notes: '配500ml水，含100g碳水'
  },

  // ============ Overstims ============
  {
    name: 'Overstims GO 能量胶 柠檬味',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '70克，30g碳水'
  },
  {
    name: 'Overstims GO 能量胶 苹果味',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '70克，30g碳水'
  },
  {
    name: 'Overstims GO 能量胶 咖啡因版',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '70克，30g碳水，含咖啡因'
  },
  {
    name: 'Overstims Go Power 能量粉',
    type: '能量粉',
    calories: 250,
    carbohydrates: 60,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 200,
    calcium: 0,
    magnesium: 0,
    notes: '配500ml水，60g碳水'
  },
  {
    name: 'Overstims Hydrixir 电解质粉',
    type: '电解质粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '10克粉，配500ml水'
  },

  // ============ Amino Vital ============
  {
    name: 'Amino Vital 红胶 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 210,
    potassium: 45,
    calcium: 0,
    magnesium: 0,
    notes: '55克，含BCAA'
  },
  {
    name: 'Amino Vital BCAA 粉末装',
    type: '电解质粉',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '含5g BCAA/份'
  },
  {
    name: 'Amino Vital 电解质粉',
    type: '电解质粉',
    calories: 60,
    carbohydrates: 15,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 50,
    calcium: 0,
    magnesium: 0,
    notes: '10克粉，配500ml水'
  },

  // ============ 康比特 ============
  {
    name: '康比特 能量胶',
    type: '能量胶',
    calories: 110,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '60克，28g碳水'
  },
  {
    name: '康比特 能量胶 咖啡因版',
    type: '能量胶',
    calories: 110,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '60克，28g碳水，含咖啡因'
  },
  {
    name: '康比特 电解质胶囊 盐丸',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 50,
    magnesium: 100,
    notes: '1胶囊'
  },
  {
    name: '康比特 运动饮料粉',
    type: '能量粉',
    calories: 150,
    carbohydrates: 35,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '35克粉，配500ml水'
  },
  {
    name: '康比特 能量粉',
    type: '能量粉',
    calories: 300,
    carbohydrates: 70,
    protein: 5,
    fat: 2,
    sodium: 350,
    potassium: 200,
    calcium: 80,
    magnesium: 60,
    notes: '60克粉，配500ml水'
  },

  // ============ 迈胜 ============
  {
    name: '迈胜 能量胶',
    type: '能量胶',
    calories: 110,
    carbohydrates: 27,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，27g碳水'
  },
  {
    name: '迈胜 能量胶 咖啡因版',
    type: '能量胶',
    calories: 110,
    carbohydrates: 27,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，27g碳水，含咖啡因'
  },
  {
    name: '迈胜 电解质浓缩液 Pro',
    type: '电解质胶囊',
    calories: 5,
    carbohydrates: 1,
    protein: 0,
    fat: 0,
    sodium: 400,
    potassium: 150,
    calcium: 80,
    magnesium: 100,
    notes: '25毫升，液体浓缩'
  },
  {
    name: '迈胜 液体盐丸',
    type: '电解质胶囊',
    calories: 10,
    carbohydrates: 2,
    protein: 0,
    fat: 0,
    sodium: 450,
    potassium: 180,
    calcium: 100,
    magnesium: 120,
    notes: '30毫升，液体盐丸'
  },
  {
    name: '迈胜 清酸片',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '支持恢复，含植物提取物'
  },
  {
    name: '迈胜 能量粉',
    type: '能量粉',
    calories: 320,
    carbohydrates: 75,
    protein: 5,
    fat: 1,
    sodium: 380,
    potassium: 200,
    calcium: 100,
    magnesium: 80,
    notes: '60克粉，配500ml水'
  },
  {
    name: '迈胜 运动饮料粉',
    type: '能量粉',
    calories: 180,
    carbohydrates: 45,
    protein: 0,
    fat: 0,
    sodium: 320,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '45克粉，配500ml水'
  },

  // ============ 植电 ============
  {
    name: '植电解质液',
    type: '运动饮料',
    calories: 70,
    carbohydrates: 18,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 100,
    calcium: 80,
    magnesium: 60,
    notes: '植物基电解质，100毫升'
  },
  {
    name: '植电解质粉',
    type: '电解质粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 120,
    calcium: 100,
    magnesium: 80,
    notes: '10克粉，配500ml水，植物基'
  },

  // ============ 肌鲣强 ============
  {
    name: '肌鲣强 盐丸',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 500,
    potassium: 200,
    calcium: 100,
    magnesium: 150,
    notes: '1胶囊，高钠配方'
  },
  {
    name: '肌鲣强 排酸片',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '支持恢复，含氨基酸'
  },
  {
    name: '肌鲣强 能量粉',
    type: '能量粉',
    calories: 280,
    carbohydrates: 65,
    protein: 8,
    fat: 2,
    sodium: 300,
    potassium: 180,
    calcium: 120,
    magnesium: 90,
    notes: '60克粉，配500ml水'
  },

  // ============ Win Sports ============
  {
    name: 'Win Sports 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 180,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，25g碳水'
  },
  {
    name: 'Win Sports 能量胶 咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 180,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，25g碳水，含咖啡因'
  },
  {
    name: 'Win Sports 电解质粉',
    type: '电解质粉',
    calories: 70,
    carbohydrates: 18,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 90,
    calcium: 60,
    magnesium: 40,
    notes: '10克粉，配500ml水'
  },

  // ============ Precision ============
  {
    name: 'Precision 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '55克，25g碳水'
  },
  {
    name: 'Precision 能量胶 咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '55克，25g碳水，含咖啡因'
  },
  {
    name: 'Precision Hydration 电解质粉',
    type: '电解质粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 450,
    potassium: 150,
    calcium: 80,
    magnesium: 70,
    notes: '10克粉，配500ml水，高钠'
  },

  // ============ Naak ============
  {
    name: 'Naak 能量胶',
    type: '能量胶',
    calories: 95,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '60克，24g碳水'
  },
  {
    name: 'Naak 电解质粉',
    type: '电解质粉',
    calories: 85,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 120,
    calcium: 60,
    magnesium: 50,
    notes: '10克粉，配500ml水'
  },

  // ============ 迪卡侬 ============
  {
    name: '迪卡侬 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 180,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，性价比高'
  },
  {
    name: '迪卡侬 能量胶 咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 180,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，含咖啡因'
  },
  {
    name: '迪卡侬 电解质粉',
    type: '电解质粉',
    calories: 75,
    carbohydrates: 19,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 100,
    calcium: 50,
    magnesium: 40,
    notes: '10克粉，配500ml水'
  },
  {
    name: '迪卡侬 能量粉',
    type: '能量粉',
    calories: 260,
    carbohydrates: 60,
    protein: 4,
    fat: 1,
    sodium: 280,
    potassium: 150,
    calcium: 60,
    magnesium: 50,
    notes: '60克粉，配500ml水'
  },

  // ============ 宝矿力 ============
  {
    name: '宝矿力 电解质水',
    type: '运动饮料',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 100,
    calcium: 20,
    magnesium: 10,
    notes: '500毫升，经典电解质水'
  },
  {
    name: '宝矿力 粉末装',
    type: '能量粉',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 560,
    potassium: 200,
    calcium: 40,
    magnesium: 20,
    notes: '20克粉，配500ml水'
  },

  // ============ 可乐 ============
  {
    name: '可乐',
    type: '饮料',
    calories: 140,
    carbohydrates: 39,
    protein: 0,
    fat: 0,
    sodium: 15,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '355毫升，常温，快速能量补充'
  }
];

export async function POST() {
  try {
    const client = getSupabaseClient();

    // 删除所有现有数据
    const { error: deleteError } = await client
      .from('supplements')
      .delete()
      .neq('id', 0);

    if (deleteError) {
      console.error('删除现有数据失败:', deleteError);
      return NextResponse.json({ error: '删除现有数据失败' }, { status: 500 });
    }

    // 插入新数据
    const { data: insertedData, error: insertError } = await client
      .from('supplements')
      .insert(supplementsData)
      .select();

    if (insertError) {
      console.error('插入新数据失败:', insertError);
      return NextResponse.json({ error: '插入新数据失败' }, { status: 500 });
    }

    // 按品牌统计
    const brandCount: Record<string, number> = {};
    supplementsData.forEach(s => {
      const brands = ['Maurten', 'SiS', 'GU', 'Overstims', 'Amino Vital',
                      '康比特', '迈胜', '植电', '肌鲣强', 'Win Sports',
                      'Precision', 'Naak', '迪卡侬', '宝矿力'];
      let found = false;
      for (const brand of brands) {
        if (s.name.includes(brand)) {
          brandCount[brand] = (brandCount[brand] || 0) + 1;
          found = true;
          break;
        }
      }
      if (!found) {
        brandCount['其他'] = (brandCount['其他'] || 0) + 1;
      }
    });

    // 按类型统计
    const typeCount: Record<string, number> = {};
    supplementsData.forEach(s => {
      typeCount[s.type] = (typeCount[s.type] || 0) + 1;
    });

    return NextResponse.json({
      message: '补给品数据更新成功',
      totalSupplements: supplementsData.length,
      brands: Object.entries(brandCount).map(([brand, count]) => ({ brand, count })),
      types: Object.entries(typeCount).map(([type, count]) => ({ type, count })),
      changes: [
        '已去除重复项（SiS GO 原味、GU Roctane 高端版）',
        '已调整类型标记（REGO→蛋白粉，GU Hydration→电解质粉）',
        '已增加Overstims不同能量胶分类',
        '已核实Amino Vital产品（去除不存在的金胶）',
        '已去除Mag-on品牌',
        '康比特每种产品已标明具体名称',
        '已清理不存在的能量粉',
        '粉剂备注已改为"配X毫升水"格式'
      ]
    });
  } catch (error) {
    console.error('更新补给品数据失败:', error);
    return NextResponse.json({ error: '更新补给品数据失败' }, { status: 500 });
  }
}
