import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET - 获取所有补给品
export async function GET() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('supplements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: '获取补给品失败' },
      { status: 500 }
    );
  }
}

// POST - 添加补给品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('supplements')
      .insert({
        name: body.name,
        type: body.type,
        calories: body.calories || 0,
        carbohydrates: body.carbohydrates || 0,
        protein: body.protein || 0,
        fat: body.fat || 0,
        sodium: body.sodium || 0,
        potassium: body.potassium || 0,
        calcium: body.calcium || 0,
        magnesium: body.magnesium || 0,
        notes: body.notes || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '添加补给品失败' },
      { status: 500 }
    );
  }
}
