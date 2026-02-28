import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 用户提供的能量胶数据（从图片提取）
const userSupplements = [
  {
    name: 'SIS 普通胶 - 柠檬味',
    type: '能量胶',
    calories: 87,
    carbohydrates: 22,
    protein: 0,
    fat: 0,
    sodium: 1,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '等渗配方，无需额外补水，建议每30-45分钟服用'
  },
  {
    name: 'SIS 黑胶 - 无咖啡因',
    type: '能量胶',
    calories: 160,
    carbohydrates: 40,
    protein: 0,
    fat: 0,
    sodium: 12,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '高碳水配方，含双倍碳水，适合高强度运动'
  },
  {
    name: 'Amino 红胶',
    type: '能量胶',
    calories: 109,
    carbohydrates: 24.4,
    protein: 0,
    fat: 0,
    sodium: 23,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '含氨基酸配方，支持肌肉恢复'
  },
  {
    name: 'Overstims Antioxidant Gel - 绿胶（抗氧化）',
    type: '能量胶',
    calories: 100,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 68,
    potassium: 0,
    calcium: 61,
    magnesium: 0,
    notes: '含抗氧化成分，减轻氧化应激反应'
  },
  {
    name: 'Overstims Energix Gel - 黄胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '含BCAA氨基酸，支持耐力运动'
  },
  {
    name: 'Overstims Coup de Fouet - 黄胶（冲刺）',
    type: '能量胶',
    calories: 102,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '适合比赛后期冲刺阶段使用'
  },
  {
    name: 'Overstims Red Tonic - 红胶（含咖啡因）',
    type: '能量胶',
    calories: 100,
    carbohydrates: 26,
    protein: 0,
    fat: 0,
    sodium: 45,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '含25mg咖啡因，提升注意力和爆发力'
  },
  {
    name: 'Maurten Gel 100 - 普通版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 20,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '高科技配方，易消化吸收'
  },
  {
    name: 'Maurten Gel 100 - 含咖啡因版',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 22,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '含100mg咖啡因，高强度运动专用'
  },
  {
    name: '迈盛黑胶 - 含咖啡因',
    type: '能量胶',
    calories: 160,
    carbohydrates: 39.5,
    protein: 0,
    fat: 0,
    sodium: 16,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '高碳水+咖啡因配方，适合长距离耐力运动，含85mg咖啡因'
  },
  {
    name: 'Maurten 能量粉 - 320装',
    type: '能量棒',
    calories: 160,
    carbohydrates: 41,
    protein: 0,
    fat: 0,
    sodium: 210,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '冲泡型能量粉，每包配500ml水，含高电解质'
  },
  // Win Sports 能量胶（根据配料表和常见配方推算）
  {
    name: 'Win Sports 双效能量胶 - 普通版',
    type: '能量胶',
    calories: 180,
    carbohydrates: 45,
    protein: 0,
    fat: 0,
    sodium: 100,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '双碳水配方（麦芽糊精：果葡糖浆=2:1），45克装，快速吸收'
  },
  {
    name: 'Win Sports 双效能量胶 - 含咖啡因黑胶',
    type: '能量胶',
    calories: 180,
    carbohydrates: 45,
    protein: 0,
    fat: 0,
    sodium: 100,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: '双碳水配方+咖啡因，45克装，提升运动表现'
  }
];

export async function POST() {
  const client = getSupabaseClient();

  try {
    // 插入用户能量胶数据
    const { data, error } = await client
      .from('supplements')
      .insert(userSupplements)
      .select();

    if (error) {
      console.error('插入用户能量胶数据失败:', error);
      return NextResponse.json(
        { error: '插入用户能量胶数据失败', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '用户能量胶数据添加成功',
      count: data?.length || 0,
      supplements: data
    });
  } catch (error) {
    console.error('种子数据错误:', error);
    return NextResponse.json(
      { error: '用户能量胶数据插入失败' },
      { status: 500 }
    );
  }
}
