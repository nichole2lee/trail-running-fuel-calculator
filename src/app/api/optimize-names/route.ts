import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 名称映射规则（去掉口味，保留官方名称）
const nameMapping = {
  'SIS 普通胶 - 柠檬味': 'SIS Go Isotonic Gel',
  'SIS Go Isotonic Gel - 柠檬味': 'SIS Go Isotonic Gel',
  'SIS 黑胶 - 无咖啡因': 'SIS Go Energy Gel Plus',
  'Amino 红胶': 'SIS Go Energy Gel Amino',
  'Overstims Antioxidant Gel - 绿胶（抗氧化）': 'Overstims Antioxidant Gel',
  'Overstims Energix Gel - 黄胶': 'Overstims Energix Gel',
  'Overstims Coup de Fouet - 黄胶（冲刺）': 'Overstims Coup de Fouet',
  'Overstims Red Tonic - 红胶（含咖啡因）': 'Overstims Red Tonic',
  'Maurten Gel 100 - 普通版': 'Maurten Gel 100',
  'Maurten Gel 100 - 含咖啡因版': 'Maurten Gel 100 Caffeinated',
  '迈盛黑胶 - 含咖啡因': '迈盛 Go Energy Gel Plus',
  'Maurten Gel 100': 'Maurten Gel 100',
  'GU Energy Gel - 原味': 'GU Energy Gel',
  '迪卡侬海盐坚果能量棒': '迪卡侬坚果能量棒',
  '山什会员店坚果能量棒': '山姆会员店坚果能量棒',
  'Skratch Labs 运动补水混合粉 - 柠檬味': 'Skratch Labs 运动补水混合粉'
};

export async function POST() {
  const client = getSupabaseClient();

  try {
    let updateCount = 0;

    // 遍历映射关系，更新产品名称
    for (const [oldName, newName] of Object.entries(nameMapping)) {
      const { error } = await client
        .from('supplements')
        .update({ name: newName })
        .eq('name', oldName);

      if (!error) {
        updateCount++;
        console.log(`更新: ${oldName} -> ${newName}`);
      }
    }

    return NextResponse.json({
      message: '产品名称优化完成',
      updateCount,
      totalMappings: Object.keys(nameMapping).length
    });
  } catch (error) {
    console.error('优化名称失败:', error);
    return NextResponse.json(
      { error: '优化名称失败' },
      { status: 500 }
    );
  }
}
