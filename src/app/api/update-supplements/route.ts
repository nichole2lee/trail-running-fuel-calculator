import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 新的补给品数据（精简后）
const supplementsData = [
  // ============ Maurten ============
  {
    name: 'Maurten 160 能量胶',
    type: '能量胶',
    calories: 106,
    carbohydrates: 40,
    protein: 0,
    fat: 0.1,
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
    fat: 0.1,
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
    fat: 0.1,
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
    fat: 0.1,
    sodium: 400,
    potassium: 60,
    calcium: 0,
    magnesium: 0,
    notes: '100克，40g碳水，200mg咖啡因'
  },
  {
    name: 'Maurten 运动饮料 Mix 320',
    type: '运动饮料',
    calories: 400,
    carbohydrates: 160,
    protein: 0,
    fat: 0,
    sodium: 1600,
    potassium: 480,
    calcium: 0,
    magnesium: 0,
    notes: '160g粉，80g碳水/500ml'
  },

  // ============ SiS ============
  {
    name: 'SiS GO 能量胶 原味',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 50,
    calcium: 0,
    magnesium: 0,
    notes: '60克，22g碳水'
  },
  {
    name: 'SiS GO 能量胶 等渗系列',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '60克，等渗配方'
  },
  {
    name: 'SiS Go Isotonic 能量胶 咖啡因',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '60克，含咖啡因'
  },
  {
    name: 'SiS REGO 快速恢复粉',
    type: '能量粉',
    calories: 360,
    carbohydrates: 20,
    protein: 20,
    fat: 5,
    sodium: 300,
    potassium: 400,
    calcium: 120,
    magnesium: 80,
    notes: '60克粉，含蛋白质和碳水'
  },
  {
    name: 'SiS GO Electrolyte 运动饮料',
    type: '运动饮料',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '40g粉/500ml'
  },

  // ============ GU ============
  {
    name: 'GU 能量胶 原味',
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
    notes: '68克，35mg咖啡因'
  },
  {
    name: 'GU Hydration 电解质粉',
    type: '能量粉',
    calories: 70,
    carbohydrates: 18,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 85,
    calcium: 0,
    magnesium: 0,
    notes: '10g粉/500ml，低热量'
  },
  {
    name: 'GU Roctane Energy Drink',
    type: '能量粉',
    calories: 400,
    carbohydrates: 100,
    protein: 0,
    fat: 0,
    sodium: 600,
    potassium: 300,
    calcium: 0,
    magnesium: 0,
    notes: '每瓶含100g碳水'
  },

  // ============ Overstims ============
  {
    name: 'Overstims GO 能量胶',
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
    name: 'Overstims GO 能量胶 咖啡因',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '70克，含咖啡因'
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
    notes: '500ml，60g碳水'
  },
  {
    name: 'Overstims Hydrixir 电解质粉',
    type: '能量粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '10g粉/500ml'
  },

  // ============ Amino Vital ============
  {
    name: 'Amino Vital 金胶',
    type: '能量胶',
    calories: 96,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 210,
    potassium: 45,
    calcium: 0,
    magnesium: 0,
    notes: '55克，24g碳水，含BCAA'
  },
  {
    name: 'Amino Vital 红胶',
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
    name: 'Amino Vital 粉末装 BCAA',
    type: '能量粉',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '蓝色袋子，含5g BCAA/份'
  },
  {
    name: 'Amino Vital 电解质粉',
    type: '能量粉',
    calories: 60,
    carbohydrates: 15,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 50,
    calcium: 0,
    magnesium: 0,
    notes: '10g粉/500ml'
  },

  // ============ Mag-on ============
  {
    name: 'Mag-on 镁胶囊',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 150,
    potassium: 100,
    calcium: 120,
    magnesium: 180,
    notes: '1胶囊，富含镁'
  },
  {
    name: 'Mag-on Plus 电解质胶囊',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 150,
    calcium: 150,
    magnesium: 300,
    notes: '1胶囊，强化电解质'
  },
  {
    name: 'Mag-on 液体电解质',
    type: '能量粉',
    calories: 40,
    carbohydrates: 10,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 120,
    calcium: 80,
    magnesium: 150,
    notes: '25克，液体电解质'
  },

  // ============ 康比特 ============
  {
    name: '康比特能量胶',
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
    name: '康比特能量胶 咖啡因',
    type: '能量胶',
    calories: 110,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '60克，含咖啡因'
  },
  {
    name: '康比特电解质胶囊',
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
    name: '康比特运动饮料',
    type: '运动饮料',
    calories: 150,
    carbohydrates: 35,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '35g粉/500ml'
  },
  {
    name: '康比特能量粉',
    type: '能量粉',
    calories: 300,
    carbohydrates: 70,
    protein: 5,
    fat: 2,
    sodium: 350,
    potassium: 200,
    calcium: 80,
    magnesium: 60,
    notes: '60克粉/500ml'
  },

  // ============ 迈胜 ============
  {
    name: '迈胜能量胶',
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
    name: '迈胜能量胶 咖啡因',
    type: '能量胶',
    calories: 110,
    carbohydrates: 27,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 70,
    calcium: 0,
    magnesium: 0,
    notes: '60克，含咖啡因'
  },
  {
    name: '迈胜电解质浓缩液 Pro',
    type: '电解质胶囊',
    calories: 5,
    carbohydrates: 1,
    protein: 0,
    fat: 0,
    sodium: 400,
    potassium: 150,
    calcium: 80,
    magnesium: 100,
    notes: '25克，液体浓缩'
  },
  {
    name: '迈胜液体盐丸',
    type: '电解质胶囊',
    calories: 10,
    carbohydrates: 2,
    protein: 0,
    fat: 0,
    sodium: 450,
    potassium: 180,
    calcium: 100,
    magnesium: 120,
    notes: '30克，液体盐丸'
  },
  {
    name: '迈胜清酸片',
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
    name: '迈胜能量粉',
    type: '能量粉',
    calories: 320,
    carbohydrates: 75,
    protein: 5,
    fat: 1,
    sodium: 380,
    potassium: 200,
    calcium: 100,
    magnesium: 80,
    notes: '60克粉/500ml'
  },
  {
    name: '迈胜运动饮料',
    type: '运动饮料',
    calories: 180,
    carbohydrates: 45,
    protein: 0,
    fat: 0,
    sodium: 320,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '45g粉/500ml'
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
    notes: '植物基电解质，100克'
  },
  {
    name: '植电解质粉',
    type: '能量粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 350,
    potassium: 120,
    calcium: 100,
    magnesium: 80,
    notes: '10g粉/500ml，植物基'
  },

  // ============ 肌鲣强 ============
  {
    name: '肌鲣强盐丸',
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
    name: '肌鲣强排酸片',
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
    name: '肌鲣强能量粉',
    type: '能量粉',
    calories: 280,
    carbohydrates: 65,
    protein: 8,
    fat: 2,
    sodium: 300,
    potassium: 180,
    calcium: 120,
    magnesium: 90,
    notes: '60克粉/500ml'
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
    name: 'Win Sports 能量胶 咖啡因',
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
    name: 'Win Sports 电解质粉',
    type: '能量粉',
    calories: 70,
    carbohydrates: 18,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 90,
    calcium: 60,
    magnesium: 40,
    notes: '10g粉/500ml'
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
    name: 'Precision 能量胶 咖啡因',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '55克，含咖啡因'
  },
  {
    name: 'Precision Hydration 电解质粉',
    type: '能量粉',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 450,
    potassium: 150,
    calcium: 80,
    magnesium: 70,
    notes: '10g粉/500ml，高钠'
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
    type: '能量粉',
    calories: 85,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 120,
    calcium: 60,
    magnesium: 50,
    notes: '10g粉/500ml'
  },

  // ============ 迪卡侬 ============
  {
    name: '迪卡侬能量胶',
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
    name: '迪卡侬能量胶 咖啡因',
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
    name: '迪卡侬电解质粉',
    type: '能量粉',
    calories: 75,
    carbohydrates: 19,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 100,
    calcium: 50,
    magnesium: 40,
    notes: '10g粉/500ml'
  },
  {
    name: '迪卡侬能量粉',
    type: '能量粉',
    calories: 260,
    carbohydrates: 60,
    protein: 4,
    fat: 1,
    sodium: 280,
    potassium: 150,
    calcium: 60,
    magnesium: 50,
    notes: '60克粉/500ml'
  },

  // ============ 宝矿力 ============
  {
    name: '宝矿力电解质水',
    type: '运动饮料',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 280,
    potassium: 100,
    calcium: 20,
    magnesium: 10,
    notes: '500ml，经典电解质水'
  },
  {
    name: '宝矿力粉末装',
    type: '能量粉',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 560,
    potassium: 200,
    calcium: 40,
    magnesium: 20,
    notes: '20g粉/500ml'
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
    notes: '355克，常温，快速能量补充'
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
      const brands = ['Maurten', 'SiS', 'GU', 'Overstims', 'Amino Vital', 'Mag-on',
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

    return NextResponse.json({
      message: '补给品数据更新成功',
      totalSupplements: supplementsData.length,
      brands: Object.entries(brandCount).map(([brand, count]) => ({ brand, count })),
      types: {
        能量胶: supplementsData.filter(s => s.type === '能量胶').length,
        能量粉: supplementsData.filter(s => s.type === '能量粉').length,
        运动饮料: supplementsData.filter(s => s.type === '运动饮料').length,
        电解质胶囊: supplementsData.filter(s => s.type === '电解质胶囊').length,
        饮料: supplementsData.filter(s => s.type === '饮料').length
      }
    });
  } catch (error) {
    console.error('更新补给品数据失败:', error);
    return NextResponse.json({ error: '更新补给品数据失败' }, { status: 500 });
  }
}
