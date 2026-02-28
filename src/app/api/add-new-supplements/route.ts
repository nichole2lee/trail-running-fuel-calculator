import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 新增补给品数据
const newSupplements = [
  // 迪卡侬坚果棒
  {
    name: '迪卡侬海盐坚果能量棒',
    type: '能量棒',
    calories: 200,
    carbohydrates: 28,
    protein: 7,
    fat: 8,
    sodium: 200,
    potassium: 250,
    calcium: 80,
    magnesium: 40,
    notes: '含坚果和海盐，适合长距离耐力运动，口感较好'
  },
  // 山姆坚果棒
  {
    name: '山什会员店坚果能量棒',
    type: '能量棒',
    calories: 220,
    carbohydrates: 30,
    protein: 8,
    fat: 10,
    sodium: 150,
    potassium: 300,
    calcium: 60,
    magnesium: 50,
    notes: '高蛋白坚果配方，经济实惠，适合超长距离赛事'
  },
  // 电解质浓缩液
  {
    name: 'SIS 活力电解质片',
    type: '电解质胶囊',
    calories: 10,
    carbohydrates: 3,
    protein: 0,
    fat: 0,
    sodium: 250,
    potassium: 150,
    calcium: 20,
    magnesium: 30,
    notes: '每片配500ml水，快速补充电解质，支持长时间运动'
  },
  {
    name: 'Nuun 电解质片',
    type: '电解质胶囊',
    calories: 10,
    carbohydrates: 2,
    protein: 0,
    fat: 0,
    sodium: 300,
    potassium: 200,
    calcium: 13,
    magnesium: 25,
    notes: '可溶于水，无糖配方，适合持续补充电解质'
  },
  {
    name: 'SaltStick 电解质胶囊',
    type: '电解质胶囊',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 215,
    potassium: 63,
    calcium: 11,
    magnesium: 22,
    notes: '标准电解质比例，建议每小时1-2粒，方便携带'
  },
  // 其他常见电解质产品
  {
    name: 'Skratch Labs 运动补水混合粉 - 柠檬味',
    type: '运动饮料',
    calories: 80,
    carbohydrates: 21,
    protein: 0,
    fat: 0,
    sodium: 380,
    potassium: 200,
    calcium: 50,
    magnesium: 60,
    notes: '天然成分，高钠配方，适合高温环境'
  },
  {
    name: 'Gu Roctane 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 125,
    potassium: 55,
    calcium: 0,
    magnesium: 0,
    notes: '高能量密度，含氨基酸，适合超长距离比赛'
  },
  {
    name: 'Huma Plus 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 25,
    protein: 0,
    fat: 0,
    sodium: 75,
    potassium: 150,
    calcium: 0,
    magnesium: 0,
    notes: '天然水果原料，易消化吸收，含天然电解质'
  },
  {
    name: 'Clif Shot 能量胶',
    type: '能量胶',
    calories: 100,
    carbohydrates: 24,
    protein: 0,
    fat: 0,
    sodium: 50,
    potassium: 120,
    calcium: 0,
    magnesium: 0,
    notes: '有机成分，多种口味可选，含MCT油'
  },
  {
    name: 'Maurten Drink Mix 320',
    type: '运动饮料',
    calories: 320,
    carbohydrates: 80,
    protein: 0,
    fat: 0,
    sodium: 480,
    potassium: 340,
    calcium: 0,
    magnesium: 0,
    notes: '高碳水配方，每袋配500ml水，适合高强度训练'
  }
];

export async function POST() {
  const client = getSupabaseClient();

  try {
    // 插入新补给品数据
    const { data, error } = await client
      .from('supplements')
      .insert(newSupplements)
      .select();

    if (error) {
      console.error('插入新补给品数据失败:', error);
      return NextResponse.json(
        { error: '插入新补给品数据失败', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '新补给品数据添加成功',
      count: data?.length || 0,
      supplements: data
    });
  } catch (error) {
    console.error('种子数据错误:', error);
    return NextResponse.json(
      { error: '新补给品数据插入失败' },
      { status: 500 }
    );
  }
}
