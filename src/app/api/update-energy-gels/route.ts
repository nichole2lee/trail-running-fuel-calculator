import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 50种能量胶标准化数据（根据用户提供表格整理）
const energyGels = [
  // Maurten 系列
  {
    name: 'Maurten GEL 100',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '水凝胶技术，肠胃友好天花板，60ml'
  },
  {
    name: 'Maurten GEL 100 Caffeine',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '咖啡因100mg + 水凝胶，职业选手标配，60ml'
  },
  {
    name: 'Maurten GEL 160',
    type: '能量胶',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 30,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '高碳水高容量，减少补给频次，100ml'
  },

  // SiS 系列
  {
    name: 'SiS GO Isotonic Energy Gel',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 10,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '等渗胶，水状质地，无需配水，60ml'
  },
  {
    name: 'SiS Beta Fuel Gel',
    type: '能量胶',
    calories: 158,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 30,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '1:0.8双源糖，吸收效率极高，90ml'
  },

  // GU 系列
  {
    name: 'GU Original Energy Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 60,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '全球普及度最高，口味丰富，60ml'
  },
  {
    name: 'GU Roctane Ultra Energy Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '专门针对长距离/高温，高电解质，60ml'
  },

  // Overstims 系列
  {
    name: 'Overstims Antioxydant Gel',
    type: '能量胶',
    calories: 102,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 68,
    potassium: 0,
    calcium: 61,
    magnesium: 50,
    notes: '起跑胶，高镁配方预防抽筋，40ml'
  },
  {
    name: 'Overstims Energix Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '中程胶，含BCAA氨基酸保护肌肉，40ml'
  },
  {
    name: 'Overstims Coup de Fouet Gel',
    type: '能量胶',
    calories: 102,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '提神胶，含蜂王浆，针对撞墙期快速回血，40ml'
  },
  {
    name: 'Overstims Red Tonic Gel',
    type: '能量胶',
    calories: 101,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '冲刺胶，含咖啡因和人参强力刺激，40ml'
  },
  {
    name: 'Overstims Cafein Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '防困胶，含75mg咖啡因，针对夜赛及极度疲劳，40ml'
  },

  // Amino Vital 系列
  {
    name: 'Amino Vital Amino Shot',
    type: '能量胶',
    calories: 109,
    carbohydrates: 24,
    protein: 2,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '浓缩型氨基酸胶2500mg，防肌肉崩溃，60ml'
  },
  {
    name: 'Amino Vital Perfect Energy',
    type: '能量胶',
    calories: 180,
    carbohydrates: 41,
    protein: 2,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '大容量果冻2500mg氨基酸，赛前1小时垫餐首选，180ml'
  },

  // Mag-on
  {
    name: 'Mag-on Energy Gel',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 140,
    potassium: 0,
    calcium: 0,
    magnesium: 50,
    notes: '抽筋克星，日本补给界明星，高镁配方，70ml'
  },

  // 康比特系列
  {
    name: '康比特能量胶（精英黑胶）',
    type: '能量胶',
    calories: 120,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '国产老大哥，含人参，能量释放极其稳健，60ml'
  },
  {
    name: '康比特7重电解质胶',
    type: '能量胶',
    calories: 110,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 150,
    potassium: 100,
    calcium: 20,
    magnesium: 25,
    notes: '侧重补盐，适合夏赛或大汗跑者，60ml'
  },

  // 迈胜系列
  {
    name: '迈胜液体能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '真正液体质地，口味清爽不粘腻，60ml'
  },
  {
    name: '迈胜能量胶（黑金高能）',
    type: '能量胶',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '国产高能量代表，对标Beta Fuel，90ml'
  },

  // Precision 系列
  {
    name: 'Precision PF 30 Gel',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '精准30g碳水，不含人工香料，60ml'
  },
  {
    name: 'Precision PF 90 Gel',
    type: '能量胶',
    calories: 360,
    carbohydrates: 90,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '巨无霸胶，带盖，可全场分吸，180ml'
  },

  // Huma
  {
    name: 'Huma Chia Energy Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 105,
    potassium: 150,
    calcium: 0,
    magnesium: 0,
    notes: '奇亚籽+真实果泥，口感像果汁，60ml'
  },

  // Spring
  {
    name: 'Spring Awesome Sauce',
    type: '能量胶',
    calories: 180,
    carbohydrates: 45,
    protein: 0,
    fat: 0,
    sodium: 100,
    potassium: 200,
    calcium: 0,
    magnesium: 0,
    notes: '纯天然食物提取，越野跑圈口碑极佳，80ml'
  },

  // High5 系列
  {
    name: 'High5 Energy Gel',
    type: '能量胶',
    calories: 91,
    carbohydrates: 23,
    protein: 0,
    fat: 0,
    sodium: 30,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '欧洲性价比之王，口感较稀，60ml'
  },
  {
    name: 'High5 Energy Gel Aqua',
    type: '能量胶',
    calories: 95,
    carbohydrates: 23,
    protein: 0,
    fat: 0,
    sodium: 30,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '类似SiS的等渗设计，含水量高，60ml'
  },

  // Hammer
  {
    name: 'Hammer Gel',
    type: '能量胶',
    calories: 90,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '缓释配方，无单糖添加，低甜度，60ml'
  },

  // Neversecond
  {
    name: 'Neversecond C30 Energy Gel',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 200,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '精准2:1糖配比，职业车队最爱，60ml'
  },

  // Honey Stinger
  {
    name: 'Honey Stinger Organic Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '蜂蜜基底，成分非常天然，60ml'
  },

  // PowerBar
  {
    name: 'PowerBar PowerGel Original',
    type: '能量胶',
    calories: 102,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 205,
    potassium: 130,
    calcium: 0,
    magnesium: 0,
    notes: '德国品质，钠含量极高，防脱水，60ml'
  },

  // Clif Bar
  {
    name: 'Clif Bar Clif Shot Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 60,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '经典能量，质地较厚实，60ml'
  },

  // Enervit
  {
    name: 'Enervit Liquid Gel',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 25,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '意大利名牌，液体配方，吸收快，60ml'
  },

  // Torq
  {
    name: 'Torq Gel',
    type: '能量胶',
    calories: 114,
    carbohydrates: 29,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '2:1糖比，口味独特(如大黄奶油)，60ml'
  },

  // UCAN
  {
    name: 'UCAN Edge',
    type: '能量胶',
    calories: 70,
    carbohydrates: 19,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '慢消化玉米淀粉，低升糖不波动，60ml'
  },

  // Naak
  {
    name: 'Naak Ultra Energy Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 180,
    potassium: 200,
    calcium: 0,
    magnesium: 0,
    notes: '针对超马，含BCAA及高电解质，60ml'
  },

  // Veloforte
  {
    name: 'Veloforte Nectar Gel',
    type: '能量胶',
    calories: 100,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 150,
    calcium: 0,
    magnesium: 0,
    notes: '纯天然花蜜，口感极佳的"美食胶"，60ml'
  },

  // 226ERS
  {
    name: '226ERS Isotonic Gel',
    type: '能量胶',
    calories: 89,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 25,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '西班牙名牌，等渗大容量，水分足，60ml'
  },

  // Decathlon
  {
    name: 'Decathlon Aptonia Gel',
    type: '能量胶',
    calories: 91,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 40,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '入门首选，全球销量最大，极实惠，60ml'
  },

  // 肌能
  {
    name: '肌能极速能量胶',
    type: '能量胶',
    calories: 120,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '越野跑大神常用，添加瓜拉纳提神，60ml'
  },

  // 必乐
  {
    name: '必乐超能液体胶',
    type: '能量胶',
    calories: 120,
    carbohydrates: 30,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '缓释糖技术，能量输出更持久，60ml'
  },

  // 耐力兔
  {
    name: '耐力兔竞赛版能量胶',
    type: '能量胶',
    calories: 120,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '性价比高，国产新锐，包装易撕，60ml'
  },

  // 迈克仕
  {
    name: '迈克仕能量包（AminoMax）',
    type: '能量胶',
    calories: 126,
    carbohydrates: 31,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 150,
    calcium: 0,
    magnesium: 0,
    notes: '台湾名牌，含丰富B族和电解质，60ml'
  },

  // 一汽
  {
    name: '一汽快充能量胶',
    type: '能量胶',
    calories: 115,
    carbohydrates: 28,
    protein: 0,
    fat: 0,
    sodium: 40,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '专为跑马拉松设计，口味偏大众，60ml'
  },

  // Meiji
  {
    name: 'Meiji VAAM Energy Gel',
    type: '能量胶',
    calories: 105,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '胡蜂氨基酸配方，主打燃脂供能，60ml'
  },

  // Medalist
  {
    name: 'Medalist柠檬酸能量胶',
    type: '能量胶',
    calories: 107,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 63,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '日本抗疲劳名牌，柠檬酸浓度极高，60ml'
  },

  // Morinaga
  {
    name: 'Morinaga Weider in Jelly',
    type: '能量胶',
    calories: 180,
    carbohydrates: 45,
    protein: 1,
    fat: 0,
    sodium: 50,
    potassium: 200,
    calcium: 0,
    magnesium: 0,
    notes: '日本国民级"吸入式"能量补充剂，200ml'
  },

  // Mountain Fuel
  {
    name: 'Mountain Fuel Sports Jelly',
    type: '能量胶',
    calories: 80,
    carbohydrates: 20,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '英国纯天然果冻，肠胃极佳，60ml'
  },

  // OTE
  {
    name: 'OTE Energy Gel',
    type: '能量胶',
    calories: 82,
    carbohydrates: 20.5,
    protein: 0,
    fat: 0,
    sodium: 38,
    potassium: 80,
    calcium: 0,
    magnesium: 0,
    notes: '水果味正，职业车队赞助品牌，60ml'
  },

  // CrankSports
  {
    name: 'CrankSports e-Gel',
    type: '能量胶',
    calories: 150,
    carbohydrates: 37,
    protein: 0,
    fat: 0,
    sodium: 230,
    potassium: 200,
    calcium: 0,
    magnesium: 0,
    notes: '专攻高能量高电解质，一支顶多支，60ml'
  },

  // 京东京造
  {
    name: '京东京造跑步能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 30,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '互联网大牌，适合日常LSD补给，60ml'
  },

  // KODA
  {
    name: 'KODA Energy Gel',
    type: '能量胶',
    calories: 117,
    carbohydrates: 29,
    protein: 0,
    fat: 0,
    sodium: 36,
    potassium: 100,
    calcium: 0,
    magnesium: 0,
    notes: '澳洲老牌，口感平滑不粘腻，60ml'
  }
];

export async function POST() {
  const client = getSupabaseClient();

  try {
    // 步骤1: 删除所有能量胶
    const { error: deleteError } = await client
      .from('supplements')
      .delete()
      .eq('type', '能量胶');

    if (deleteError) {
      console.error('删除旧能量胶失败:', deleteError);
      return NextResponse.json(
        { error: '删除旧能量胶失败', details: deleteError.message },
        { status: 500 }
      );
    }

    // 步骤2: 插入新的能量胶数据
    const { data, error } = await client
      .from('supplements')
      .insert(energyGels)
      .select();

    if (error) {
      console.error('插入新能量胶数据失败:', error);
      return NextResponse.json(
        { error: '插入新能量胶数据失败', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '能量胶数据库更新成功',
      deleted: '所有旧能量胶',
      inserted: data?.length || 0,
      energyGels: data?.map((g, i) => ({ ...g, id: i + 1 })) || []
    });
  } catch (error) {
    console.error('更新能量胶数据失败:', error);
    return NextResponse.json(
      { error: '更新能量胶数据失败' },
      { status: 500 }
    );
  }
}
