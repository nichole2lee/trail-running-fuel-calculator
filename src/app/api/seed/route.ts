import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function POST() {
  const client = getSupabaseClient();

  // 常见越野赛补给品示例数据
  const sampleSupplements = [
    {
      name: 'GU Energy Gel - 原味',
      type: '能量胶',
      calories: 100,
      carbohydrates: 25,
      protein: 0,
      fat: 0,
      sodium: 125,
      potassium: 55,
      calcium: 0,
      magnesium: 0,
      notes: '经典能量胶，建议每30-45分钟服用，配合水一起'
    },
    {
      name: 'Maurten Gel 100',
      type: '能量胶',
      calories: 100,
      carbohydrates: 25,
      protein: 0,
      fat: 0,
      sodium: 75,
      potassium: 100,
      calcium: 0,
      magnesium: 0,
      notes: '高科技配方，易消化吸收，适合高强度运动'
    },
    {
      name: 'SIS Go Isotonic Gel - 柠檬味',
      type: '能量胶',
      calories: 87,
      carbohydrates: 22,
      protein: 0,
      fat: 0,
      sodium: 0,
      potassium: 0,
      calcium: 0,
      magnesium: 0,
      notes: '等渗配方，无需额外补水'
    },
    {
      name: 'SaltStick Caps',
      type: '盐丸',
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      sodium: 215,
      potassium: 63,
      calcium: 11,
      magnesium: 22,
      notes: '标准电解质补充剂，建议每小时1-2粒'
    },
    {
      name: 'Nuun Sport - 草莓柠檬味',
      type: '电解质胶囊',
      calories: 15,
      carbohydrates: 4,
      protein: 0,
      fat: 0,
      sodium: 300,
      potassium: 200,
      calcium: 13,
      magnesium: 25,
      notes: '可溶于水的电解质片，每片约含500ml水'
    },
    {
      name: 'Clif Bar - 巧克力杏仁',
      type: '能量棒',
      calories: 240,
      carbohydrates: 41,
      protein: 10,
      fat: 6,
      sodium: 200,
      potassium: 320,
      calcium: 0,
      magnesium: 0,
      notes: '适合长时间活动的能量棒，口感较好'
    },
    {
      name: 'Nature Valley - 燕麦坚果',
      type: '能量棒',
      calories: 180,
      carbohydrates: 29,
      protein: 4,
      fat: 7,
      sodium: 140,
      potassium: 100,
      calcium: 0,
      magnesium: 0,
      notes: '常见零食能量棒，经济实惠'
    },
    {
      name: '香蕉 (中等大小)',
      type: '固体食物',
      calories: 105,
      carbohydrates: 27,
      protein: 1.3,
      fat: 0.4,
      sodium: 1,
      potassium: 422,
      calcium: 6,
      magnesium: 32,
      notes: '天然补给，易消化，富含钾元素'
    },
    {
      name: '果干葡萄干 (50g)',
      type: '固体食物',
      calories: 150,
      carbohydrates: 40,
      protein: 1,
      fat: 0,
      sodium: 10,
      potassium: 300,
      calcium: 25,
      magnesium: 15,
      notes: '便携易储存，高碳水低脂肪'
    },
    {
      name: '士力架 - 经典花生味',
      type: '能量棒',
      calories: 250,
      carbohydrates: 35,
      protein: 4,
      fat: 12,
      sodium: 140,
      potassium: 190,
      calcium: 0,
      magnesium: 0,
      notes: '高能量密度，适合长距离比赛'
    },
    {
      name: 'PowerBar Performance - 草莓香蕉',
      type: '能量棒',
      calories: 220,
      carbohydrates: 45,
      protein: 8,
      fat: 3,
      sodium: 150,
      potassium: 230,
      calcium: 0,
      magnesium: 0,
      notes: '专业运动能量棒，高碳水配方'
    },
    {
      name: '佳得乐 - 橙味 (500ml)',
      type: '运动饮料',
      calories: 140,
      carbohydrates: 36,
      protein: 0,
      fat: 0,
      sodium: 450,
      potassium: 120,
      calcium: 0,
      magnesium: 0,
      notes: '经典运动饮料，补充电解质和水分'
    },
    {
      name: '佳得乐耐力 - 蓝莓味 (500ml)',
      type: '运动饮料',
      calories: 150,
      carbohydrates: 37,
      protein: 0,
      fat: 0,
      sodium: 250,
      potassium: 200,
      calcium: 0,
      magnesium: 0,
      notes: '含双倍碳水，适合长距离耐力运动'
    },
    {
      name: '蜂蜜 (15ml)',
      type: '能量胶',
      calories: 64,
      carbohydrates: 17,
      protein: 0.1,
      fat: 0,
      sodium: 1,
      potassium: 11,
      calcium: 1,
      magnesium: 0,
      notes: '天然能量来源，可直接服用或溶于水'
    },
    {
      name: '能量饼干 - 姜汁味',
      type: '能量饼干',
      calories: 130,
      carbohydrates: 25,
      protein: 2,
      fat: 3,
      sodium: 120,
      potassium: 50,
      calcium: 20,
      magnesium: 15,
      notes: '英式传统补给品，口感较硬'
    }
  ];

  try {
    // 插入数据
    const { data, error } = await client
      .from('supplements')
      .insert(sampleSupplements)
      .select();

    if (error) {
      console.error('插入示例数据失败:', error);
      return NextResponse.json(
        { error: '插入示例数据失败', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: '示例数据插入成功',
      count: data?.length || 0
    });
  } catch (error) {
    console.error('种子数据错误:', error);
    return NextResponse.json(
      { error: '种子数据插入失败' },
      { status: 500 }
    );
  }
}
