import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function POST() {
  const client = getSupabaseClient();

  try {
    // 获取所有补给品
    const { data: allSupplements, error: fetchError } = await client
      .from('supplements')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      return NextResponse.json({ error: '获取数据失败', details: fetchError.message }, { status: 500 });
    }

    // 按名称分组，找出重复项
    const nameMap = new Map();
    const duplicates = [];

    allSupplements.forEach((supplement) => {
      const name = supplement.name;
      if (nameMap.has(name)) {
        duplicates.push(supplement);
      } else {
        nameMap.set(name, supplement);
      }
    });

    // 删除重复项（保留最早创建的）
    const deletedIds = [];
    for (const duplicate of duplicates) {
      const { error: deleteError } = await client
        .from('supplements')
        .delete()
        .eq('id', duplicate.id);

      if (!deleteError) {
        deletedIds.push(duplicate.id);
      }
    }

    return NextResponse.json({
      message: '清理完成',
      totalBefore: allSupplements.length,
      duplicatesFound: duplicates.length,
      duplicatesDeleted: deletedIds.length,
      totalAfter: allSupplements.length - deletedIds.length,
      duplicatesList: duplicates.map(d => ({ id: d.id, name: d.name, created_at: d.created_at }))
    });
  } catch (error) {
    console.error('清理重复数据失败:', error);
    return NextResponse.json(
      { error: '清理失败' },
      { status: 500 }
    );
  }
}
